import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaCategoryMapper } from '@/infra/database/prisma/mappers/prisma-category-mapper'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Category, CategoryProps } from '@/domain/marketplace/enterprise/entities/category'

export function makeCategory(
  override: Partial<CategoryProps> = {},
  id?: UniqueEntityID,
) {
  const category = Category.create(
    {
      title: faker.person.jobTitle(),
      ...override,
    },
    id,
  )

  return category
}

@Injectable()
export class CategoryFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCategory(data: Partial<CategoryProps> = {}): Promise<Category> {
    const category = makeCategory(data)

    await this.prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(category),
    })

    return category
  }
}
