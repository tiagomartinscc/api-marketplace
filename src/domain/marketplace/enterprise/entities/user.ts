import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UserProps {
  name: string
  email: string
  phone: string
  password: string
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }  

  get password() {
    return this.props.password
  }

  set name(name: string) {
    this.props.name = name
  }

  set email(email:string) {
    this.props.email = email
  }

  set phone(phone: string) {
    this.props.phone = phone
  }  

  set password(password) {
    this.props.password = password
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id)

    return user
  }
}
