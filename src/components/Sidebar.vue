<template>
  <div id="sidebar">
    <div class="icons">
      <router-link to="/note/1" title="笔记">
        <svg class="icon">
          <use xlink:href="#icon-note"></use>
        </svg>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <svg class="icon">
          <use xlink:href="#icon-notebook"></use>
        </svg>
      </router-link>
      <router-link to="/trash/2" title="回收站">
        <svg class="icon">
          <use xlink:href="#icon-trash"></use>
        </svg>
      </router-link>
    </div>
    <div class="logout" @click="onLogout">
      <svg class="icon">
        <use xlink:href="#icon-logout"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    onLogout() {
      console.log('登出')
    }
  }
}

</script>

<style scoped>
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #add8e6;
}

.icons {
  margin-top: 30px;
}

.icons a {
  padding: 6px 0;
  display: block;
}
/*点击的 router-link 背景高亮*/
.icons .router-link-active {
  background: #fff;
}

.icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-top: 2px;
}

.logout {
  position: absolute;
  bottom: 50px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.logout > .icon {
  width: 1.5em;
  height: 1.5em;
}

.iconfont {
  color: #fff;
}
</style>
