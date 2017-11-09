<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
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
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '自述'
                    },
                    {
                        icon: 'el-icon-star-off',
                        index: 'indexreadme',
                        title: '首页'
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
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: 'drag',
                        title: '拖拽'
                    },
                    {
                        icon: 'el-icon-document',
                        index: '11',
                        title: '提交报告',
                        subs: [
                            {
                                index: 'dailycommit',
                                title: '提交日报'
                            },
                            {
                                index: 'weeklycommit',
                                title: '提交周报'
                            },
                            {
                                index: 'dailyhistory',
                                title: '历史日报'
                            },
                            {
                                index: 'weeklyhistory',
                                title: '历史周报'
                            }

                        ]
                    },
                    {
                        icon: 'el-icon-edit',
                        index: '1',
                        title: '问卷调查',
                        subs: [
                            {
                                index: 'surveyadd',
                                title: '填写问卷'
                            },
                            {
                                index: 'surveyhistory',
                                title: '历史问卷'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '111',
                        title: '学员信息查询',
                        subs: [
                            {
                                index: 'workfinish',
                                title: '作业完成情况'
                            },
                            {
                                index: 'projectcheck',
                                title: '项目考核情况'
                            }
                        ]
                    }


                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
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
        overflow-x: scroll;
        -webkit-scrollbat:none;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
