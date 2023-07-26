/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModuleObjectType {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  moduleId: number;

  @Field((type) => Float)
  temperature: number;

  @Field((type) => Float)
  humidity: number;

  @Field((type) => String)
  dateTime: Date;

  @Field((type) => Boolean)
  valve: boolean;
}
