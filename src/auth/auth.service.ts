import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {}

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string>{
        const{username, password}= authCredentialsDto;
        const user = await this.usersRepository.findOne({username});

        if (user && (await bcrypt.compare(password, user.password))){
            return 'Yeah! you are in!!';
        }else{
            throw new UnauthorizedException('Something went wrong! Introduce your credentials again');
        }
    }

}
