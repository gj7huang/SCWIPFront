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
  base: '/'
})
