import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Frame from '@/layout/frame'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '后台首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    meta: { title: '文章管理', icon: 'article' },
    children: [
      {
        path: '',
        component: () => import('@/views/article/list'),
        meta: { title: '文章列表' }
      },
      {
        path: 'add',
        component: () => import('@/views/article/edit'),
        meta: { title: '添加文章' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/article/edit'),
        hidden: true,
        meta: { title: '编辑文章' }
      }
    ]
  },
  {
    path: '/channel',
    component: Layout,
    meta: { title: '栏目管理', icon: 'tree', roles: ['admin'] },
    children: [
      {
        path: '',
        component: () => import('@/views/channel/list'),
        meta: { title: '栏目管理' }
      }
    ]
  },
  {
    path: '/single',
    component: Layout,
    meta: { title: '单页管理', icon: 'article' },
    children: [
      {
        path: '',
        component: () => import('@/views/single/list'),
        meta: { title: '单页列表' }
      },
      {
        path: 'add',
        component: () => import('@/views/single/edit'),
        meta: { title: '添加单页' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/single/edit'),
        hidden: true,
        meta: { title: '编辑单页' }
      }
    ]
  },
  {
    path: '/base',
    component: Layout,
    meta: { title: '辅助管理', icon: 'base' },
    alwaysShow: true,
    children: [
      {
        path: 'author',
        component: () => import('@/views/base/author/list'),
        meta: { title: '作者管理' }
      },
      {
        path: 'origin',
        component: () => import('@/views/base/origin/list'),
        meta: { title: '来源管理' }
      },
      {
        path: 'editor',
        component: () => import('@/views/base/editor/list'),
        meta: { title: '小编管理', roles: ['admin'] }
      },
      {
        path: 'reporter',
        component: () => import('@/views/base/reporter/list'),
        meta: { title: '工作人员管理', roles: ['admin'] }
      },
      {
        path: 'tags',
        component: () => import('@/views/base/tags/list'),
        meta: { title: '关键词管理' }
      },
      {
        path: 'show',
        component: () => import('@/views/base/show/list'),
        meta: { title: '广告管理' }
      },
      {
        path: 'flink',
        component: () => import('@/views/base/flink/list'),
        meta: { title: '友情链接管理', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: '会员管理', icon: 'user' },
    children: [
      {
        path: '',
        component: () => import('@/views/user/list'),
        meta: { title: '会员列表', roles: ['admin'] }
      },
      {
        path: 'complaint',
        component: Frame,
        meta: { title: '投诉管理', roles: ['admin', 'editor'] },
        children: [
          {
            path: '',
            component: () => import('@/views/user/complaint/list'),
            meta: { title: '投诉管理' }
          }
        ]
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', icon: 'setting', roles: ['admin'] },
    alwaysShow: true,
    children: [
      {
        path: 'site',
        component: () => import('@/views/system/site'),
        meta: { title: '基本信息配置' }
      },
      {
        path: 'backup',
        component: () => import('@/views/system/backup'),
        meta: { title: '数据库备份' }
      },
      {
        path: 'manages',
        component: () => import('@/views/system/manages/list'),
        meta: { title: '超级管理员管理', roles: ['admin'] }
      },
      {
        path: 'log',
        component: () => import('@/views/system/log/list'),
        meta: { title: '系统日志', roles: ['admin'] }
      },
      {
        path: '/changePassword',
        component: () => import('@/views/system/changePassword'),
        hidden: true
      },
      {
        path: '/profile',
        component: () => import('@/views/system/profile'),
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
