<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 当前功能：</el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-collapse v-model="activeNames" >
            <el-collapse-item title="个人资料" name="1">
                <div style="position: fixed;margin:25px 62%;z-index:2">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="handle-box" >
                    <el-row :gutter="20" :data="profile">
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size:x-large">姓名：{{profile.name}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size:x-large">性别：{{profile.sex}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size:x-large">籍贯：{{profile.birthPlace}}</div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size:x-large">学号：{{profile.id}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size:x-large">班级：{{profile.classesId}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size:x-large">专业：{{profile.collegeMajor}}</div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size:x-large">电话号码：{{profile.telephone}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size:x-large">出生日期：{{profile.birthday}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size:x-large">婚姻状况：{{profile.married}}</div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size: x-large">毕业学校：{{profile.school}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size: x-large">院系：{{profile.academy}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size: x-large">学历：{{profile.degree}}</div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size: x-large">毕业时间：{{profile.graduateDate}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size: x-large">学籍变更：{{profile.studentType}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple" style="font-size: x-large">学生类型：{{profile.statusChange}}</div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                            <el-col :span="5"><div class="grid-content bg-purple" style="font-size: x-large">考勤号：{{profile.code}}</div></el-col>
                    </el-row>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        components: {}, data() {
            return {
                cur_page: 1,
                activeNames: ['1'],
                multipleSelection: [],
                imageUrl: '',
                profile:{}
            }
        },

        created(){
            this.getData();
        },
        computed: {
            data(){
            },
        },
        methods: {
            getData(){
                let self = this;
                if (process.env.NODE_ENV === 'development') {
                    self.url = 'student/api/profile';
                }
                self.$axios.get(self.url).then((res) => {
                    self.profile = res.data.result;

                    //获取省和市
                    console.log(self.profile.homeAddress);
                    var hd = self.profile.homeAddress.substring(0,6);
                    self.profile.homeAddress =hd;
                    console.log(self.profile.homeAddress);

                    //把出生时间错转换成为日期
                    var birth =self.profile.birthday
                    function formatDate(birth) {
                        var now=new Date(birth);
                        var year=now.getFullYear();
                        var month=now.getMonth()+1;
                        var date=now.getDate();
                        var hour=now.getHours();
                        var minute=now.getMinutes();
                        var second=now.getSeconds();
                        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
                    }
                    self.profile.birthday = formatDate(birth);
                    console.log(self.profile.birthday);

                    //截取出生年月日
                    console.log(self.profile.birthday);
                    var dyr = self.profile.birthday.substring(0,10);
                    self.profile.birthday = dyr;
                    console.log(self.profile.birthday);

                    //把毕业时间错转换成为日期
                    var gradua =self.profile.graduateDate
                    function formatDate1(gradua) {
                        var now=new Date(gradua);
                        var year=now.getFullYear();
                        var month=now.getMonth()+1;
                        var date=now.getDate();
                        var hour=now.getHours();
                        var minute=now.getMinutes();
                        var second=now.getSeconds();
                        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
                    }
                    self.profile.graduateDate = formatDate1(gradua);
                    console.log(self.profile.graduateDate);
                    //截取年月日
                    console.log(self.profile.graduateDate);
                    var gra = self.profile.graduateDate.substring(0,10);
                    self.profile.graduateDate = gra;
                    console.log(self.profile.graduateDate);

                    //判断degree20为本科
                    console.log(self.profile.degree);
                    var deg =self.profile.degree;
                    if(deg == 20){
                        self.profile.degree = "本科";
                        console.log(self.profile.degree);
                    }
                    //判断classesId20为本科
                    console.log(self.profile.classesId);
                    var cls =self.profile.classesId;
                    if(cls == 20){
                        self.profile.classesId = "粤语一班";
                        console.log(self.profile.classesId);
                    }

                })

            },
            //上传头像照片
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    z-index:-1;
    clear: right;
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
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
