<template>
    <div class="login-wrap">
        <div class="ms-title">学生端</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">{{errorMsg}}</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    name:'',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                errorMsg:'',  //登录失败显示的信息
                url:'/student/login'
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                //使用模拟数据进行登录
/*
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('USERNAME',self.ruleForm.username);
                        self.$router.push('/indexreadme');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
*/

                //调用后端接口进行登录

                self.$refs[formName].validate((valid) => {
                if (valid) {
                    var param = { //传给后端的数据
                        username: self.ruleForm.username,
                        name: self.ruleForm.name,
                        password: self.ruleForm.password
                    };
                    self.$axios.post(self.url, param).then((res) => {//调用后端接口进行登录
                        console.log(res.data.success);
                        if (res.data.success) { //登录成功
                            localStorage.setItem('USERNAME', self.ruleForm.username);
                            localStorage.setItem('JWT_TOKEN', res.data.result);
                            self.$router.push('/indexreadme')
                        } else {
                            self.errorMsg = res.data.error;
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


        }
    }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
