import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRequestDTO } from './dto/users.request.dto';
import { UsersRequestUpdateDTO } from './dto/users.request.update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>
  ) { }



  async create(userRequestDTO: UsersRequestDTO) {

    const userExists = await this.usersRepository.findOneBy({ cpf: userRequestDTO.cpf })

    if (userExists != null) {
      throw new HttpException("O Usuario já existe!", HttpStatus.CONFLICT)
    }

    const user = this.usersRepository.create({
      fullName: userRequestDTO.fullName,
      cpf: userRequestDTO.cpf,
      birthDate: userRequestDTO.birthDate,
      phone: userRequestDTO.phone,
      active: userRequestDTO.active
    })

    return this.usersRepository.save(user)


  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, usersRequestUpdateDTO: UsersRequestUpdateDTO) {
    const userExists = await this.usersRepository.findOneBy({ _id: new ObjectId(id) });

    if (!userExists) {
      throw new NotFoundException(`O Usuario com o id ${id} não existe!`);
    }

    const updatedUser = await this.usersRepository.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          fullName: usersRequestUpdateDTO.fullName,
          birthDate: usersRequestUpdateDTO.birthDate,
          phone: usersRequestUpdateDTO.phone
        }
      },
      { returnDocument: 'after' }
    );

    return updatedUser;
  }

  async remove(id: string) {
    const userExists = await this.usersRepository.findOneBy({ _id: new ObjectId(id) });

    if (!userExists) {
      throw new NotFoundException(`O Usuario com o id ${id} não existe!`);
    }

     return await this.usersRepository.findOneAndDelete({_id : new ObjectId(id)})

  }
}
