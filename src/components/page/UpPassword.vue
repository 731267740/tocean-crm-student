<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 当前功能：</el-breadcrumb-item>
                <el-breadcrumb-item>密码修改</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-steps :active="active" finish-status="success" >
            <el-step title="修改密码"></el-step>
            <el-step title="确认密码"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <div v-show="isPWD" style="margin: 5% 15%">
            输入当前密码：
            <el-input v-model="password" placeholder="当前密码" class="handle-input mr10"></el-input>
        </div>
        <div v-show="isSure" style="margin: 5% 15%">
            输入新的密码：
            <el-input v-model="newpassword" placeholder="输入新的密码" class="handle-input mr10"></el-input>
            <br/>
            确认新的密码：
            <el-input v-model="surepassword" placeholder="确认新的密码" class="handle-input mr10"></el-input>
        </div>
        <div v-show="isIndex" style="margin: 5% 25%">
            修改成功，3秒后回到首页。
        </div>
        <div style="margin: 0 30%">
            <el-button id="btn" style="margin-top: 12px;" @click="next" value="下一步" >{{this.value}}</el-button>
        </div>
    </div>
</template>

<script>
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
    export default {
        components: {ElInput},
        data() {
            return {
                active:1,
                password:'',
                newpassword:'',
                surepassword:'',
                isPWD:true,
                isSure:false,
                isIndex:false,
                value:'下一步'
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                return true;
            }
        },
        methods: {
            getData(){
                let self = this;
                if (process.env.NODE_ENV === 'development') {
                    self.url = 'student/api/profile';
                }
                self.$axios.get(self.url).then((res) => {
                    self.tableData = res.data.result.result;
                })
            },
            next() {
                if (this.active == 1) {
                    this.isPWD = !this.isPWD;
                    this.isSure = !this.isSure;
                    this.active++;
                    console.log(this.active +"输入密码框mmmmm");
                    return this.active;
                }
                if (this.active == 2) {
                    this.isPWD  = false;
                    this.isSure = false;
                    this.isIndex= true;
                    this.active++;
                    console.log(this.active + "确认框sssssss");
                    this.value = '完成';
                    return this.active;
                }
                if (this.active == 3) {
                    this.active =1;
                    console.log(this.active + "提示返回ccccccc");
                    this.$router.push('/personalinformation');
                    return this.active;
                }
            }
        }
    }
</script>

<style scoped>
.handle-input{
    width: 300px;
    display: inline-block;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.divhide{
    display: none;
}
.divshow{
    display:inline;
}

</style>
