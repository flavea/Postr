import axios from 'axios'

export default {
    data() {
        return {
            loading: false,
            user: Object,
            authUser: Object
        }
    },
    created() {
        const token = localStorage.getItem('postr-token')

        this.$_profileMixin_fetchUser(this.$route.params.username)
        if (token && token != null && token != "") this.$_profileMixin_fetchAuthenticatedUser(token)
    },
    computed: {
        isLoggedIn() {
            return !!this.authUser
        }
    },
    methods: {
        $_profileMixin_fetchUser(username) {
            this.loading = true
            if (username) {
                axios.get(`user/${username}`).then(response => {
                    this.user = response.data.data
                    this.loading = false
                })
            } else {
                const token = localStorage.getItem('postr-token')

                axios
                    .get('account/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        this.user = response.data.data
                        this.loading = false
                    })
            }
        },
        $_profileMixin_fetchAuthenticatedUser(token) {
            this.loading = true
            axios
                .get('account/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    this.authUser = response.data.data
                    this.loading = false
                })
        }
    }
}