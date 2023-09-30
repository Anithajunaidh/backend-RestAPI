import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class User {
    @Field(() => String)
    _id?: string;

    @Field(() => String)
    @Prop()
    fullname: string;

    @Field(() => String)
    @Prop()
    email: string;

    @Field(() => String)
    @Prop()
    password: string;

    @Field(() => String, { nullable: true })
    @Prop()
    contactNo?: string;

    @Field(() => String, { nullable: true })
    @Prop()
    role?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
