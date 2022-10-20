<template>
  <div id="note" class="detail">
    <NoteSidebar></NoteSidebar>
    <div class="note-detail">
      <div class="note-bar">
        <span> 创建日期: {{ currentNote.createdAtFriendly }}</span>
        <span> 更新日期: {{ currentNote.updatedAtFriendly }}</span>
        <span> {{ currentNote.statusText }}</span>
        <svg class="icon">
          <use xlink:href="#icon-fullscreen"></use>
        </svg>
        <svg class="icon">
          <use xlink:href="#icon-trash"></use>
        </svg>
      </div>
      <div class="note-title">
        <input type="text" placeholder="输入标题"
        :value="currentNote.title">
      </div>
      <div class="editor">
        <textarea v-show="true" placeholder="输入内容, 支持markdown 语法"
        :value="currentNote.content"></textarea>
        <div class="preview markdown-body"  v-html="" v-show="false">
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Auth from '../apis/auth'
import NoteSidebar from './NoteSidebar'

export default {
  components: {
    NoteSidebar
  },
  data() {
    return {
      currentNote:{
        title:'我的笔记',
        content:'我的笔记内容',
        createdAtFriendly:'1天前',
        updatedAtFriendly:'刚刚',
        statusText:'未更新'
      }
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
  }
}
</script>

<style lang="less">
@import url('../assets/css/note-detail.less');

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
