import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SortContentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    order: schema.enum.optional(['asc', 'desc'] as const),
    sort: schema.enum.optional([
      'id',
      'title',
      'year',
      'description',
      'rating',
      'category',
      'isRecent',
      'isTrending',
    ]),
  })

  public messages: CustomMessages = {}
}
