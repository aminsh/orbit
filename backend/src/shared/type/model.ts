import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose'

export interface Identity {
  id: string;
}

@ObjectType()
export class IdentityResponse {
  @Field(() => String)
  id: string
}

@ObjectType()
export abstract class PageableResponseBase<TView> {
  @Field(() => Int)
  count: number

  abstract data: TView[]
}

@InputType()
export class PageableRequest {
  @Field(() => Int)
  @IsNumber()
  take: number

  @Field(() => Int)
  @IsNumber()
  skip: number
}

export class Entity {
  _id: string

  createdAt: Date

  updatedAt: Date
}

export interface Repository<TEntity> {
  findOne(
    filter: FilterQuery<TEntity>,
    projection?: ProjectionType<TEntity>,
    options?: QueryOptions<TEntity>
  ): Promise<TEntity>;

  find(
    filter: FilterQuery<TEntity>,
    projection?: ProjectionType<TEntity>,
    options?: QueryOptions<TEntity>
  ): Promise<TEntity[]>;

  create(entity: TEntity): Promise<TEntity>;

  update(entity: TEntity): Promise<void>;

  remove(entity: TEntity): Promise<void>;
}
