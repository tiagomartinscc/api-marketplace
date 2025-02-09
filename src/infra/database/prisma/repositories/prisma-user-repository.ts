import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UsersRepository } from '@/domain/marketplace/application/repositories/users-repository'
import { User } from '@/domain/marketplace/enterprise/entities/user'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async find(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) {
      return null
    }
    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return null
    }
    return PrismaUserMapper.toDomain(user)
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        phone,
      },
    })
    if (!user) {
      return null
    }
    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)
    await this.prisma.user.create({
      data,
    })
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.update({
      where: {
        id: user.id.toString(),
      },
      data,
    })
  }
}
