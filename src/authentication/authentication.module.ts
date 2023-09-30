import { Module } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { AuthResolver } from './authentication.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepositoryAbstract } from './abstracts/authentication-repository.abstract';
import { AuthServiceAbstract } from './abstracts/authentication-service.abstract';
import { DbService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
PassportModule,
// JwtModule.register({
// signOptions:{expiresIn:'60s'},
// secret:'hide-me'}),
JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('token.jwtSecret'),
  }),
}),

MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]),],
providers: [
  AuthService,
  AuthResolver,
  {
    provide: AuthRepositoryAbstract,
    useClass:DbService,
  },
  {
    provide: AuthServiceAbstract,
    useClass: AuthService,
  },
  
],})
export class AuthenticationModule {}
