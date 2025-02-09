import { FakeHasher } from "test/cryptography/fake-hasher"
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { EditUserUseCase } from "./edit-user"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "../../enterprise/entities/user"

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher

let sut: EditUserUseCase

describe('Edit User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()

    sut = new EditUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to edit a user', async () => {

    inMemoryUsersRepository.items.push(User.create(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '51 9999-9999',
        password: '123456',
      }      
    ))

    const result = await sut.execute({
      id: inMemoryUsersRepository.items[0].id.toString(),
      name: 'Walter White',
      email: 'walter@white.com',
      phone: '11 8888-9999',
      password: '654321',
    })

    expect(result.isRight()).toBe(true)

    expect(inMemoryUsersRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Walter White',
        email: 'walter@white.com',
        phone: '11 8888-9999',
        password: '654321-hashed',
      })
    )
  })

  it('should be able to edit only the user s password', async () => {

    inMemoryUsersRepository.items.push(User.create(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '51 9999-9999',
        password: '123456',
      }      
    ))

    const result = await sut.execute({
      id: inMemoryUsersRepository.items[0].id.toString(),
      password: '654321',
    })

    expect(result.isRight()).toBe(true)

    expect(inMemoryUsersRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '51 9999-9999',
        password: '654321-hashed',
      })
    )
  })

  it('should not be able to edit a duplicate email ', async () => {

    inMemoryUsersRepository.items.push(User.create(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '51 9999-9999',
        password: '123456',
      }      
    ))

    inMemoryUsersRepository.items.push(User.create(
      {
        name: 'John Doe Jr',
        email: 'duplicate@example.com',
        phone: '51 5555-9999',
        password: '123456',
      }      
    ))

    const result = await sut.execute({
      id: inMemoryUsersRepository.items[0].id.toString(),
      email: 'duplicate@example.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new UserAlreadyExistsError('duplicate@example.com'))
    expect(inMemoryUsersRepository.items[0]).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      })
    )
  })

  it('should not be able to edit a duplicate phone ', async () => {

    inMemoryUsersRepository.items.push(User.create(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '51 9999-9999',
        password: '123456',
      }      
    ))

    inMemoryUsersRepository.items.push(User.create(
      {
        name: 'John Doe Jr',
        email: 'example@example.com',
        phone: '51 5555-9999',
        password: '123456',
      }      
    ))

    const result = await sut.execute({
      id: inMemoryUsersRepository.items[0].id.toString(),
      phone: '51 5555-9999'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new UserAlreadyExistsError('51 5555-9999'))
    expect(inMemoryUsersRepository.items[0]).toEqual(
      expect.objectContaining({
        phone: '51 9999-9999',
      })
    )
  })

})
