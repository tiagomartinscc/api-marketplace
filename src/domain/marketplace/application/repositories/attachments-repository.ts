import { Attachment } from '../../enterprise/entities/product-attachment'

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}
