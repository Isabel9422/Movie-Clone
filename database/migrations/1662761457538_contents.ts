import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import CategoryTypes from 'App/Models/enums/CategoryTypes'

export default class extends BaseSchema {
  protected tableName = 'contents'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title')
      table.text('description')
      table.tinyint('year', 4)
      table.enum('category', Object.values(CategoryTypes))
      table.float('rating')
      table.boolean('is_recent')
      table.boolean('is_trending')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
