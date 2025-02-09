import { UsersRepository } from "@/domain/marketplace/application/repositories/users-repository"
import { User } from "@/domain/marketplace/enterprise/entities/user"

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async find(id: string): Promise<User | null> {
    const user = this.items.find(user => user.id.toString() === id)

    if (!user) {
      return null
    }
    return user
  }

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

  async save(user: User): Promise<void> {
    const index = this.items.findIndex(u => user.equals(u))
    if (index >= 0) {
      this.items[index] = user
    }
  }
}
