<template>
  <div id="note" class="detail">
    <NoteSidebar :currentNote="currentNote" @update:notes="val=>notes=val"></NoteSidebar>
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
               v-model:value="currentNote.title">
      </div>
      <div class="editor">
        <textarea v-show="true" placeholder="输入内容, 支持markdown 语法"
                  v-model:value="currentNote.content"></textarea>
        <div class="preview markdown-body" v-html="" v-show="false">
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
      currentNote: {},
      notes:[],
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
  //路由守卫
  beforeRouteUpdate(to, from, next) {
    this.currentNote = this.notes.find(note => note.id == to.query.noteId) || {}
    next()
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
