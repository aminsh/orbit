import { IsEnum } from 'class-validator'
import { StorageType } from '../schema/enums'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DataStorageDto {
  @Field(() => StorageType)
  @IsEnum(StorageType)
  type: StorageType
}