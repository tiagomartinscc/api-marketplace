import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Edit user (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PrismaService],
    }).compile()

    prisma = new PrismaService()
    app = moduleRef.createNestApplication()

    await app.init()
  })

  test.only('[PUT] /user', async () => {

    const user = await prisma.user.create({
      data: {
        email: 'james@teste.com',
        name: 'James',
        phone: '51 78945645',
        password: '987987987',
      },
    })

    const response = await request(app.getHttpServer()).put('/user').send({
      id: user.id,
      email: 'james@teste.com',
      name: 'James',
      phone: '51 78945645',
      password: '987987987',
      confirm_password: '987987987'
    })

    const userAlterUpdated = await prisma.user.findUnique({
      where: {
        id: user.id
      }
    })

    expect(response.statusCode).toBe(204)
    expect(userAlterUpdated).toEqual(
      expect.objectContaining({
        email: 'james@teste.com',
        name: 'James',
        phone: '51 78945645'
      })
    )
  })
})
