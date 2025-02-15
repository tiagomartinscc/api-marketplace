import { Either, right } from "@/core/either"
import { Injectable } from "@nestjs/common"
import { Product } from "../../enterprise/entities/product"
import { ProductsRepository } from "../repositories/products-repository"
import { ProductAttachment } from "../../enterprise/entities/product-attachment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ProductAttachmentList } from "../../enterprise/entities/product-attachment-list"

interface CreateProductUseCaseRequest {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

type CreateProductUseCaseResponse = Either<
  null,
  {
    product: Product
  }
>

@Injectable()
export class CreateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    title,
    description,
    categoryId,
    priceInCents,
    attachmentsIds
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {

    const product = Product.create({
      title,
      description,
      categoryId,
      priceInCents,
    })

    const attachments = attachmentsIds.map(
      attachmentId => ProductAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        productId: product.id,
      })
    )

    product.attachments = new ProductAttachmentList(attachments)

    await this.productsRepository.create(product)

    return right({
      product,
    })
  }
}
