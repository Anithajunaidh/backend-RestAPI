import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtTokenModel {
    @Field(() => String)
    accessToken: string;

    @Field(() => String)
    refreshToken: string;
}
