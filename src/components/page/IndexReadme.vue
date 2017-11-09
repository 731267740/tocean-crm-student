<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <article>
                <h1>最新动态</h1>
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="双十一即将到来，请学生注意..." name="1">
                        <div class="ms-text">双十一即将到来，敬请学生们注意防范骗子，不要轻信任何没有根据的信息和不明快递的接收。</div>
                        <div class="ms-text">我们将会加强对学生宿舍的检查，严查违规电器的使用，宿舍不文明现象，请各位做好准备。</div>
                        <div class="replyTime">2017年11月5日09:49:13</div>
                    </el-collapse-item>
                    <el-collapse-item title="中文系粤语班通知" name="2">
                        <div class="ms-text">近日发现，同学们迟到的现象有点严重，我阮领导下令要严查迟到现象，请同学们早点出门，注意路上安全，不要迟到。</div>
                        <div class="ms-text">粤语一班的迟到的同学，超过五次我们将会在学校的公告予以公布，敬请注意。</div>
                        <div class="replyTime">2017年11月1日08:00:01</div>
                    </el-collapse-item>
                    <el-collapse-item title="中文系上海话班获奖" name="3">
                        <div class="ms-text">近日举行的系班级篮球赛中，恭喜中文系上海话班获得第一名。</div>
                        <div class="ms-text">中文系北京话班获得第二名，中文系四川话班和中文系天津话班并列第三名</div>
                        <div class="replyTime">2017年10月16日20:22:46</div>
                    </el-collapse-item>
                    <el-collapse-item title="国庆中秋放假通知.." name="4">
                        <div class="ms-text">根据国家法律规定国庆中秋假期如下</div>
                        <div class="ms-text">10月1日到10月8日为国庆中秋假期，我们学校将会在下个星期六和星期天进行补课，请各班班长相互告之。</div>
                        <div class="replyTime">2017年09月28日08:30:23</div>
                    </el-collapse-item>
                </el-collapse>
            </article>
        </div>

    </div>
</template>
<script>
    import ElCard from "../../../node_modules/element-ui/packages/card/src/main";
    export default {
        components: {ElCard}, data: function(){
            return {}
        },
        data() {
            return {
                activeNames: ['1','2','3','4']
            };
        },
//        filters: {
//            fmtTime: function (data) {
//                //将字符串转换成时间格式
//                var timePublish = new Date(data);
//                var timeNow = new Date();
//                var minute = 1000 * 60;
//                var hour = minute * 60;
//                var day = hour * 24;
//                var month = day * 30;
//                var diffValue = timeNow - timePublish;
//                var diffMonth = diffValue / month;
//                var diffWeek = diffValue / (7 * day);
//                var diffDay = diffValue / day;
//                var diffHour = diffValue / hour;
//                var diffMinute = diffValue / minute;
//
//                if (diffValue < 0) {
//                    alert("错误时间");
//                } else if (diffMonth > 3) {
//                    result = timePublish.getFullYear() + "-";
//                    result += timePublish.getMonth() + "-";
//                    result += timePublish.getDate();
//                    alert(result);
//                } else if (diffMonth > 1) {
//                    result = parseInt(diffMonth) + "月前";
//                } else if (diffWeek > 1) {
//                    result = parseInt(diffWeek) + "周前";
//                } else if (diffDay > 1) {
//                    result = parseInt(diffDay) + "天前";
//                } else if (diffHour > 1) {
//                    result = parseInt(diffHour) + "小时前";
//                } else if (diffMinute > 1) {
//                    result = parseInt(diffMinute) + "分钟前";
//                } else {
//                    result = "刚刚发表";
//                }
//                return result;
//            }
//        }
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
    .ms-doc article{
        margin-bottom: 5px;
    }
    .ms-text {
        font-size: 15px;
    }
    .replyTime{
        float:left;
        color:#8b8585;
        line-height:30px;
        font-size:11px
    }
</style>
