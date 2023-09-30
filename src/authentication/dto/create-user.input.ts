import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    fullname: string;

    @IsNotEmpty()
    @IsEmail()
    @Field(() => String)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    password: string;

    @IsOptional()
    @IsString()
    @Field(() => String,{nullable:true})
    contactNo?: string;

    @IsOptional()
    @IsString()
    @Field(() => String,{nullable:true})
    role?: string;
}

@InputType()
export class UpdateUserDto {
    @IsNotEmpty()
    @Field(() => String)
    _id: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    fullname: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    email: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    password: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    contactNo?: string;

    @IsOptional()
    @IsString()
    @Field(() => String)
    role?: string;
}