import Vue from 'vue'
import Router from 'vue-router'
import SignUpForm from '@/components/SignUpForm'
import UserProfileSettings from '@/components/User/Settings/UserProfileSettings'
import UserPasswordSettings
from '@/components/User/Settings/UserPasswordSettings'
import Home from '@/components/Home'
import Users from '@/components/Users'
import SinglePost from '@/components/Posts/SinglePost'
import Edit from '@/components/Posts/Edit'
import Category from '@/components/Posts/Category'
import UserProfile from '@/components/User/Profile/UserProfile'
import UsersFollowing from '@/components/User/Profile/UsersFollowing'
import UserFollowers from '@/components/User/Profile/UserFollowers'
import FavoritePosts from '@/components/User/Profile/FavoritePosts'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: Home
        }, {
            path: '/authors',
            component: Users
        },
        {
            path: '/register',
            component: SignUpForm
        },
        {
            path: '/settings/profile',
            component: UserProfileSettings
        },
        {
            path: '/settings/password',
            component: UserPasswordSettings
        },
        {
            path: '/following',
            component: UsersFollowing
        },
        {
            path: '/:username/following',
            component: UsersFollowing,
            props: true
        },
        {
            path: '/followers',
            component: UserFollowers
        },
        {
            path: '/:username/followers',
            component: UserFollowers,
            props: true
        },
        {
            path: '/favorites',
            component: FavoritePosts
        },
        {
            path: '/:username/favorites',
            component: FavoritePosts,
            props: true
        },
        {
            path: '/:username',
            component: UserProfile,
            props: true
        },
        {
            path: '/post/:id',
            component: SinglePost,
            props: true
        },
        {
            path: '/edit/:id',
            component: Edit,
            props: true
        },
        {
            path: '/category/:tag',
            component: Category,
            props: true
        }
    ]
})