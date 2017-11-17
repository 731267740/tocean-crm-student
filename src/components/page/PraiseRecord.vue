<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 学生个人综合信息：</el-breadcrumb-item>
                <el-breadcrumb-item>我的表扬信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div>
                星期：
            <el-select size="small" v-model="week" placeholder="" class="handle-select mr10">
                <el-option key="0" label="" value=""></el-option>
                <el-option key="1" label="星期一" value="星期一"></el-option>
                <el-option key="2" label="星期二" value="星期二"></el-option>
                <el-option key="3" label="星期三" value="星期三"></el-option>
                <el-option key="4" label="星期四" value="星期四"></el-option>
                <el-option key="5" label="星期五" value="星期五"></el-option>
            </el-select>
                时间：
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
                <el-table :data="data" border style="width: 100%" ref="multipleTable">
                    <el-table-column prop="name1" label="序号">                  </el-table-column>
                    <el-table-column prop="datetime" label="表扬时间" :formatter="dateFormat">             </el-table-column>
                    <el-table-column prop="array" label="表扬原因">               </el-table-column>
                    <el-table-column prop="number12" label="表扬加分">            </el-table-column>
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
                week:'',
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
            dateFormat(row,rel){
                return row.datetime.substring(0,11);
            },
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
