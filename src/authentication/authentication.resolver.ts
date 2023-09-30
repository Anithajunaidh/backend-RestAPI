import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthServiceAbstract } from './abstracts/authentication-service.abstract';
import { JwtTokenModel } from './models/jwt-token.model';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.input';
import { LoginUserDto } from './dto/login-user.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authenticationServiceAbstract: AuthServiceAbstract) {}

  @Mutation(() => User)
  async addUserDetails(@Args('payload') body: CreateUserDto) {
    const user = await this.authenticationServiceAbstract.addUserDetails(body);
    return user;
  }

  @Query(() => JwtTokenModel)
  async userLogin(@Args('payload') body: LoginUserDto) {
    const loginData = await this.authenticationServiceAbstract.loginUser(body);
    return loginData;
  }
  @Query(() => [User])
  async getUsersList() {
      const user= await this.authenticationServiceAbstract.getUsersList();
      return user;
  }
}
