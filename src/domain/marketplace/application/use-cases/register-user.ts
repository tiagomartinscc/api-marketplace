import { Either, left, right } from "@/core/either"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "../../enterprise/entities/user"
import { Injectable } from "@nestjs/common"
import { UsersRepository } from "../repositories/users-repository"
import { HashGenerator } from "../criptography/hash-generator"

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    phone,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail =
      await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const userWithSamePhone =
      await this.usersRepository.findByPhone(phone)

    if (userWithSamePhone) {
      return left(new UserAlreadyExistsError(phone))
    }    

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
