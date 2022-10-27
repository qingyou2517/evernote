<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ currentBook.title }}
        <svg class="icon">
          <use xlink:href="#icon-down"></use>
        </svg>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">{{ notebook.title }}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${currentBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
    //若从NotebookList点进笔记本
    this.getNotebooks()
      .then(() => {
        this.setCurrentBookId({ currentBookId: this.$route.query.notebookId })
        return this.getNotes({ notebookId: this.currentBook.id})
      }).then(() => {
      this.setCurrentNoteId({ currentNoteId: this.$route.query.noteId })
      this.$router.replace({
        path: '/note',
        query: {
          noteId: this.currentNote.id,
          notebookId: this.currentBook.id
        }
      }).catch(err=>{})
    })

  },
  computed:{
    ...mapGetters([
      'notebooks',
      'notes',
      'currentBook',
      'currentNote'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentBookId',
      'setCurrentNoteId'
    ]),
    ...mapActions([
      'getNotes',
      'getNotebooks',
      'addNote'
    ]),

    //若从Notes点下拉菜单进入笔记本
    handleCommand(notebookId) {
      if (notebookId == 'trash') {
        return this.$router.push({path: '/trash'})
      }
      this.$store.commit('setCurrentBookId', { currentBookId: notebookId})
      this.getNotes({ notebookId })
        .then(() => {
          //切换笔记本而没有选择笔记时，noteId、notebookId均未变，故此时不该 setCurrentNoteId
          this.setCurrentNoteId()
          this.$router.replace({
            path: '/note',
            query: {
              noteId: this.currentNote.id,
              notebookId: this.currentBook.id
            }
          }).catch(err=>{})
        })
    },
    onAddNote() {
      this.addNote({ notebookId: this.currentBook.id })
    }
  },

}

</script>


<style lang="less">
@import url('../assets/css/note-sidebar.less');
</style>


