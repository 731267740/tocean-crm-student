<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 当前功能：</el-breadcrumb-item>
                <el-breadcrumb-item>综合考评分</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">可批量删除</el-button>
            <el-select v-model="select_cate" placeholder="选择班级" class="handle-select mr10">
                <el-option key="0" label="" value=""></el-option>
                <el-option key="1" label="粤语班" value="粤语班"></el-option>
                <el-option key="2" label="北京话班" value="北京话班"></el-option>
                <el-option key="3" label="上海话班" value="上海话班"></el-option>
                <el-option key="4" label="四川话班" value="四川话班"></el-option>
                <el-option key="5" label="天津话班" value="天津话班"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="基本项目资料" name="1">
                <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">                 </el-table-column>
                    <el-table-column prop="name1" label="序号">                   </el-table-column>
                    <el-table-column prop="name" label="学员">                    </el-table-column>
                    <el-table-column prop="pick" label="班级" width="95">         </el-table-column>
                    <el-table-column prop="number9" label="考勤扣分" width="95">   </el-table-column>
                    <el-table-column prop="number8" label="违纪扣分" width="95">   </el-table-column>
                    <el-table-column prop="number1" label="表扬加分" width="95">   </el-table-column>
                    <el-table-column prop="number2" label="班级考评加分">          </el-table-column>
                    <el-table-column prop="number7" label="原始分">               </el-table-column>
                    <el-table-column prop="number3" label="职业素质分">            </el-table-column>
                    <el-table-column prop="number4" label="项目分">               </el-table-column>
                    <el-table-column prop="number5" label="作业分">               </el-table-column>
                    <el-table-column prop="number5" label="技术能力分">            </el-table-column>
                    <el-table-column prop="number6" label="沟通能力分">            </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                            @current-change ="handleCurrentChange"
                            layout="prev, pager, next"
                            :total="100">
                    </el-pagination>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeNames: ['1'],
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: true
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
                        if(d.pick.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_word) > -1 ||
                            d.pick.indexOf(self.select_word) > -1)
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
                if (process.env.NODE_ENV === 'development') {
                    self.url = '/ms/crmxxd/msc';
                }

                self.$axios.get(self.url, {page: self.cur_page}).then((res) => {
                    self.tableData = res.data.dataall.projects;
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

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>
