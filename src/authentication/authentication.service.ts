import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepositoryAbstract } from './abstracts/authentication-repository.abstract';
import { User } from './models/user.model';
import { JwtPayloadData } from './types/jwt.payload';
import { AuthServiceAbstract } from './abstracts/authentication-service.abstract';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.input';

const argon2 = require('argon2');

@Injectable()
export class AuthService implements AuthServiceAbstract {
  constructor(
    private readonly authenticationRepositoryAbstract: AuthRepositoryAbstract<User>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  addUserDetails = async (userData: CreateUserDto) => {
    const { email } = userData;
    let userResData = await this.authenticationRepositoryAbstract.getByValue('email', email);
    if (userResData) {
      throw new HttpException(
        { message: 'Email already exists!!', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
    userResData = await this.registerUser(userData);
    return userResData;
  };

  registerUser = async (userData: CreateUserDto): Promise<User> => {
    const hashedPassword = await this.hashPassword(userData.password);
    userData.password = hashedPassword;
    const registeredUserData = await this.authenticationRepositoryAbstract.create(userData);
    return registeredUserData;
  };

  hashPassword = async (password: string) => argon2.hash(password, 10);

  loginUser = async (userData: LoginUserDto) => {
    const { email, password } = userData;
    const userResData = await this.authenticationRepositoryAbstract.getByValue('email', email);
    if (!userResData) {
      throw new HttpException(
        { message: 'User registration not found!!', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordMatchStatus = await this.comparePassword(password, userResData.password);
    if (!passwordMatchStatus) {
      throw new HttpException(
        { message: 'Password mismatch!!', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload: JwtPayloadData = {
      userId: userResData._id,
      userEmail: userResData.email,
      userPhone: userResData.contactNo,
      role: userResData.role,
    };
    const accessToken = await this.generateJWT(payload, 'accessToken');
    const refreshToken = await this.generateJWT(payload, 'refreshToken');
    return { accessToken, refreshToken };
  };

  comparePassword = async (password: string, hashedPassword: string) => {
    const comparedPasswordStatus: boolean = await argon2.verify(hashedPassword, password);
    return comparedPasswordStatus;
  };

  generateJWT = async (jwtData: JwtPayloadData, tokenType: string) => {
    const options: JwtSignOptions = {
     secret: this.configService.get<string>('token.jwtSecret'),
    };
    if (tokenType == 'accessToken') {
      options.expiresIn = this.configService.get<string>('token.accessTokenExpire');
      jwtData.tokenType = 'accessToken';
    } else if (tokenType == 'refreshToken') {
     options.expiresIn = this.configService.get<string>('token.refreshTokenExpire');
      jwtData.tokenType = 'refreshToken';
    }
    const token = await this.jwtService.signAsync(jwtData, options);
    return token;
  };
  getUsersList = async () => {
    const users = await this.authenticationRepositoryAbstract.getAll();
    if (!users) {
        throw new HttpException({ message: 'No Existing Users', status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }
    return users;
};
}
