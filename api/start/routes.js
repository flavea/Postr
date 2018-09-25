'use strict'
const Helpers = use('Helpers')
const Route = use('Route')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)

Route.post('/signup', 'UserController.signup')
Route.post('/login', 'UserController.login')
Route.get('user/:username', 'UserController.showProfile')
Route.group(() => {
        Route.get('/me', 'UserController.me')
        Route.put('/update_profile', 'UserController.updateProfile')
        Route.put('/change_password', 'UserController.changePassword')
    })
    .prefix('account')
    .middleware(['auth:jwt'])

Route.get('/timeline', 'PostController.timeline')


Route.get('/users/get', 'UserController.users')
Route.group(() => {
        Route.post('/follow', 'UserController.follow')
        Route.delete('/unfollow/:id', 'UserController.unFollow')
    })
    .prefix('users')
    .middleware(['auth:jwt'])

Route.post('/add', 'PostController.add').middleware(['auth:jwt'])
Route.post('/edit/:id', 'PostController.update').middleware(['auth:jwt'])
Route.get('/posts/:id', 'PostController.show')
Route.post('/posts/reply/:id', 'PostController.comment').middleware(['auth:jwt'])

Route.delete('/destroy/:id', 'PostController.destroy').middleware([
    'auth:jwt'
])
Route.delete('/comments/destroy/:id', 'CommentController.destroy').middleware([
    'auth:jwt'
])

Route.group(() => {
        Route.post('/create', 'FavoriteController.favorite')
        Route.delete('/destroy/:id', 'FavoriteController.unFavorite')
    })
    .prefix('favorites')
    .middleware(['auth:jwt'])

Route.group(() => {
        Route.get('/get', 'CategoryController.get')
        Route.post('/add', 'CategoryController.add')
        Route.delete('/destroy/:id/:tag', 'CategoryController.destroy')
        Route.get('/show/:tag', 'CategoryController.show')
    })
    .prefix('categories')

Route.post('upload', async({ request }) => {
    const profilePic = request.file('profile_pic', {
        types: ['image'],
        size: '2mb'
    })

    await profilePic.move(Helpers.tmpPath('uploads'))

    if (!profilePic.moved()) {
        return profilePic.error()
    }
    return profilePic
})

Route.get('img/:image', async({ params }) => {
    return await readFile('tmp/uploads/' + params.image)
})