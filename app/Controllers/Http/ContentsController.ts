import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'
import CreateContentValidator from 'App/Validators/CreateContentValidator'
import SortContentValidator from 'App/Validators/SortContentValidator'
import UpdateContentValidator from 'App/Validators/UpdateContentValidator'

export default class ContentsController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateContentValidator)
    const content = await Content.create(data)

    return response.ok(content)
  }

  public async update({ request, response }: HttpContextContract) {
    const content = await Content.findByOrFail('id', request.params().id)
    const validatedData = await request.validate(UpdateContentValidator)
    const isEmpty = Object.entries(content).length === 0
    if (isEmpty) {
      return response.badRequest()
    }
    await content.merge(validatedData).save()
    return response.ok({ data: content })
  }

  public async show({ params: { id }, response }: HttpContextContract) {
    const content = await Content.query().where('id', id).preload('images').firstOrFail()

    if (!content) response.badRequest
    return response.json(content)
  }

  public async destroy({ response, request }: HttpContextContract) {
    const content = await Content.findByOrFail('id', request.params().id)
    if (!content) response.badRequest
    await content.delete()
    return response.ok('Content deleted')
  }

  public async index({ response, request }: HttpContextContract) {
    const title = request.input('title') ?? null
    const year = request.input('year') ?? null
    const rating = request.input('rating') ?? null
    const category = request.input('category') ?? null
    const isRecent = request.input('is_recent') ?? null
    const isTrending = request.input('is_trending') ?? null
    const validatedData = await request.validate(SortContentValidator)
    const sort = validatedData.sort || 'id'
    const order = validatedData.order || 'asc'

    const content = await Content.query()
      .if(title, (query) => query.where('title', 'like', `%${title}%`))
      .if(year, (query) => query.where('year', '=', year))
      .if(rating, (query) => query.where('price', '>=', rating))
      .if(category, (query) => query.where('category', category))
      .if(isRecent, (query) => query.where('is_recent', isRecent))
      .if(isTrending, (query) => query.where('is_trending', isTrending))
      .orderBy(sort, order)
      .preload('images')
    response.ok({ data: content })
  }
}
