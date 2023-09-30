import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    @Field(() => String)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    password: string;
}