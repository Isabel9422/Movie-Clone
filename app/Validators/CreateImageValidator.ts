import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateImageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    imageXlMd: schema.file(),
    imageLgSm: schema.file(),
    ContentId: schema.number(),
  })

  public messages: CustomMessages = {}
}
