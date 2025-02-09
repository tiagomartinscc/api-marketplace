import { User } from "../../enterprise/entities/user";

export abstract class UsersRepository {
  abstract find(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findByPhone(phone: string): Promise<User | null>
  abstract create(user: User): Promise<void>
  abstract save(user: User): Promise<void>
}