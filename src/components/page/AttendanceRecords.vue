<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 学生个人综合信息：</el-breadcrumb-item>
                <el-breadcrumb-item>我的考勤信息</el-breadcrumb-item>
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
                状态：
                <el-select size="small" v-model="staus" placeholder="" class="handle-select mr10">
                <el-option key="0" label="" value=""></el-option>
                <el-option key="1" label="正常" value="正常"></el-option>
                <el-option key="2" label="请假" value="请假"></el-option>
                <el-option key="3" label="迟到" value="迟到"></el-option>
                <el-option key="4" label="早退" value="早退"></el-option>
                <el-option key="5" label="旷课" value="旷课"></el-option>
            </el-select>
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
                &nbsp;&nbsp;&nbsp;
                &nbsp;<el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
        </div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="学员考勤信息列表" name="1">
                <el-table :data="tabel" border style="width: 100%" ref="multipleTable">
                    <el-table-column prop="id" label="序号" >{{tabel.id}}</el-table-column>
                    <el-table-column prop="startDate" label="日期">{{tabel.startDate}}</el-table-column>
                    <el-table-column prop="startDate" label="开始时间"></el-table-column>
                    <el-table-column prop="endDate" label="结束时间">{{tabel.endDate}}</el-table-column>
                    <el-table-column prop="status" label="状态">{{tabel.status}}</el-table-column>
                </el-table>
                <div>
                    <div class="block">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[1, 2, 3, 4,5]"
                            :page-size="1"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="5">
                        </el-pagination>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    birthday:'2017-11-16 09:53:51',
                }],
                cur_page: 1,
                activeNames: ['1'],
                multipleSelection: [],
                week:'',
                staus:'',
                value4: '',
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
                tabel:[]
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
            getData(){
                let self = this;
                if (process.env.NODE_ENV === 'development') {
                    self.url = 'student/api/attendanceInfo';
                }
                self.$axios.get(self.url).then((res) => {
                    self.tabel = res.data.result;

                    //把开始时间错转换成为日期
                    var star =self.tabel[0].startDate;
                    function formatDate(star) {
                        var now=new Date(star);
                        var year=now.getFullYear();
                        var month=now.getMonth()+1;
                        var date=now.getDate();
                        var hour=now.getHours();
                        var minute=now.getMinutes();
                        var second=now.getSeconds();
                        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
                    }
                    self.tabel[0].startDate = formatDate(star);
                    console.log(self.tabel[0].startDate);
                    //截取年月日
                    console.log(self.tabel[0].startDate);
                    var start = self.tabel[0].startDate.substring(0,9);
                    self.tabel[0].startDate = start;
                    console.log(self.tabel[0].startDate);
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
