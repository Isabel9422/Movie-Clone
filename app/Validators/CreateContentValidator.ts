import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryTypes from 'App/Models/enums/CategoryTypes'

export default class CreateContentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}),
    description: schema.string({}),
    year: schema.number(),
    category: schema.enum(Object.values(CategoryTypes)),
    rating: schema.number(),
    isRecent: schema.boolean(),
    isTrending: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
