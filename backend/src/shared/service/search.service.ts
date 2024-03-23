import {Injectable, Type} from '@nestjs/common'
import {ElasticsearchService} from '@nestjs/elasticsearch'
import {Identity, PageableRequest, PageableResponseBase} from '../type'
import {camelToSnakeCase, getMapping} from '../utils'

type IndexName<TView = any> = string | Type<TView>

@Injectable()
export class SearchService {
  constructor(
    private elasticSearchService: ElasticsearchService,
  ) {
  }

  async createIndex(view: IndexName) {
    const index = this.resolveIndexName(view)
    const {body: isExists} = await this.elasticSearchService.indices.exists({index})
    if (!isExists)
      await this.elasticSearchService.indices.create({index})
  }

  async putMapping(view: Type) {
    await this.elasticSearchService.indices.put_mapping({
      index: this.resolveIndexName(view),
      body: getMapping(view),
    })
  }

  index<TView extends Identity>(type: Type<TView>, view: TView) {
    return this.elasticSearchService.index({
      id: view.id,
      index: this.resolveIndexName(type),
      body: view
    })
  }

  async bulkIndex<TView extends Identity>(type: Type<TView>, items: TView[]) {
    const index = this.resolveIndexName(type)
    const body= items.flatMap(it => [
      {
        index: {
          _index: index, _id: it.id
        }
      },
      it
    ])

    await this.elasticSearchService.bulk({
      body,
    })
  }

  delete<TView>(type: Type<TView>, id: string) {
    return this.elasticSearchService.delete({
      index: this.resolveIndexName(type),
      id,
    })
  }

  async get<TView>(viewName: IndexName<TView>, request: PageableRequest): Promise<PageableResponseBase<TView>> {
    const index = this.resolveIndexName(viewName)

    const result = await this.elasticSearchService.search({
      index,
      from: request.skip,
      size: request.take,
    })

    const {hits} = result.body

    return {
      count: hits.total.value,
      data: hits.hits.map((it: { _source: TView }) => it._source)
    }
  }

  private resolveIndexName(viewName: IndexName): string {
    return typeof viewName === 'function'
      ? camelToSnakeCase(viewName.name)
      : viewName
  }
}