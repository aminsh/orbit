import * as Enumerable from 'linq'
import {Type} from '@nestjs/common'
import {getFieldsAndDecoratorForType} from '@nestjs/graphql/dist/schema-builder/utils/get-fields-and-decorator.util'

type PropertyMetadata = ReturnType<typeof getFieldsAndDecoratorForType>['fields'][0]

export const getMapping = (type: Type, field?: PropertyMetadata) => {
  const {fields} = getFieldsAndDecoratorForType(type)
  const properties = Enumerable.from(fields).toObject(
    f => f.name,
    resolveType
  )

  const result: any = {properties}

  if(field?.options?.isArray)
    result.type = 'nested'

  return result
}

const resolveType = (field: PropertyMetadata) =>{
  const scalarType = Object.entries(ScalarTypes).find(([key])=> field.typeFn()['name'] === key)
  return scalarType
  ? {type: scalarType[1]}
    : getMapping(field.typeFn() as Type)
}

const ScalarTypes = {
  String: 'text',
  Int: 'integer',
  Float: 'float',
  Date: 'date',
  Boolean: 'boolean',
}