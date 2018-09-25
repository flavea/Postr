'use strict'

const Category = use('App/Models/Category')
const Post = use('App/Models/Post')

class CategoryController {
    async get({
        response
    }) {
        const category = await Category.query()
            .distinct('tag')

        return response.json({
            status: 'success',
            message: 'Category got!',
            data: category
        })
    }
    async add({
        request,
        response
    }) {
        const category = await Category.create({
            post_id: request.input('post'),
            tag: request.input('tag')
        })

        return response.json({
            status: 'success',
            message: 'Category created!',
            data: category
        })
    }

    async show({
        params,
        response
    }) {
        const category = await Category.query()
            .where('tag', params.tag)
            .innerJoin('posts', "categories.post_id", "posts.id")

        return response.json({
            status: 'success',
            data: category
        })
    }

    async destroy({
        params,
        response
    }) {
        const post = await Category.query()
            .where('post_id', params.id)
            .where('tag', params.tag)
            .firstOrFail()

        await post.delete()

        return response.json({
            status: 'success',
            message: 'Category deleted!',
            data: null
        })
    }
}

module.exports = CategoryController