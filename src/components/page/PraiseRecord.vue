<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 当前功能：</el-breadcrumb-item>
                <el-breadcrumb-item>学员表扬信息查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div>
                班级：
            <el-select size="small" v-model="select_cate" placeholder="选择班级" class="handle-select mr10">
                <el-option key="0" label="" value=""></el-option>
                <el-option key="1" label="粤语班" value="粤语班"></el-option>
                <el-option key="2" label="北京话班" value="北京话班"></el-option>
                <el-option key="3" label="上海话班" value="上海话班"></el-option>
                <el-option key="4" label="四川话班" value="四川话班"></el-option>
                <el-option key="5" label="天津话班" value="天津话班"></el-option>
            </el-select>
                &nbsp;&nbsp;&nbsp;
                学员：<el-input size="small" v-model="select_word" class="handle-input mr10" style="width: 100px"></el-input>
                &nbsp;&nbsp; 时间：
                <el-date-picker
                v-model="value4"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>
                &nbsp;<el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
        </div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="学员表扬信息列表" name="1">
                <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column prop="name1" label="序号">         </el-table-column>
                    <el-table-column prop="name" label="学员">          </el-table-column>
                    <el-table-column prop="pick" label="班级">          </el-table-column>
                    <el-table-column prop="" label="表扬时间">           </el-table-column>
                    <el-table-column prop="" label="表扬原因">           </el-table-column>
                    <el-table-column prop="" label="表扬加分">           </el-table-column>
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
                del_list: [],
                is_search: false,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
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
