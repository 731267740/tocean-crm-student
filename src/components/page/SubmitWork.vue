<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 当前功能：提交作业</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div >
            <article>
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="基本作业资料" name="1" value="true">
                            <h6 class="ms-replyTime" >注意：如果你不是学员不能提交作业</h6>
                            标题：
                            <el-input class="ms-input" placeholder="请输入标题" v-model="inputtitle"></el-input>
                            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                            学员：
                           <el-input class="ms-input" placeholder="请输入学号" v-model="inputid"></el-input>
                           <div class="ms-demo" >
                             <span>源代码和文档:</span>
                             <el-upload class="ms-upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                              :on-change="handleChange" :file-list="fileList2" >
                               <el-button class="ms-demo-button" size="small" type="primary" @click="open">点击上传</el-button>
                               <div slot="tip" class="el-upload__tip">只能上传txt/word/ppt文件，且大小不能超过10Mb</div>
                           </el-upload>
                           </div>
                            <div class="ms-submit-sure-cancel">
                                <el-button>确认提交</el-button>
                                <el-button>重新输入</el-button>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
            </article>
        </div>
    </div>
</template>
<script>
    import ElCard from "../../../node_modules/element-ui/packages/card/src/main";
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
    export default {
        components: {ElInput, ElCard}, data: function(){
            return {}
        },
        data() {
            return {
                activeNames: ['1'],
                inputtitle: '',
                inputid:"",

                fileList2: [{
                    key:1,
                    name: '31号-筱筱的作业.txt',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    status: 'finished'
                }, {
                    key:2,
                    name: '没有人的作业.word',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    status: 'finished'
                }]
                }
            },
        methods: {
            handleChange(file, fileList){
                    this.fileList2 = fileList.slice(-5);
            },
            open() {
                const h = this.$createElement;

                this.$notify({
                    title: '注意',
                    message: h('i', { style: 'color: teal'}, '最多只能上传五个文件，超过五个文件，会覆盖最先上传的文件。')
                });
            }
        }
    }


</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article {
        margin-bottom: 5px;
    }
    .ms-input {
        width: 200px;
    }
    .ms-replyTime{
        color:#8b8585;
        font-size:11px;
        margin-bottom:5px
    }
    .ms-demo{
        margin: 15px;
    }
    .ms-demo-button{
        float: right;
    }
    .ms-submit-sure-cancel{
        text-align:center;
        margin: 0 auto;
    }
</style>
