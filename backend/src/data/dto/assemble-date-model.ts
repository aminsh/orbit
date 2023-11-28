import { userAssembler } from 'src/user/dto/user-assembler';
import { DataModel } from '../schema/data-model';
import { DataModelView } from './data-model-view';
import { assembleDataStorage } from './assemble-data-storage';
import { assembleDataModelField } from './assembe-data-model-field';

export const assembleDataModel = (entity: Partial<DataModel>): DataModelView => {
  if (!entity)
    return null

  return {
    id: entity._id,
    createdBy: userAssembler(entity.createdBy),
    name: entity.name,
    dataStorage: assembleDataStorage(entity.dataStorage),
    fields: entity.fields.map(assembleDataModelField)
  }
}