
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => Int)
  @Prop()
  id: number;

  @Field()
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserModel= SchemaFactory.createForClass(User);

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
