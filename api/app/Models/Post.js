'use strict'

const Model = use('Model')

class Post extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    comments() {
        return this.hasMany('App/Models/Comment')
    }

    favorites() {
        return this.hasMany('App/Models/Favorite')
    }

    categories() {
        return this.hasMany('App/Models/Category')
    }
}

module.exports = Post