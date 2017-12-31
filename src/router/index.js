import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/components/IndexPage'
import TopIns from '@/components/TopIns'
import AboutPage from '@/components/AboutPage'
import Profile from '@/components/Profile'
import InsList from '@/components/InsList'
import InsIndex from '@/components/InsIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage,
      children: [
        {
          path: '/',
          name: 'Ins',
          component: InsList
        },
        {
          path: '/ins/:id',
          component: InsIndex
        }
      ]
    },
    {
      path: '/topInsPage',
      name: 'TopInsPage',
      component: TopIns
    },
    {
      path: '/aboutPage',
      name: 'AboutPage',
      component: AboutPage
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '*',
      redirect:
      {
        name: 'IndexPage'
      }
    }
  ],
  mode: 'history',
  base: '/',
  scrollBehavior (to, from, savedPosition) {
    // 如果你的連結是帶 # 這種
    // to.hash 就會有值(值就是連結)
    // 例如 #3
    if (to.hash) {
      return {
        // 這個是透過 to.hash 的值來找到對應的元素
        // 照你的 html 來看是不用多加處理這樣就可以了
        // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
        selector: to.hash
      }
    }
  }
})
