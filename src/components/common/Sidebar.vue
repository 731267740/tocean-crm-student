<template >
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template >
                <el-menu-item :index="items[0].index">
                    <i :class="items[0].icon"></i>{{ items[0].title }}
                    </el-menu-item>
            </template>
            <template v-if="!!username" v-for="item in items2" >
                <template v-if="item.subs" >
                    <el-submenu :index="item.index" >
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else >
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>

        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-star-on',
                        index: 'indexreadme',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-search',
                        index: '10',
                        title: '学员信息查询',
                        subs: [
                            {
                                index: 'studentsfile',
                                title: '学员档案'
                            },
                            {
                                index: 'attendancerecords',
                                title: '考勤记录'
                            },
                            {
                                index: 'disciplinaryrecord',
                                title: '违纪记录'
                            },
                            {
                                index: 'praiserecord',
                                title: '表扬记录'
                            },
                            {
                                index: 'classmanagement',
                                title: '班级管理积极性'
                            },
                            {
                                index: 'speech',
                                title: '演讲查询'
                            },
                            {
                                index: 'synthesise',
                                title: '综合考评分'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'submitwork',
                        title: '提交作业'
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'submitproject',
                        title: '提交项目'
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'submitresume',
                        title: '上传简历'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '表格',
                        subs: [
                            {
                                index: 'basetable',
                                title: '基础表格'
                            },
                            {
                                index: 'vuetable',
                                title: 'Vue表格组件'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '表单',
                        subs: [
                            {
                                index: 'baseform',
                                title: '基本表单'
                            },
                            {
                                index: 'vueeditor',
                                title: '编辑器'
                            },
                            {
                                index: 'markdown',
                                title: 'markdown'
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'basecharts',
                        title: '图表'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            username(){
                let username = localStorage.getItem('USERNAME');
                return username;
            },
            items2(){
                return this.items.splice(1);
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        height: 100%;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
        overflow-x:scroll;
        -webkit-scrollbar:none;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
