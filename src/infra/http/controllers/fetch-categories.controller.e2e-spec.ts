import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/prisma/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CategoryFactory } from 'test/factories/make-category'

describe('Fetch categories (E2E)', () => {
  let app: INestApplication
  let categoryFactory: CategoryFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CategoryFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    categoryFactory = moduleRef.get(CategoryFactory)

    await app.init()
  })

  test('[GET] /categories', async () => {
    const category = await categoryFactory.makePrismaCategory({title: 'Category 01'})

    const response = await request(app.getHttpServer())
      .get(`/categories/`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      categories: expect.arrayContaining([
        expect.objectContaining({ title: 'Category 01' }),
      ]),
    })
  })
})
