<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i>提交报告</el-breadcrumb-item>
                <el-breadcrumb-item>提交日报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-button type="primary" icon="">新建日报</el-button>
            <el-button type="primary" icon="delete" @click="delAll">删除</el-button>
            <el-button type="primary" icon="edit">修改</el-button>
            <el-input  placeholder="输入标题搜索您的文件" icon="search" v-model="select_word"  class="sp"></el-input>

        </div>
        <div class="txt" >
            <span>全部文件</span>
            <span style="margin-left: 850px">已全部加载，共10个</span>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name1" label="序号" ></el-table-column>
            <el-table-column prop="word" label="提交标题" ></el-table-column>
            <el-table-column prop="sentence" label="提交内容"></el-table-column>
            <el-table-column prop="date" label="提交时间"></el-table-column>
        </el-table>

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
                is_search: false
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
                        if(
                            d.word.indexOf(self.select_word) > -1
                        ){
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
    .sp{
        width: 300px;
    }
    .el-table{
        margin-top: 10px;
    }
    .txt{
        margin-top: 15px;
        font-size: 5px;
    }
</style>
