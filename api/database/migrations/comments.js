'use strict'

const Schema = use('Schema')

class Comments extends Schema {
    up() {
        this.create('comments', table => {
            table.increments()
            table.integer('user_id').unsigned().notNullable()
            table.integer('post_id').unsigned().notNullable()
            table.text('comment').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('comments')
    }
}

module.exports = Comments