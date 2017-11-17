<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 学生个人综合信息：</el-breadcrumb-item>
                <el-breadcrumb-item>演讲查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="基本项目资料" name="1">
                <el-table :data="data" border style="width: 100%" ref="multipleTable" >
                    <el-table-column prop="name1" label="序号">           </el-table-column>
                    <el-table-column prop="number10" label="演讲日期">    </el-table-column>
                    <el-table-column prop="number11" label="演讲内容">    </el-table-column>
                    <el-table-column prop="number12" label="项目经理">     </el-table-column>
                    <el-table-column prop="number12" label="评价">        </el-table-column>
                    <el-table-column prop="number12" label="评分">        </el-table-column>
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
                tableData: [],
                cur_page: 1,
                activeNames: ['1'],
                multipleSelection: [],
                select_cate: '',
                select_word: '',
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
