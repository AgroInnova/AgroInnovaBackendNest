/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModuleOT {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  moduleId: number;

  @Field(() => Float)
  temperature: number;

  @Field(() => Float)
  humidity: number;

  @Field(() => Boolean)
  valve: boolean;

  @Field(() => Date)
  dateTime: Date;

  @Field(() => Int)
  client: number;
}
