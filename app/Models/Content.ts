import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoryTypes from './enums/CategoryTypes'
import Image from './Image'

export default class Content extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public year: number

  @column()
  public description: string

  @column()
  public rating: number

  @column()
  public category: CategoryTypes

  @column()
  public isRecent: boolean

  @column()
  public isTrending: boolean

  @hasMany(() => Image, { foreignKey: 'ContentId' })
  public images: HasMany<typeof Image>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
