'use strict'

const Post = use('App/Models/Post')
const Comment = use('App/Models/Comment')
const Category = use('App/Models/Category')
const Favorite = use('App/Models/Favorite')

class PostController {
    async add({
        request,
        auth,
        response
    }) {
        const user = auth.current.user

        const post = await Post.create({
            user_id: user.id,
            title: request.input('title'),
            body: request.input('body')
        })

        const categories = request.input('categories')

        categories.forEach(d => {
            Category.create({
                post_id: post.id,
                tag: d
            })
        });

        await post.loadMany(['user', 'favorites', 'comments', 'categories'])

        return response.json({
            status: 'success',
            message: 'Post posted!',
            data: post
        })
    }

    async timeline({
        response
    }) {
        const posts = await Post.query()
            .with('user').with('favorites')
            .with('comments')
            .with('categories')
            .fetch()

        return response.json({
            status: 'success',
            data: posts
        })
    }

    async show({
        params,
        response
    }) {
        try {
            const post = await Post.query()
                .where('id', params.id)
                .with('user')
                .with('comments')
                .with('comments.user')
                .with('favorites')
                .with('categories')
                .firstOrFail()

            return response.json({
                status: 'success',
                data: post
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Post not found'
            })
        }
    }

    async comment({
        request,
        auth,
        params,
        response
    }) {
        const user = auth.current.user

        const post = await Post.find(params.id)

        const comment = await Comment.create({
            user_id: user.id,
            post_id: post.id,
            comment: request.input('comment')
        })

        await comment.load('user')

        return response.json({
            status: 'success',
            message: 'Comment posted!',
            data: comment
        })
    }

    async destroy({
        auth,
        params,
        response
    }) {
        const user = auth.current.user

        const post = await Post.query()
            .where('user_id', user.id)
            .where('id', params.id)
            .firstOrFail()

        const favorite = await Favorite.query().where('post_id', params.id)

        await post.delete()
        await favorite.delete()

        return response.json({
            status: 'success',
            message: 'Post deleted!',
            data: null
        })
    }

    async update({
        request,
        auth,
        params,
        response
    }) {
        const user = auth.current.user

        const post = await Post.query()
            .where('user_id', user.id)
            .where('id', params.id)
            .update({
                title: request.input('title'),
                body: request.input('body')
            })

        const categories = request.input('categories')

        categories.forEach(d => {
            Category.create({
                post_id: params.id,
                tag: d
            })
        });

        return response.json({
            status: 'success',
            message: 'Post update!',
            data: post
        })
    }
}

module.exports = PostController