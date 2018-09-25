'use strict'

const Model = use('Model')

class User extends Model {
    static boot() {
        super.boot()
        this.addHook('beforeCreate', 'User.hashPassword')
    }

    static get hidden() {
        return ['password']
    }

    tokens() {
        return this.hasMany('App/Models/Token')
    }

    posts() {
        return this.hasMany('App/Models/Post')
    }

    comments() {
        return this.hasMany('App/Models/Comment')
    }

    followers() {
        return this.belongsToMany(
            'App/Models/User',
            'user_id',
            'follower_id'
        ).pivotTable('followers')
    }

    following() {
        return this.belongsToMany(
            'App/Models/User',
            'follower_id',
            'user_id'
        ).pivotTable('followers')
    }

    favorites() {
        return this.hasMany('App/Models/Favorite')
    }

    replies() {
        return this.hasMany('App/Models/Reply')
    }
}

module.exports = User