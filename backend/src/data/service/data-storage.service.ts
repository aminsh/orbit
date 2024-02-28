import { Identity } from '../../shared/type'
import { DataStorageDto } from '../dto/data-storage.dto'
import { DataStorageRepository } from '../repository/data-storage-repository'
import { DataStorage } from '../schema/data-storage'
import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common'
import { RequestContext } from '../../shared/service/request-context'
import { User } from '../../user/shema/user'
import { StorageStatus } from '../schema/enums'
import { DATABASE_CONFIGURATION_FACTORY, DatabaseConfigurationFactory } from './database-configurations.service'

@Injectable({ scope: Scope.REQUEST })
export class DataStorageService {
  constructor(
    private dataStorageRepository: DataStorageRepository,
    private requestContext: RequestContext,
    @Inject(DATABASE_CONFIGURATION_FACTORY) private databaseConfigurationFactory: DatabaseConfigurationFactory,
  ) { }

  async create(dto: DataStorageDto): Promise<Identity> {
    const entity = new DataStorage
    entity.createdBy = {
      _id: this.requestContext.authenticatedUser.id
    } as User
    entity.status = StorageStatus.Pending
    entity.type = dto.type
    entity.name = dto.name
    const result = await this.dataStorageRepository.create(entity)
    return { id: result._id }
  }

  async remove(id: string): Promise<void> {
    /* Check is used or not */
    const entity = await this.fetch(id)
    await this.dataStorageRepository.remove(entity)
  }

  async initialize(id: string): Promise<void> {
    const entity = await this.fetch(id)

    const instance = this.databaseConfigurationFactory.instance(entity.type)
    await instance.init(entity)

    entity.status = StorageStatus.Ready

    await this.dataStorageRepository.update(entity)
  }

  async synchronize(id: string): Promise<void> {
    const entity = await this.fetch(id)

    const instance = this.databaseConfigurationFactory.instance(entity.type)
    await instance.sync(entity)
  }

  private async fetch(id: string): Promise<DataStorage> {
    const entity = await this.dataStorageRepository.findOne({
      _id: id
    })

    if (!entity)
      throw new NotFoundException()

    return entity
  }
}

