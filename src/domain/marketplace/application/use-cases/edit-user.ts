import { Either, left, right } from "@/core/either"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "../../enterprise/entities/user"
import { Injectable } from "@nestjs/common"
import { UsersRepository } from "../repositories/users-repository"
import { HashGenerator } from "../criptography/hash-generator"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"

interface EditUserUseCaseRequest {
  id: string,
  name?: string
  email?: string
  phone?: string
  password?: string
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError | UserAlreadyExistsError,
  {
    user: User
  }
>

@Injectable()
export class EditUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    id,
    name,
    email,
    phone,
    password,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.find(id)
    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (name && user.name !== name) {
      user.name = name
    }    

    if (email && user.email !== email) {
      const userWithSameEmail =
        await this.usersRepository.findByEmail(email)

      if (userWithSameEmail) {
        return left(new UserAlreadyExistsError(email))
      }
      user.email = email
    }

    if (phone && user.phone !== phone) {
      const userWithSamePhone =
      await this.usersRepository.findByPhone(phone)

      if (userWithSamePhone) {
        return left(new UserAlreadyExistsError(phone))
      }
      user.phone = phone
    }

    if (password) {
      const hashedPassword = await this.hashGenerator.hash(password)
      user.password = hashedPassword
    }
    await this.usersRepository.save(user)
    return right({
      user,
    })
  }
}
