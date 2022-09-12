import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryTypes from 'App/Models/enums/CategoryTypes'

export default class UpdateContentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional({}),
    description: schema.string.optional({}),
    year: schema.number.optional(),
    category: schema.enum.optional(Object.values(CategoryTypes)),
    rating: schema.number.optional(),
    isRecent: schema.boolean.optional(),
    isTrending: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
