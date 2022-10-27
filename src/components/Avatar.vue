<template>
  <span :title="username">{{slug}}</span>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
    this.setUser()
  },
  methods:{
    ...mapActions({
      setUser:'checkLogin'
    })
  },
  computed:{
    ...mapGetters([
      'username',
      'slug'
    ]),
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
