import { UsersRepository } from "@/domain/marketplace/application/repositories/users-repository"
import { User } from "@/domain/marketplace/enterprise/entities/user"

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(user => user.email === email)

    if (!user) {
      return null
    }
    return user
  }
  
  async findByPhone(phone: string): Promise<User | null> {
    const user = this.items.find(user => user.phone === phone)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }
}
