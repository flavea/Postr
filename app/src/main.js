// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import moment from 'moment'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
import 'materialize-css/dist/css/materialize.min.css';
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

window.axios = axios

axios.defaults.baseURL = 'http://127.0.0.1:3333'

Vue.use(VeeValidate)
Vue.use(KeenUI);
Vue.use(wysiwyg, {});

Vue.filter('truncate', function(text, stop, clamp) {
    return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

Vue.filter('strip', function(value) {
    var div = document.createElement("div");
    div.innerHTML = value;
    var text = div.textContent || div.innerText || "";
    return text;
});

Vue.config.productionTip = false

Vue.filter('timeAgo', date => moment(date).fromNow())
Vue.filter('joined', date => moment(date).format('MMMM YYYY'))
Vue.filter('dob', date => moment(date).format('MMMM Do YYYY'))

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})