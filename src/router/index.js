import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/IndexReadme'
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
                    component: resolve => require(['../components/page/IndexReadme.vue'], resolve)  // 首页
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
                    path: '/submitwork',
                    component: resolve => require(['../components/page/SubmitWork.vue'], resolve)    // 提交作业
                },
                {
                    path: '/submitproject',
                    component: resolve => require(['../components/page/SubmitProject.vue'], resolve)    // 提交项目
                },
                {
                    path: '/submitresume',
                    component: resolve => require(['../components/page/SubmitResume.vue'], resolve)    //上传简历
                },
                {
                    path: '/synthesise',
                    component: resolve => require(['../components/page/SynthesiseTable.vue'], resolve)    //综合考评分
                },
                {
                    path: '/classmanagement',
                    component: resolve => require(['../components/page/ClassManagement.vue'], resolve)    //班级管理积极性
                },
                {
                    path: '/speech',
                    component: resolve => require(['../components/page/Speech.vue'], resolve)    //演讲查询
                },
                {
                    path: '/studentsfile',
                    component: resolve => require(['../components/page/StudentsFile.vue'], resolve)    //学员档案
                },
                {
                    path: '/attendancerecords',
                    component: resolve => require(['../components/page/AttendanceRecords.vue'], resolve)    //考勤记录
                },
                {
                    path: '/disciplinaryrecord',
                    component: resolve => require(['../components/page/DisciplinaryRecord.vue'], resolve)    //违纪记录
                },
                {
                    path: '/praiserecord',
                    component: resolve => require(['../components/page/PraiseRecord.vue'], resolve)    //考勤记录
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
