import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Register user (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /register', async () => {
    const response = await request(app.getHttpServer()).post('/register').send({
      email: 'tiago@teste.com',
      name: 'Tiago',
      phone: '51 982240214',
      password: '123456',
      confirm_password: '123456'
    })

    expect(response.statusCode).toBe(204)
  })
})
