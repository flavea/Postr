'use strict'

const Comment = use('App/Models/Comment')

class CommentController {

    async destroy({
        params,
        response
    }) {
        const comment = await Comment.query()
            .where('id', params.id)
            .firstOrFail()

        await comment.delete()

        return response.json({
            status: 'success',
            message: 'Comment deleted!',
            data: null
        })
    }
}

module.exports = CommentController