import { User } from '@/domain/marketplace/enterprise/entities/user'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import request from 'supertest'

describe('Upload attachment (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let prisma: PrismaClient

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PrismaClient],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    prisma = new PrismaClient()
    await app.init()
  })

  test('[POST] /attachments', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'teste@example.com',
        name: 'Washington',
        phone: '55 555555555',
        password: 'hello moto!'
      }
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/attachments')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/sample-upload.png')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      attachmentId: expect.any(String),
    })
  })
})
