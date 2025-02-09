import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service';
import { CategoryRepository } from '@/domain/marketplace/application/repositories/category-repository';
import { PrismaCategoryRepository } from './repositories/prisma-category-repository';
import { UsersRepository } from '@/domain/marketplace/application/repositories/users-repository';
import { PrismaUserRepository } from './repositories/prisma-user-repository';
import { AttachmentsRepository } from '@/domain/marketplace/application/repositories/attachments-repository';
import { PrismaAttachmentsRepository } from './repositories/prisma-attachments-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },     
  ],
  exports: [
    PrismaService,
    CategoryRepository,
    UsersRepository,
    AttachmentsRepository
  ],
})
export class DatabaseModule {}
