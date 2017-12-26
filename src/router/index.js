import Vue from 'vue'
import Router from 'vue-router'

import systemList from '../components/reward/systemList/systemList.vue'
import reviseSystem from '../components/reward/systemList/reviseSystem.vue'
import particularsSystem from '../components/reward/systemList/particularsSystem.vue'
import activitParticulars from '../components/reward/systemList/activitParticulars.vue'
import activityRevise from '../components/reward/systemList/activityRevise.vue'
import creat from '../components/reward/systemList/creat.vue'
import Activity from '../components/reward/systemList/Activity.vue'
import InquireActivity from '../components/reward/systemList/InquireActivity.vue'
import ActivityList from '../components/reward/systemList/ActivityList.vue'
import index from '../components/reward/systemList/index.vue'
import recompose from '../components/reward/systemList/recompose.vue'
import excel from '../components/reward/manual/excel.vue'
import manual from '../components/reward/manual/manual.vue'
import exchange from '../components/reward/exchangeList/exchange.vue'
import exCreat from '../components/reward/exchangeList/ex-creat.vue'
import exInto from '../components/reward/exchangeList/ex-into.vue'
import statistics from '../components/reward/statistics/statistics.vue'

import rule from '../components/rates/ra-rule.vue'
import raCreat from '../components/rates/ra-creat.vue'
import raStatistics from '../components/rates/ra-statistics.vue'

import approval from '../components/approval/approval.vue'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            meta: ['奖励机制', '系统发放'],
            component: systemList
        },{
            path: '/systemList',
            meta: ['奖励机制', '系统发放'],
            component: systemList
        }, {
            path: '/creat',
            meta: ['奖励机制', '创建奖券'],
            component: creat
        },{
          path: '/Activity',
            meta: ['奖励机制', '创建活动'],
          component: Activity
        },{
          path: '/ActivityList',
          meta: ['奖励机制', '活动管理'],
          component: ActivityList
        },{
          path: '/InquireActivity',
          meta: ['奖励机制', '查询活动'],
          component: InquireActivity
        },{
            path: '/index',
            meta: ['奖励机制', '创建奖券'],
            component: index
        }, {
            path: '/recompose',
            meta: ['奖励机制', '创建奖券'],
            component: recompose
        }, {
            path: '/manual',
            meta: ['奖励机制', '手动发放'],
            component: manual
        }, {
            path: '/excel',
            meta: ['奖励机制', '手动发放'],
            component: excel
        }, {
            path: '/exchange',
            meta: ['奖励机制', '兑换码管理'],
            component: exchange
        }, {
            path: '/exCreat',
            meta: ['奖励机制', '兑换码创建'],
            component: exCreat
        }, {
            path: '/exInto',
            component: exInto
        }, {
            path: '/statistics',
            meta: ['奖励机制', '奖券统计'],
            component: statistics
        }, {
            path: '/rule',
            meta: ['加息管理', '规则创建'],
            component: rule
        }, {
            path: '/raCreat',
            meta: ['加息管理', '规则创建'],
            component: raCreat
        }, {
            path: '/raStatistics',
            meta: ['加息管理', '加息统计'],
            component: raStatistics
        }, {
            path: '/approval',
            meta: ['审批管理'],
            component: approval
        }, {
            path: '/reviseSystem',
            meta: ['奖券列表','修改奖券'],
            component: reviseSystem
        }, {
            path: '/particularsSystem',
            meta: ['奖券列表','奖券详情'],
            component: particularsSystem
        }, {
            path: '/activityRevise',
            meta: ['活动列表','修改活动'],
            component: activityRevise
        }, {
            path: '/activitParticulars',
            meta: ['活动列表','活动详情'],
            component: activitParticulars
        }





    ]
})
