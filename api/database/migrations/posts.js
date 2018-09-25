'use strict'

const Schema = use('Schema')

class Posts extends Schema {
    up() {
        this.create('posts', table => {
            table.increments()
            table.integer('user_id').unsigned().notNullable()
            table.text('title').notNullable()
            table.text('body').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('posts')
    }
}

module.exports = Posts