<template>
    <div class="header">
        <div class="logo">学生端</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span v-if="!!username" class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <span v-else-if="!username" class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                    <el-button type="primary" @click="handleCommand('login')" command="login">请登录</el-button>
                </span>
                <el-dropdown-menu v-if="!!username" slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
    export default {
        components: {ElButton}, data() {
            return {
                name: ''
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('USERNAME');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('USERNAME');
                    localStorage.removeItem('JWT_TOKEN');
                    this.$router.go(0);
                }else if(command == 'login'){
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
