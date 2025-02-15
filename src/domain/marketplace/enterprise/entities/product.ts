import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { ProductAttachmentList } from './product-attachment-list'
import { Optional } from '@/core/types/optional'

export interface ProductProps {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachments: ProductAttachmentList
}

export class Product extends AggregateRoot<ProductProps> {
  
  get title() {
    return this.props.title
  }

  get categoryId() {
    return this.props.categoryId
  }

  get description() {
    return this.props.description
  }

  get priceInCents() {
    return this.props.priceInCents
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: ProductAttachmentList) {
    this.props.attachments = attachments
  }
 
  static create(
    props: Optional<ProductProps, 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const product = new Product(
      {
        ...props,
        attachments: props.attachments ?? new ProductAttachmentList(),
      },
      id,
    )

    return product
  }
}
