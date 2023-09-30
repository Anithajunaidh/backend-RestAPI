import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuthRepositoryAbstract } from './abstracts/authentication-repository.abstract';
import { User, UserDocument } from './models/user.model';

@Injectable()
export class DbService implements AuthRepositoryAbstract<User> {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<UserDocument>,
  ) {}
  getAll(): Promise<User[]> {
    return this.userModel.find().exec();
}
  getByValue(field: string, value: string): Promise<User | null> {
    const query: any = {};
    query[field] = value;
    return this.userModel.findOne(query).exec();
  }

  create(item: User): Promise<User> {
    return this.userModel.create(item);
  }

  update(id: string, item: User) {
    return this.userModel.findByIdAndUpdate(id, item, { new: true });
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
