import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AuthRepositoryAbstract<T> {
    abstract getAll(): Promise<T[]>;
    abstract getByValue(field: string, value: string): Promise<T | null>;

    abstract create(item: T): Promise<T>;

    abstract update(id: string, item: T): any;

    abstract delete(id: string): any;
}