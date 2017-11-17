

<template>
    <div>
        <div class="presentFunction">学生个人综合信息：我的分组讨论</div>
        <div>
        <!--<div class="select_div">-->
            <!--班级：<el-select v-model="select_class" placeholder="粤语班" style="width:104px;margin-top: 2px">-->
            <!--<el-option key="1" label="粤语班" value="粤语班"></el-option>-->
            <!--<el-option key="2" label="北京话班" value="北京话班"></el-option>-->
            <!--<el-option key="3" label="上海话班" value="上海话班"></el-option>-->
            <!--<el-option key="3" label="天津话班" value="天津话班"></el-option>-->
            <!--<el-option key="3" label="四川话班" value="四川话班"></el-option>-->
        <!--</el-select>-->
            <!--&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp-->
        <!--分组：<el-select v-model="select_group" placeholder="第一分组" style="width:110px;margin-top:2px;" >-->
            <!--<el-option key="1" label="第一分组" value="第一分组"></el-option>-->
            <!--<el-option key="2" label="第二分组" value="第二分组"></el-option>-->
            <!--<el-option key="3" label="第三分组" value="第三分组"></el-option>-->
            <!--<el-option key="3" label="第四分组" value="第四分组"></el-option>-->
        <!--</el-select>-->
            <!--&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp-->
      <!--项目经理：<el-input class="manager" style="width:100px"></el-input>-->
        <!--</div>-->
        <!--<div class="select_div">-->
            <!--时间：<el-input class="manager" style="width:104px"></el-input>-->
            <!--&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp-->
            <!--至&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<el-input class="manager" style="width:104px;margin-top:2px;"></el-input>-->
            <!--&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp-->
            <!--<el-button @click="search" style="background:#D1E2F2">查询</el-button>-->
        <!--</div>-->
        <!--<div style="margin-top: 10px"></div>-->
        </div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="我的分组列表" class="applicationList" name="1">
                <el-table  :data="data" border style="width: 100%" ref="multipleTable">
                    <el-table-column prop="num" label="序号">              </el-table-column>
                    <el-table-column prop="spokenDay" label="演讲日期">     </el-table-column>
                    <el-table-column prop="spokenContent" label="演讲内容"> </el-table-column>
                    <el-table-column prop="workManager" label="项目经理">   </el-table-column>
                    <el-table-column prop="evaluate" label="评价">          </el-table-column>
                    <el-table-column prop="grade" label="评分">             </el-table-column>
                </el-table>
                <div class="page_div" style="text-align: center;background: #EEF7FD;">
                    <div class="pack_block" >
                        <el-pagination
                            @current-change ="handleCurrentChange"
                            layout="prev,pager,next"
                            :total="30">
                        </el-pagination>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                url: './static/vuetable.json',
                tableData: [],
                activeNames: ['1'],
                cur_page: 1,
                multipleSelection: [],
                select_class:'',
                select_group:'',
                pickerOptions1:{
                    disableDate(time){
                        return time.getTime()>Date.now();
                    }
                },
                value:'',
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(){
                    return true;
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
                    self.url = '/ms/crmxxd/xwl';
                }
                self.$axios.get(self.url, {page: self.cur_page}).then((res) => {
                    self.tableData = res.data.data.projects ;
                })
            },
            submit(){
                this.$message.success("提交成功");
            }
        }
    }
</script>

<style>
    .presentFunction{
        height: 25px;
        width: 100%;
        font-size: 14px;
        background: #EEF7FD;
        border: 1px solid gainsboro;
    }
    .select_div{
        height:41px;
        width:100%;
        background:#EEF7FD;
        border:1px solid gainsboro;
        margin-top:10px;
    }
</style>
