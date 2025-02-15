import { ProductsRepository } from "@/domain/marketplace/application/repositories/products-repository"
import { Product } from "@/domain/marketplace/enterprise/entities/product"
import { InMemoryProductAttachmentRepository } from "./in-memory-product-attachmenet-repository"
import { InMemoryAttachmentsRepository } from "./in-memory-attachments-repository"
import { InMemoryUsersRepository } from "./in-memory-users-repository"

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  constructor(
    private productAttachmentsRepository: InMemoryProductAttachmentRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private usersRepository: InMemoryUsersRepository,
  ) {}

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }
}
