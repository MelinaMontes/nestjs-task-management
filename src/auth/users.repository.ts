import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        //generamos un salt para encriptar la contraseña
        const salt = await bcrypt.genSalt();
        //generamos el hash + el salt 
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword
         });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') { //codigo de postgres para algo duplicado
                throw new ConflictException('User already exist')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}

