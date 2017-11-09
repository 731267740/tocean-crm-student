import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Readme'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/indexreadme',
                    component: resolve => require(['../components/page/IndexReadme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/surveyadd',
                    component: resolve => require(['../components/page/SurveyAdd.vue'], resolve)
                },
                {
                    path: '/surveyhistory',
                    component: resolve => require(['../components/page/SurveyHistory.vue'], resolve)
                },
                {
                    path: '/dailycommit',
                    component: resolve => require(['../components/page/DailyCommit.vue'], resolve)
                },
                {
                    path: '/dailyhistory',
                    component: resolve => require(['../components/page/DailyHistory.vue'], resolve)
                },
                {
                    path: '/weeklycommit',
                    component: resolve => require(['../components/page/WeeklyCommit.vue'], resolve)
                },
                {
                    path: '/weeklyhistory',
                    component: resolve => require(['../components/page/WeeklyHistory.vue'], resolve)
                },
                {
                    path: '/projectcheck',
                    component: resolve => require(['../components/page/ProjectCheck.vue'], resolve)
                },
                {
                    path: '/workfinish',
                    component: resolve => require(['../components/page/WorkFinish.vue'], resolve)
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
