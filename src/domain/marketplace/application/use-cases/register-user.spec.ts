import { FakeHasher } from "test/cryptography/fake-hasher"
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { RegisterUserUseCase } from "./register-user"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher

let sut: RegisterUserUseCase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

   it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '51 9999-9999',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '51 9999-9999',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
  })

  it.only('should not be able to register duplicate email', async () => {
    const firstRegister = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '51 9999-9999',
      password: '123456',
    })
    expect(firstRegister.isRight()).toBe(true)

    const result = await sut.execute({
      name: 'Marry Jane',
      email: 'johndoe@example.com',
      phone: '99 9999-9999',
      password: '123456',
    })

    console.log(result.isLeft())

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
