<template>
  <div class="comment-info" >
    <div class="comment-top">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="comment-content">
      <div class="comment-user-info" v-if="commentInfo.user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="comment-content-detail-top">
        <span>{{commentInfo.content}}</span>
      </div>
      <div class="comment-content-detail-center">
        <span>{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="comment-content-detail-bottom" v-if="commentInfo.images">
        <img :src="item" alt="" v-for="item in commentInfo.images ">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "@/common/utils";
export default {
  name: "DetailCommentInfo",
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  //利用过滤器来设置时间
  filters:{
    showDate(value){
      let date = new Date(value*1000)
      return formatDate(date,'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.comment-top {
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 15px 15px;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}
.comment-user-info{
  display: flex;
  margin-top: 20px;
}
.comment-user-info img{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-left: 5px;
}
.comment-user-info span {
  margin-left:  18px;
  margin-top: 15px;
}
.comment-content-detail-top {
  margin: 15px 5px 10px 5px;
}
.comment-content-detail-center {
  color: gray;
  font-size: 14px;
  margin-bottom: 10px;

}
.comment-content-detail-center span{
  margin-left: 10px;
}
.comment-content-detail-bottom img {
  height: 100px;
  width: 100px;
  margin-left: 10px;
}
</style>
