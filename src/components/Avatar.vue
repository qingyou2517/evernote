<template>
  <span :title="username">{{slug}}</span>
</template>

<script>
import Auth from '../apis/auth'
import Bus from '../helpers/bus'

export default {
  data() {
    return {
      username: '未登录',
    }
  },
  created() {
    Bus.$on('userInfo',user=>{
      this.username=user.username
    })
    Auth.getInfo()
      .then(res=>{
        if(res.isLogin){
          this.username=res.data.username
        }
      })
  },
  computed:{
    slug(){
      return this.username.charAt(0)
    }
  }
}
</script>

<style scoped>

span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #05afc8;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
