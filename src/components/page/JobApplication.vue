<template>
    <div>
        <div class="nowFunction">当前功能：就业申请</div>
        <!--<div class="textarea">-->
            <!--<div class="wrote">你已经填写了就业申请信息!</div>-->
        <!--</div>-->

        <div class="blank" style="height: 10px;width: 100%"></div>

            <el-collapse v-model="activeNames">
                <el-collapse-item title="我的申请信息" class="applicationList" name="1    ">
                    <el-table :data="data" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="name" label="姓名" ></el-table-column>
                        <el-table-column prop="pick" label="班级" ></el-table-column>
                        <el-table-column prop="jobDirecion" label="期待就业方向">
                            <template slot-scope="scope">
                                <el-select v-model="select_direction" placeholder="Android" class="handle-select mr10">
                                    <el-option key="1" label="Android" value="Android"></el-option>
                                    <el-option key="2" label="Java" value="Java"></el-option>
                                    <el-option key="3" label="运维" value="运维"></el-option>
                                    <el-option key="4" label="前端" value="前端"></el-option>
                                    <el-option key="5" label="php" value="php"></el-option>
                                    <el-option key="6" label="python" value="python"></el-option>
                                    <el-option key="7" label="c++" value="c++"></el-option>
                                    <el-option key="8" label="c#" value="c#"></el-option>
                                    <el-option key="9" label="测试方向" value="测试方向"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>

                        <el-table-column prop="jobPlace" label="期待就业地点" >
                            <template slot-scope="scope">
                                <el-select v-model="select_place" placeholder="广州" class="handle-select mr10">
                                    <el-option key="1" label="广州" value="广州"></el-option>
                                    <el-option key="2" label="深圳" value="深圳"></el-option>
                                    <el-option key="3" label="上海" value="上海"></el-option>
                                    <el-option key="4" label="北京" value="北京"></el-option>
                                    <el-option key="5" label="珠海" value="珠海"></el-option>
                                    <el-option key="6" label="佛山" value="佛山"></el-option>
                                    <el-option key="7" label="东莞" value="东莞"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>

                        <el-table-column prop="recommendTime" label="期待推荐时间">
                            <template slot-scope="scope">
                                <el-input class="time"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column prop="needRecommend" label="是否需要拓胜推荐" >
                            <template slot-scope="scope">
                                <el-select v-model="select_recommend" placeholder="是" class="handle-select mr10">
                                    <el-option key="1" label="是" value="是"></el-option>
                                    <el-option key="2" label="否" value="否"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page_div" style="height: 36px;width: 100%;background: #EEF7FD;">
                        <div class="pack_block" style="text-align: center">
                            <el-pagination
                                @current-change ="handleCurrentChange"
                                layout="prev,pager,next"
                                :total="50">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="sumbit_div" style="margin: 0 auto;text-align: center;width: 100%;height: 34px;border:1px solid gainsboro; margin-top: 10px;background: #EEF7FD">
                        <el-button @click="submit" style="height:28px;margin-top: 3px;font-size:10px;background:#D1E2F2" >确认提交</el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
    </div>
</template>
<script>
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
    export default{
        components: {ElButton, ElInput}, data(){
            return{
                url: './static/vuetable.json',
                tableData: [],
                activeNames: ['1'],
                cur_page: 1,
                multipleSelection: [],
                select_direction: '',
                select_place:'',
                select_time:'',
                select_recommend:'',
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
    .nowFunction{
        height: 25px;
        width: 100%;
        font-size: 14px;
        background: #EEF7FD;
        border: 1px solid gainsboro;
    }
    .textarea{
        height: 28px;
        width: 100%;
        border: 1px solid gainsboro;
        margin-top: 10px;
    }
    .wrote{
        height: 20px;
        width: 165px;
        font-size: 13px;
        background: yellow;
        margin-bottom: 10px;
    }
</style>


