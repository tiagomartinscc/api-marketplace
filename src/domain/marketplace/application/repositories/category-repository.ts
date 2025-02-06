import { Category } from "../../enterprise/entities/category";

export abstract class CategoryRepository {
  abstract findAll(): Promise<Category[]>
}