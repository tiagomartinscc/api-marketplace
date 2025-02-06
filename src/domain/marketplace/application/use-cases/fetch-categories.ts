import { Injectable } from '@nestjs/common'
import { Either, right } from '@/domain/core/either'
import { Category } from '../../enterprise/entities/category'
import { CategoryRepository } from '../repositories/category-repository'

type FetchCategoriesUseCaseResponse = Either<
  null,
  {
    categories: Category[]
  }
>

@Injectable()
export class FetchCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<FetchCategoriesUseCaseResponse> {
    const categories = await this.categoryRepository.findAll()

    return right({
      categories,
    })
  }
}
