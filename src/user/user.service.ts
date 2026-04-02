import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
    findByUsername(name: string) : void { //Todo replace with user entity
        return;
    }
}
