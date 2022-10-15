<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn">
        <svg class="icon">
          <use xlink:href="#icon-add"></use>
        </svg>
        <span class="text">新建笔记本</span>
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(10)</h3>
        <div class="book-list">
          <a href="#" class="notebook">
            <div>
              <svg class="icon">
                <use xlink:href="#icon-notebook"></use>
              </svg>
              <h3>笔记本标题1</h3>
              <span>3</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">3天前</span>
            </div>
          </a>
          <a href="#" class="notebook">
            <div>
              <svg class="icon">
                <use xlink:href="#icon-notebook"></use>
              </svg>
              <h3>笔记本标题2</h3>
              <span>1</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">5天前</span>
            </div>
          </a>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import Auth from '../apis/auth'

export default {
  data() {
    return {
      msg:'笔记本列表'
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
  },
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);

</style>
