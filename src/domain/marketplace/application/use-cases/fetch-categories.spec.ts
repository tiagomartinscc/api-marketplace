import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories-repository'
import { FetchCategoriesUseCase } from './fetch-categories'
import { makeCategory } from 'test/factories/make-category'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let sut: FetchCategoriesUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    sut = new FetchCategoriesUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to fetch categories', async () => {
    const category = makeCategory({ title: 'John Doe' })

    inMemoryCategoriesRepository.items.push(category)

    const result = await sut.execute()

    expect(result.value?.categories).toHaveLength(1)
    expect(result.value?.categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'John Doe',
        }),
      ]),
    )
  })

})
