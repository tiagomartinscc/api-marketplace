import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CategoryRepository } from '@/domain/marketplace/application/repositories/category-repository'
import { Category } from '@/domain/marketplace/enterprise/entities/category'
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany()
    return PrismaCategoryMapper.listToDomain(categories)
  }
}
