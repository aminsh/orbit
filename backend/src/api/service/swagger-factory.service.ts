import { Injectable } from '@nestjs/common'
import { ApiConfiguration } from '../schema/api-configuration'
import * as Enumerable from 'linq'
import { DataModelFieldType } from '../../data/schema/enums'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SwaggerFactoryService {
  constructor(
    private configService: ConfigService,
  ) {
  }

  async create(apiConfiguration: ApiConfiguration): Promise<any> {
    const {dataModal} = apiConfiguration
    return {
      openapi: '3.0.3',
      info: {
        title: `This api for ${dataModal.name}`,
        description: '',
      },
      servers: [
        {
          url: `${this.configService.get('BASE_URL')}/api/${apiConfiguration.prefix}`,
        },
      ],
      paths: {
        [`/${dataModal.name.toLowerCase()}`]: {
          'get': {
            summary: 'get all people',
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        '$ref': '#/components/schemas/Person',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          [dataModal.name]: {
            type: 'object',
            properties: Enumerable.from(dataModal.fields)
              .toObject(f => f.name, f => ({type: typeMapper[f.type]})),
          },
        },
      },
    }
  }
}

const typeMapper = {
  [DataModelFieldType.Text]: 'string',
  [DataModelFieldType.Boolean]: 'boolean',
  [DataModelFieldType.Integer]: 'integer',
  [DataModelFieldType.Float]: 'float',
}