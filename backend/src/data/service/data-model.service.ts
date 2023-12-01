import { BadRequestException, Injectable, NotFoundException, Scope } from '@nestjs/common'
import { RequestContext } from '../../shared/service/request-context'
import { DataModelRepository } from '../repository/data-model-repository'
import { DataModelDto } from '../dto/data-model-dto'
import { DataModel } from '../schema/data-model'
import { EqualsCaseInsensitive } from '../../shared/utils'
import { DATA_MESSAGE } from '../data.constant'
import { DataModelField } from '../schema/data-model-field'
import { DataStorageRepository } from '../repository/data-storage-repository'
import { Identity } from 'src/shared/type'
import { PostgresService } from './postgres.service'
import { InsertResponse } from '../data.type'
import { User } from 'src/user/shema/user'

@Injectable({ scope: Scope.REQUEST })
export class DataModelService {
  constructor(
    private requestContext: RequestContext,
    private dataModelRepository: DataModelRepository,
    private dataStorageRepository: DataStorageRepository,
    private postgresService: PostgresService,
  ) { }

  async create(dto: DataModelDto): Promise<Identity> {
    const entity = new DataModel()
    entity.createdBy = { _id: this.requestContext.authenticatedUser.id } as User

    await this.resolve(entity, dto)

    const result = await this.dataModelRepository.create(entity)

    return { id: result._id }
  }

  async update(id: string, dto: DataModelDto): Promise<void> {
    const entity = await this.fetch(id)

    await this.resolve(entity, dto)

    await this.dataModelRepository.update(entity)
  }

  async remove(id: string): Promise<void> {
    const entity = await this.fetch(id)

    await this.dataModelRepository.remove(entity)
  }

  async insert(id: string, data: any): Promise<InsertResponse> {
    const entity = await this.fetch(id)
    return this.postgresService.insert(entity, data)
  }

  async queryFindAndCount(id:string, query: any): Promise<any> {
    const entity = await this.fetch(id)
    return this.postgresService.query(entity, query)
  }

  private async fetch(id: string): Promise<DataModel> {
    const entity = await this.dataModelRepository.findOne({
      _id: id
    })

    if (!entity)
      throw new NotFoundException()

    return entity
  }

  private async resolve(entity: DataModel, dto: DataModelDto) {
    const isDuplicated = await this.dataModelRepository.findOne({
      name: EqualsCaseInsensitive(dto.name),
      createdBy: {
        _id: this.requestContext.authenticatedUser.id
      },
      ...(
        entity._id
          ? {
            _id: { $ne: entity._id }
          }
          : undefined
      )
    })

    if (isDuplicated)
      throw new BadRequestException(DATA_MESSAGE.STORAGE_NAME_IS_DUPLICATED)

    if (!dto.fields?.length)
      throw new BadRequestException(DATA_MESSAGE.FIELD_LIST_MUST_NOT_BE_EMPTY)

    entity.dataStorage = await this.dataStorageRepository.findOne({
      _id: dto.dataStorageId
    })

    if (!entity.dataStorage)
      throw new BadRequestException(DATA_MESSAGE.DATA_STORAGE_IS_INVALID)

    entity.name = dto.name
    entity.fields = dto.fields.map<DataModelField>(f => ({
      name: f.name,
      label: f.label,
      type: f.type,
      required: f.required,
    }))
  }
}
