import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image'
import CreateImageValidator from 'App/Validators/CreateImageValidator'
import UpdateImageValidator from 'App/Validators/UpdateImageValidator'

export default class ImagesController {
  public async store({ request, response }: HttpContextContract) {
    const image = new Image()
    const validatedData = await request.validate(CreateImageValidator)
    const imageXlMd = request.file('imageXlMd')
    const imageLgSm = request.file('imageLgSm')
    if (!validatedData) {
      response.badRequest()
    }
    image.imageXlMd = imageXlMd ? await ResponsiveAttachment.fromFile(imageXlMd) : null
    image.imageLgSm = imageLgSm ? await ResponsiveAttachment.fromFile(imageLgSm) : null
    image.ContentId = request.input('ContentId')
    await image.save()

    return response.ok(image)
  }

  public async update({ request, response }: HttpContextContract) {
    const image = await Image.findByOrFail('id', request.params().id)
    const validateData = await request.validate(UpdateImageValidator)
    const imageXlMd = request.file('imageXlMd')!
    const imageLgSm = request.file('imageLgSm')!
    const isEmpty = Object.entries(validateData).length === 0
    if (isEmpty || !validateData) {
      return response.badRequest()
    }
    image.imageXlMd = imageXlMd ? await ResponsiveAttachment.fromFile(imageXlMd) : image.imageXlMd
    image.imageLgSm = imageLgSm ? await ResponsiveAttachment.fromFile(imageLgSm) : image.imageLgSm
    image.ContentId = request.input('ContentId')

    await image.merge(image).save()
    return response.ok({ data: image })
  }

  public async show({ response, request }: HttpContextContract) {
    const image = await Image.findByOrFail('id', request.params().id)

    if (!image) response.badRequest
    return response.json(image)
  }

  public async destroy({ response, request }: HttpContextContract) {
    const image = await Image.findByOrFail('id', request.params().id)
    if (!image) response.badRequest
    await image.delete()
    return response.ok('Image deleted')
  }

  public async index({ response }: HttpContextContract) {
    const images = await Image.query()
    return response.ok(images)
  }

  public async urls({ response }: HttpContextContract) {
    const post = await Image.findOrFail(1)
    const prueba = post.imageXlMd!.breakpoints!.thumbnail.url // exists
    if (prueba !== null) response.badRequest
    response.ok(prueba)
  }
}
