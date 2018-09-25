'use strict'

const Model = use('Model')

class Category extends Model {
    posts() {
        return this.hasMany('App/Models/Post')
    }
}

module.exports = Category