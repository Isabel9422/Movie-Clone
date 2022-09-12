import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import {
  responsiveAttachment,
  ResponsiveAttachmentContract,
} from '@ioc:Adonis/Addons/ResponsiveAttachment'
import Content from './Content'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @responsiveAttachment({ preComputeUrls: true })
  public imageXlMd: ResponsiveAttachmentContract | null

  @responsiveAttachment({ preComputeUrls: true })
  public imageLgSm: ResponsiveAttachmentContract | null

  @column()
  public ContentId: number

  @belongsTo(() => Content)
  public Content: BelongsTo<typeof Content>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
