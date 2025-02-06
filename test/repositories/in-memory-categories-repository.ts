import { CategoryRepository } from "@/domain/marketplace/application/repositories/category-repository"
import { Category } from "@/domain/marketplace/enterprise/entities/category"

export class InMemoryCategoriesRepository implements CategoryRepository {
  public items: Category[] = []

  async findAll() {
    const category = this.items

    return category
  }
}
