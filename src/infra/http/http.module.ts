import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/prisma/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

import { FetchCategoriesController } from './controllers/fetch-categories.controller';
import { FetchCategoriesUseCase } from '@/domain/marketplace/application/use-cases/fetch-categories';
import { RegisterUserController } from './controllers/register-user.controller';
import { RegisterUserUseCase } from '@/domain/marketplace/application/use-cases/register-user';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    FetchCategoriesController,
    RegisterUserController,
  ],
  providers: [
    FetchCategoriesUseCase,
    RegisterUserUseCase,
  ],
})
export class HttpModule {}
