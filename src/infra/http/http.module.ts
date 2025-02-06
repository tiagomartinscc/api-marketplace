import { Module } from '@nestjs/common'
import { FetchCategoriesController } from './controllers/fetch-categories.controller';
import { FetchCategoriesUseCase } from '@/domain/marketplace/application/use-cases/fetch-categories';
import { DatabaseModule } from '../database/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    FetchCategoriesController,
  ],
  providers: [
    FetchCategoriesUseCase,
  ],
})
export class HttpModule {}
