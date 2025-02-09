import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/prisma/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { StorageModule } from '../storage/storage.module';

import { FetchCategoriesController } from './controllers/fetch-categories.controller';
import { FetchCategoriesUseCase } from '@/domain/marketplace/application/use-cases/fetch-categories';
import { RegisterUserController } from './controllers/register-user.controller';
import { RegisterUserUseCase } from '@/domain/marketplace/application/use-cases/register-user';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateUseCase } from '@/domain/marketplace/application/use-cases/authenticate';
import { EditUserController } from './controllers/edit-user.controller';
import { EditUserUseCase } from '@/domain/marketplace/application/use-cases/edit-user';
import { UploadAttachmentController } from './controllers/upload-attachment.controller';
import { UploadAndCreateAttachmentUseCase } from '@/domain/marketplace/application/use-cases/upload-and-create-attachment';

@Module({
  imports: [
    DatabaseModule, 
    CryptographyModule, 
    StorageModule
  ],
  controllers: [
    FetchCategoriesController,
    RegisterUserController,
    AuthenticateController,
    EditUserController,
    UploadAttachmentController
  ],
  providers: [
    FetchCategoriesUseCase,
    RegisterUserUseCase,
    AuthenticateUseCase,
    EditUserUseCase,
    UploadAndCreateAttachmentUseCase
  ],
})
export class HttpModule {}
