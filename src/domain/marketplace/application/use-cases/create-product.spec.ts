import { InMemoryProductsRepository } from "test/repositories/in-memory-product-repository"
import { CreateProductUseCase } from "./create-product"
import { InMemoryAttachmentsRepository } from "test/repositories/in-memory-attachments-repository"
import { InMemoryProductAttachmentRepository } from "test/repositories/in-memory-product-attachmenet-repository"
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryProductAttachmentsRepository: InMemoryProductAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let sut: CreateProductUseCase

describe('Create Product', () => {
  beforeEach(() => {
    inMemoryProductAttachmentsRepository =
      new InMemoryProductAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryUsersRepository,
    )
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create a product', async () => {
    const result = await sut.execute({
      categoryId: '1',
      title: 'Iphone 17',
      description: 'Caro como um carro',
      priceInCents: 20000000,
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items[0]).toEqual(result.value?.product)
    expect(
      inMemoryProductsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryProductsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
