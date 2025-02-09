import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common"
import { z } from "zod"
import { ZodValidationPipe } from "../pipes/zod-validation-pipe"
import { Public } from "@/infra/auth/public"
import { AuthenticateUseCase } from "@/domain/marketplace/application/use-cases/authenticate"
import { WrongCredentialsError } from "@/domain/marketplace/application/use-cases/errors/wrong-credentials-error"

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(authenticateBodySchema)
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/authenticate')
@Public()
export class AuthenticateController {
  constructor(
    private authenticateUseCase: AuthenticateUseCase
  ) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) { 
      email, 
      password,
    }: AuthenticateBodySchema,
  ) {
    const result = await this.authenticateUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
