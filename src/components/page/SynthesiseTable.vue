<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 当前功能：</el-breadcrumb-item>
                <el-breadcrumb-item>综合考评分</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            选择单项:
            <el-select v-model="sall" placeholder="" class="handle-select mr10">
                <el-option key="0" label="" value=""></el-option>
                <el-option key="1" label="考勤" value="考勤"></el-option>
                <el-option key="2" label="违纪" value="违纪"></el-option>
                <el-option key="3" label="表扬" value="表扬"></el-option>
                <el-option key="4" label="班级考评" value="班级考评"></el-option>
                <el-option key="5" label="原始分" value="原始分"></el-option>
                <el-option key="5" label="职业素质" value="职业素质"></el-option>
                <el-option key="5" label="项目分" value="项目分"></el-option>
                <el-option key="5" label="作业分" value="作业分"></el-option>
                <el-option key="5" label="技术分" value="技术分"></el-option>
                <el-option key="5" label="沟通能力分" value="沟通能力分"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="基本项目资料" name="1">
                <el-table :data="data" border style="width: 100%" ref="multipleTable">
                    <el-table-column prop="name1" label="序号">                   </el-table-column>
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
                multipleSelection: [],
                sall:'',
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
                   return true;
                })
            }
        },
        methods: {
            handleCurrentChange(val){
                this.getData();
            },
            getData(){
                let self = this;
                if (process.env.NODE_ENV === 'development') {
                    self.url = '/ms/crmxxd/msc';
                }
                self.$axios.get(self.url).then((res) => {
                    self.tableData = res.data.dataall.projects;
                })

            },
            search(){
                this.is_search = true;
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
