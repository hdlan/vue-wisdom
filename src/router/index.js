import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import List from '@/components/List.vue'
import listInfo from '@/components/listInfo.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Index,
        },
        {
            path: '/List',
            component: List
        },
        {
            path: '/listInfo',
            component: listInfo
        },
    ]
})
