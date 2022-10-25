<template>
  <div id="note" class="detail">
    <NoteSidebar @update:notes="val=>notes=val"></NoteSidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ currentNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ currentNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <svg class="icon" @click="isShowPreview=!isShowPreview">
            <use xlink:href="#icon-fullscreen"></use>
          </svg>
          <svg class="icon" @click="onDeleteNote">
            <use xlink:href="#icon-trash"></use>
          </svg>
        </div>
        <div class="note-title">
          <input type="text" placeholder="输入标题"
                 v-model:value="currentNote.title"
                 @input="onUpdateNote" @keydown="statusText='编辑中...'">
        </div>
        <div class="editor">
        <textarea v-show="!isShowPreview" placeholder="输入内容, 支持markdown 语法"
                  v-model:value="currentNote.content"
                  @input="onUpdateNote" @keydown="statusText='编辑中...'"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import NoteSidebar from './NoteSidebar'
import Bus from '../helpers/bus'
import _ from 'lodash'
import Notes from '../apis/notes'
import MarkdownIt from 'markdown-it'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

let md = new MarkdownIt()

export default {
  components: {
    NoteSidebar
  },
  data() {
    return {
      statusText: '笔记未改动',
      isShowPreview: false,
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
  computed: {
    ...mapGetters([
      'notes',
      'currentNote'
    ]),

    previewContent() {
      return md.render(this.currentNote.content || '')
    },
  },
  methods: {
    ...mapMutations([
      'setCurrentNoteId'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote'
    ]),

    //引入节流：自动保存笔记时，不必每输一个字符都向服务器发请求
    //只有停止输入，才会发请求
    onUpdateNote: _.debounce(function () {
      this.updateNote({noteId: this.currentNote.id, title: this.currentNote.title, content: this.currentNote.content})
        .then(data => {
          this.statusText = '已保存'
        }).catch(data => {
        this.statusText = '保存出错'
      })
    }, 300),

    onDeleteNote() {
      this.deleteNote({noteId: this.currentNote.id})
        .then(data => {
          this.$router.replace({path: '/note'})
        })
    }
  },
  //路由守卫
  beforeRouteUpdate(to, from, next) {
    this.setCurrentNoteId({currentNoteId: to.query.noteId})
    // this.currentNote = this.notes.find(note => note.id == to.query.noteId) || {}
    next()
  },
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
