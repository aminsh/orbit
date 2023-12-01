import { DataStorage } from '../schema/data-storage'
import { StorageType } from '../schema/enums';

export interface DatabaseConfigurationsService {
  init(dataStorage: DataStorage): Promise<void>

  sync(dataStorage: DataStorage): Promise<void>
}

export interface DatabaseConfigurationFactory {
  instance(dataStorageType: StorageType): DatabaseConfigurationsService
}

export const DATABASE_CONFIGURATION_FACTORY = 'DATABASE_CONFIGURATION_FACTORY'
