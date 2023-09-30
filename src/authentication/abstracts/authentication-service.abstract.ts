import { Injectable } from '@nestjs/common';
import { JwtTokenModel } from '../models/jwt-token.model';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.input';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export abstract class AuthServiceAbstract {
    abstract getUsersList(): Promise<User[]>;
    abstract addUserDetails(item: CreateUserDto): Promise<User>;

    abstract loginUser(item: LoginUserDto): Promise<JwtTokenModel>;
}
