import { BadRequestException, Injectable, NotFoundException, Scope } from '@nestjs/common'
import { ApiConfigurationRepository } from '../repository/api-configuration.repository'
import { RequestContext } from '../../shared/service/request-context'
import { DataModelRepository } from '../../data/repository/data-model-repository'
import { Identity } from '../../shared/type'
import { ApiConfigurationDto } from '../dto/api-configuration.dto'
import { DATA_MESSAGE } from '../../data/data.constant'
import { ApiConfiguration } from '../schema/api-configuration'
import { API_MESSAGE } from '../api.constants'
import { User } from '../../user/shema/user'

@Injectable({scope: Scope.REQUEST})
export class ApiConfigurationService {
  constructor(
    private requestContext: RequestContext,
    private apiConfigurationRepository: ApiConfigurationRepository,
    private dataModelRepository: DataModelRepository,
  ) {
  }

  async create(dto: ApiConfigurationDto): Promise<Identity> {
    const dataModel = await this.dataModelRepository.findOne({
      _id: dto.dataModelId,
    })

    if (!dataModel)
      throw new BadRequestException(DATA_MESSAGE.DATA_MODEL_IS_INVALID)

    const isPrefixDuplicated = await this.apiConfigurationRepository.findOne(
      {
        prefix: dto.prefix,
      },
      {
        _id: true,
      },
    )

    if (isPrefixDuplicated)
      throw new BadRequestException(API_MESSAGE.PREFIX_IS_DUPLICATED)

    const entity = new ApiConfiguration()

    entity.createdBy = {_id: this.requestContext.authenticatedUser.id} as User
    entity.dataModal = dataModel
    entity.prefix = dto.prefix
    entity.endpoints = dto.endpoints.map(ep => ({
      httpMethod: ep.httpMethod,
      type: ep.type,
    }))

    const result = await this.apiConfigurationRepository.create(entity)

    return {id: result._id}
  }

  async update(id: string, dto: ApiConfigurationDto): Promise<void> {
    const entity = await this.apiConfigurationRepository.findOne({_id: id})

    if (!entity)
      throw new NotFoundException()

    const dataModel = await this.dataModelRepository.findOne({
      _id: dto.dataModelId,
    })

    if (!dataModel)
      throw new BadRequestException(DATA_MESSAGE.DATA_MODEL_IS_INVALID)

    const isPrefixDuplicated = await this.apiConfigurationRepository.findOne(
      {
        prefix: dto.prefix,
        _id: {$ne: id},
      },
      {
        _id: true,
      },
    )

    if (isPrefixDuplicated)
      throw new BadRequestException(API_MESSAGE.PREFIX_IS_DUPLICATED)

    entity.dataModal = dataModel
    entity.prefix = dto.prefix
    entity.endpoints = dto.endpoints.map(ep => ({
      httpMethod: ep.httpMethod,
      type: ep.type,
    }))

    await this.apiConfigurationRepository.update(entity)
  }

  async remove(id: string): Promise<void> {
    const entity = await this.apiConfigurationRepository.findOne({_id: id})

    if (!entity)
      throw new NotFoundException()

    await this.apiConfigurationRepository.remove(entity)
  }
}