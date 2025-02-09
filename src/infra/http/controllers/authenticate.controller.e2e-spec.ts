import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { AuthenticateUseCase } from '@/domain/marketplace/application/use-cases/authenticate'
import { User } from '@/domain/marketplace/enterprise/entities/user'
import { WrongCredentialsError } from '@/domain/marketplace/application/use-cases/errors/wrong-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let encrypter: FakeEncrypter
let fakeHasher: FakeHasher
let sut: AuthenticateUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new AuthenticateUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate', async () => {
    const user = User.create({
      name: 'John Wick',
      phone: '999999999',
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })  

  it('should not be able to authenticate with wrong credentials', async () => {
    const user = User.create({
      name: 'John Wick',
      phone: '999999999',
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '1234567',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new WrongCredentialsError())
  })

  it('should not be able to authenticate with unknew user', async () => {
    const user = User.create({
      name: 'John Wick',
      phone: '999999999',
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      email: 'bababa@example.com',
      password: '1234567',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new WrongCredentialsError())
  })
})
