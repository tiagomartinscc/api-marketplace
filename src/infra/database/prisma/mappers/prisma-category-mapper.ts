import { UniqueEntityID } from '@/domain/core/entities/unique-entity-id'
import { Category } from '@/domain/marketplace/enterprise/entities/category'
import { Slug } from '@/domain/marketplace/enterprise/entities/value-objects/slug'
import { Category as PrismaCategory, Prisma } from '@prisma/client'

export class PrismaCategoryMapper {
  static listToDomain(list: PrismaCategory[]): Category[] {
    return list.map(raw => PrismaCategoryMapper.toDomain(raw))
  }

  static toDomain(raw: PrismaCategory): Category {
    return Category.create(
      {
        title: raw.title,
        categoryId: new UniqueEntityID(raw.id),
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(category: Category): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id.toString(),
      title: category.title,
      slug: category.slug.value,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }
}
