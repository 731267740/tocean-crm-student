<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>学生个人综合信息</el-breadcrumb-item>
                <el-breadcrumb-item>项目考核情况</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="select">

            <div class="select2">
                课程：<el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            </div>
            <div class="search">项目：<el-input class="inp" v-model="select_word"></el-input></div>
        </div>

        <div class="block">
                <span class="demonstration">时间段：</span>
                <el-date-picker
                    v-model="value6"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            &nbsp;&nbsp;得分：<el-input class="inp2"/>至<el-input class="inp2"/>
            <el-button class="btn">查询</el-button>
        </div>


        <div  class="txt" >
            <span>全部文件</span>
            <span style="margin-left: 850px">已全部加载，共10个</span>
        </div>

        <el-table :data="data" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="name1" label="序号" ></el-table-column>
            <el-table-column prop="word" label="项目" ></el-table-column>
            <el-table-column prop="date" label="考核日期" ></el-table-column>
            <el-table-column prop="word" label="考核类型"></el-table-column>
            <el-table-column prop="number" label="分数"></el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,

                options1: [{
                    value01: '1',
                    label01: 'SD201701'
                }, {
                    value01: '2',
                    label01: 'SD201702'
                }, {
                    value01: '3',
                    label01: 'SD201703'
                }, {
                    value01: '4',
                    label01: 'SD201704'
                }, {
                    value01: '5',
                    label01: 'SD201705'
                }],
                value01: '',
                options2: [{
                    value: '选项1',
                    label: 'JavaScript'
                }, {
                    value: '选项2',
                    label: 'Java'
                }, {
                    value: '选项3',
                    label: 'Linux'
                }, {
                    value: '选项4',
                    label: 'jQuery'
                }, {
                    value: '选项5',
                    label: 'Vue'
                }],
                value: ''

            }

        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.word.indexOf(self.select_word) > -1 ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = 'ms/crmxxd/jiao';
                };
                self.$axios.get(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.data.projects;
                })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style >
    .select{
        display: flex;
        flex-direction: row;
    }
    .select2 {
        margin-left: 20px;
    }
    .search{
        margin-left: 20px;
    }
    .el-table{
        margin-top: 10px;
    }
    .txt{
        margin-top: 15px;
        font-size: 5px;
    }
    .inp{
        width: 215px;
    }
    .btn{
        margin-left: 10px;
        margin-top: 10px;
    }
    .block{
        margin-top: 10px;
    }
    .inp2{
        width: 100px;
        padding: 0px 5px;
    }
</style>
