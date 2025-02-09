import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/prisma/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

import { FetchCategoriesController } from './controllers/fetch-categories.controller';
import { FetchCategoriesUseCase } from '@/domain/marketplace/application/use-cases/fetch-categories';
import { RegisterUserController } from './controllers/register-user.controller';
import { RegisterUserUseCase } from '@/domain/marketplace/application/use-cases/register-user';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateUseCase } from '@/domain/marketplace/application/use-cases/authenticate';
import { EditUserController } from './controllers/edit-user.controller';
import { EditUserUseCase } from '@/domain/marketplace/application/use-cases/edit-user';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    FetchCategoriesController,
    RegisterUserController,
    AuthenticateController,
    EditUserController,
  ],
  providers: [
    FetchCategoriesUseCase,
    RegisterUserUseCase,
    AuthenticateUseCase,
    EditUserUseCase
  ],
})
export class HttpModule {}
