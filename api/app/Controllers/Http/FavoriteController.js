'use strict'

const Favorite = use('App/Models/Favorite')

class FavoriteController {
    async favorite({
        request,
        auth,
        response
    }) {
        const user = auth.current.user

        const postId = request.input('post_id')

        const favorite = await Favorite.findOrCreate({
            user_id: user.id,
            post_id: postId
        }, {
            user_id: user.id,
            post_id: postId
        })

        return response.json({
            status: 'success',
            data: favorite
        })
    }

    async unFavorite({
        params,
        auth,
        response
    }) {
        const user = auth.current.user

        await Favorite.query()
            .where('user_id', user.id)
            .where('post_id', params.id)
            .delete()

        return response.json({
            status: 'success',
            data: null
        })
    }
}

module.exports = FavoriteController