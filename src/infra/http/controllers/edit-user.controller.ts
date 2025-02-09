import { EditUserUseCase } from "@/domain/marketplace/application/use-cases/edit-user"
import { BadRequestException, Body, Controller, HttpCode, Put } from "@nestjs/common"
import { z } from "zod"
import { ZodValidationPipe } from "../pipes/zod-validation-pipe"
import { Public } from "@/infra/auth/public"

const editUserBodySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(8).optional(),
  password: z.string().min(3).max(10).optional(),
  confirm_password: z.string().min(3).max(10).optional(),
}).refine(data => {
  if (!data.password) {
    return true
  }
  if (!data.confirm_password) {
    return false;
  }  
  if (data.password !== data.confirm_password) {
    return false;
  }
  return true
}, {
  message: "Passwords don't match",
  path: ["confirm_password"]
})

const bodyValidationPipe = new ZodValidationPipe(editUserBodySchema)
type EditUserBodySchema = z.infer<typeof editUserBodySchema>

@Controller('/user')
@Public()
export class EditUserController {
  constructor(
    private editUserUseCase: EditUserUseCase
  ) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) { 
      id,
      name, 
      email, 
      phone, 
      password,
      confirm_password}: EditUserBodySchema,
  ) {
    const result = await this.editUserUseCase.execute({
      id,
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
