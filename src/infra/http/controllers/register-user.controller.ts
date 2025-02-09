import { RegisterUserUseCase } from "@/domain/marketplace/application/use-cases/register-user"
import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common"
import { z } from "zod"
import { ZodValidationPipe } from "../pipes/zod-validation-pipe"
import { Public } from "@/infra/auth/public"

const registerUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(8),
  password: z.string().min(3).max(10),
  confirm_password: z.string().min(3).max(10)
}).refine(data => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"]
})

const bodyValidationPipe = new ZodValidationPipe(registerUserBodySchema)
type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>

@Controller('/register')
@Public()
export class RegisterUserController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase
  ) {}

  @Post()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) { 
      name, 
      email, 
      phone, 
      password,
      confirm_password}: RegisterUserBodySchema,
  ) {
    const result = await this.registerUserUseCase.execute({
      name,
      email,
      phone,
      password
      }
    )

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}
