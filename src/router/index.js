import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import treeTable from '@/components/treeTa'
import Test from '@/components/test'
import Index from '@/view/index'
import Topics from '@/view/demo/index'
import Content from '@/view/demo/content'
import treeTable_test from '@/view/treeTable/index'
import excel1 from '@/view/excel/index'
import excel2 from '@/view/excel/index2'
import excel3 from '@/view/excel/index3'
import excel4 from '@/view/excel/index4'
import login from '@/view/login/index'
import mergeTable from '@/view/mergeTable/index'

import gantt from '@/view/gantt/index'

Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
      component: Index
   },
   {
      path: '/treeTable',
      name: 'TreeTable',
      component: treeTable
    },
   {
      path: '/test',
      name: 'test',
      component: Test
   }, 
		{
		   path: '/topics', //话题列表
		   component: Topics
		},
		{
		   path: '/content/:id',//评论内容
		   component: Content
		},
		{
		   path: '/treeTable_test',//评论内容
		   component: treeTable_test
		},
   {
      path: '/excel1',
      component: excel1
    },
   {
      path: '/exce2',
      component: excel2
    },
   {
      path: '/exce3',
      component: excel3
    },
   {
      path: '/exce4',
      component: excel4
    },
   {
      path: '/login',
      component: login
    },
   {
      path: '/mergeTable',
      component: mergeTable
    },
   {
      path: '/gantt_view',
      component: gantt
    }
  ]
})
