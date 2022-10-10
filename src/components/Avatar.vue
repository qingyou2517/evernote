<template>
  <span :title="user.username">{{slug}}</span>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: 'hunger'
      },
      slug: 'H',
    }
  },
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
