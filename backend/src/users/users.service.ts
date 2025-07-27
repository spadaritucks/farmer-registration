import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRequestDTO } from './dto/users.request.dto';
import { UsersRequestUpdateDTO } from './dto/users.request.update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersResponseDTO } from './dto/users.response.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>
  ) { }



  create(userRequestDTO: UsersRequestDTO) {

    // const userExists = this.usersRepository.findOne({ where: { cpf: userRequestDTO.cpf } })
    // console.log(userExists)

    // if (userExists != null) {
    //   throw new HttpException("O Usuario já existe!", HttpStatus.CONFLICT)
    // }

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

  update(id: number, usersRequestUpdateDTO: UsersRequestUpdateDTO) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
