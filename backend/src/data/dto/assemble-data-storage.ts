import { DataStorage } from '../schema/data-storage'
import { DataStorageView } from './data-storage.view'
import { userAssembler } from 'src/user/dto/user-assembler'

export const assembleDataStorage = (entity: Partial<DataStorage>): DataStorageView => {
  if (!entity)
    return null

  return {
    id: entity._id,
    createdBy: userAssembler(entity.createdBy),
    type: entity.type,
    status: entity.status,
  }
}
