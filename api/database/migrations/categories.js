'use strict'

const Schema = use('Schema')

class Categories extends Schema {
    up() {
        this.create('categories', table => {
            table.increments()
            table.integer('post_id').unsigned().notNullable()
            table.string('tag', 254).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('categories')
    }
}

module.exports = Categories