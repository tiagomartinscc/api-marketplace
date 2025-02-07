import { User } from "../../enterprise/entities/user";

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract findByPhone(phone: string): Promise<User | null>
  abstract create(user: User): Promise<void>
}