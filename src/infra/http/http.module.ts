import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/prisma/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

import { FetchCategoriesController } from './controllers/fetch-categories.controller';
import { FetchCategoriesUseCase } from '@/domain/marketplace/application/use-cases/fetch-categories';
import { RegisterUserController } from './controllers/register-user.controller';
import { RegisterUserUseCase } from '@/domain/marketplace/application/use-cases/register-user';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateUseCase } from '@/domain/marketplace/application/use-cases/authenticate';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    FetchCategoriesController,
    RegisterUserController,
    AuthenticateController,
  ],
  providers: [
    FetchCategoriesUseCase,
    RegisterUserUseCase,
    AuthenticateUseCase
  ],
})
export class HttpModule {}
