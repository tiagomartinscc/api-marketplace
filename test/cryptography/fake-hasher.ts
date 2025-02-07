import { HashComparer } from "@/domain/marketplace/application/criptography/hash-comparer"
import { HashGenerator } from "@/domain/marketplace/application/criptography/hash-generator"

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
