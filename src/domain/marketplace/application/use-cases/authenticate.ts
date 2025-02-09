import { Either, left, right } from "@/core/either"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "../../enterprise/entities/user"
import { Injectable } from "@nestjs/common"
import { UsersRepository } from "../repositories/users-repository"
import { WrongCredentialsError } from "./errors/wrong-credentials-error"
import { HashComparer } from "../criptography/hash-comparer"
import { Encrypter } from "../criptography/encrypter"

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
