import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service';
import { CategoryRepository } from '@/domain/marketplace/application/repositories/category-repository';
import { PrismaCategoryRepository } from './repositories/prisma-category-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [
    PrismaService,
    CategoryRepository
  ],
})
export class DatabaseModule {}
