// import { Injectable,ExecutionContext} from "@nestjs/common";
// import { GqlExecutionContext } from "@nestjs/graphql";
// import {AuthGuard} from '@nestjs/passport';

// @Injectable()
// export class GqlAuthGuard extends AuthGuard('local'){
//     constructor(){
//         super();
//     }
//     getRequest(context:ExecutionContext){
//         const ctx=GqlExecutionContext.create(context);
//         const request=ctx.getContext();
//         request.body=ctx.getArgs().loginUserInput;
//         return request;
//     }
// }

import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt_decode from 'jwt-decode';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        if (req && req.headers && req.headers.authorization) {
            const { headers } = req;
            const { authorization } = headers;
            const token = authorization.split(' ')[1];
            const decodedToken: any = jwt_decode(token);
            //const accessExpiry: number = decodedToken.iat + 180000;
            if (decodedToken.tokenType && decodedToken.tokenType == 'refreshToken') {
                throw new HttpException(
                    { status: HttpStatus.UNAUTHORIZED, error: 'Invalid Token' },
                    HttpStatus.UNAUTHORIZED,
                );
            }
            return req;
        }
        throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'Invalid Request' }, HttpStatus.BAD_REQUEST);
    }
}
