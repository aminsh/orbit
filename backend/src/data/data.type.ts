import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InsertResponse {
  @Field(() => Int)
  id: number
}