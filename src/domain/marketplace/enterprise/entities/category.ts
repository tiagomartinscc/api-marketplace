import { Slug } from './value-objects/slug'
import { UniqueEntityID } from '@/domain/core/entities/unique-entity-id'
import { AggregateRoot } from '@/domain/core/entities/aggregate-root'
import { Optional } from '@/domain/core/types/optional'

export interface CategoryProps {
  categoryId: UniqueEntityID
  title: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date | null
}

export class Category extends AggregateRoot<CategoryProps> {
  
  get categoryId() {
    return this.props.categoryId
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<CategoryProps, "createdAt" | "slug">,
    id?: UniqueEntityID,
  ) {
    const category = new Category(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return category
  }
}
