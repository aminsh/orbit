import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageableResponseBase } from '../shared/type';
import { GraphQLJSON } from 'graphql-scalars';

@ObjectType()
export class InsertResponse {
  @Field(() => Int)
  id: number
}

@ObjectType()
export class QueryFindAndCountResponse extends PageableResponseBase<any> {
  @Field(() => [ GraphQLJSON ])
  data: any[]
}
