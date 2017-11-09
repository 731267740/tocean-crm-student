<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 当前功能：</el-breadcrumb-item>
                <el-breadcrumb-item>学员档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div>
                班级：
            <el-select v-model="select_cate" placeholder="选择班级" class="handle-select mr10" style="width: 188px">
                <el-option key="0" label="" value=""></el-option>
                <el-option key="1" label="粤语班" value="粤语班"></el-option>
                <el-option key="2" label="北京话班" value="北京话班"></el-option>
                <el-option key="3" label="上海话班" value="上海话班"></el-option>
                <el-option key="4" label="四川话班" value="四川话班"></el-option>
                <el-option key="5" label="天津话班" value="天津话班"></el-option>
            </el-select>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                学员：<el-input v-model="select_name" class="handle-input mr10" style="width: 188px"></el-input>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                性别：
                <el-select v-model="select_sex" placeholder="" class="handle-select mr10" style="width: 100px">
                    <el-option key="0" label="" value=""></el-option>
                    <el-option key="1" label="男" value="男"></el-option>
                    <el-option key="2" label="女" value="女"></el-option>
                </el-select>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                毕业院校：<el-input class="handle-input mr10" style="width: 188px"></el-input>
            </div>
            <div style="margin-top: 15px">
                院系：<el-input v-model="select_yx" size="medium" class="handle-input mr10" style="width: 193px"></el-input>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                专业：<el-input class="handle-input mr10" style="width: 188px"></el-input>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                学历：<el-input v-model="select_xl" size="medium"  class="handle-input mr10" style="width: 105px"></el-input>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                联系电话：<el-input class="handle-input mr10" style="width: 188px"></el-input>
            </div>
            <div style="margin-top: 15px">
                就业薪资：<el-input size="medium"class="handle-input mr10" style="width: 75px"></el-input>
                &nbsp至：<el-input class="handle-input mr10" style="width: 75px"></el-input>
                &nbsp&nbsp&nbsp就业公司：<el-input size="medium" class="handle-input mr10" style="width: 188px"></el-input>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp就业职位：<el-input class="handle-input mr10" style="width: 188px"></el-input>
            </div>
            <div style="text-align:right;margin: 15px auto;">
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" @click="">导出Excel</el-button>
            </div>
        </div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="基本项目资料" name="1">
                <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column prop="name1" label="序号">                </el-table-column>
                    <el-table-column prop="name" label="学员名称">            </el-table-column>
                    <el-table-column prop="studentid" label="学号">            </el-table-column>
                    <el-table-column prop="pick" label="班级">    </el-table-column>
                    <el-table-column prop="sex" label="性别">    </el-table-column>
                    <el-table-column prop="array" label="学历">     </el-table-column>
                    <el-table-column prop="number12" label="入学时联系电话">        </el-table-column>
                    <el-table-column prop="number12" label="毕业时联系电话">        </el-table-column>
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
                select_name: '',
                select_yx: '',
                select_xl: '',
                select_sex: '',
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
                        if(d.pick.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_name) > -1) &&
                            d.sex.indexOf(self.select_sex) > -1 &&
                            d.pick.indexOf(self.select_word) > -1 &&
                            d.name.indexOf(self.select_yx) > -1   &&
                            d.array.indexOf(self.select_xl) > -1
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
