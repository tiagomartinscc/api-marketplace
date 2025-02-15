import { ProductsRepository } from "@/domain/marketplace/application/repositories/products-repository"
import { Product } from "@/domain/marketplace/enterprise/entities/product"

export class InMemoryProductAttachmentRepository implements ProductsRepository {
  public items: Product[] = []

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }
}
