<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate">
        <svg class="icon">
          <use xlink:href="#icon-add"></use>
        </svg>
        <span class="text">新建笔记本</span>
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :key="notebook.id"
                       to="/note/1" class="notebook">
            <div>
              <svg class="icon">
                <use xlink:href="#icon-notebook"></use>
              </svg>
              <h3>{{ notebook.title }}</h3>
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">改标题</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import Auth from '../apis/auth'
import Notebooks from '../apis/notebooks'
import {friendlyDate} from '../helpers/util'

export default {
  data() {
    return {
      notebooks: [],
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  },
  methods: {
    onCreate() {
      let title = window.prompt('创建新的笔记本：')
      if (title.trim() === '') {
        alert('笔记本不能为空')
        return
      }
      Notebooks.addNotebook({title})
        .then(res => {
          console.log(res)
          res.data.friendlyCreatedAt=friendlyDate(res.data.createdAt)
          this.notebooks.unshift(res.data)
          alert(res.msg)
        })
    },
    onDelete(notebook) {
      console.log('delete')
      console.log(notebook.id)
      console.log('notebook',notebook)
      let isConfirm=window.confirm('是否确定删除')
      if(isConfirm){
        Notebooks.deleteNotebook(notebook.id)
          .then(res=>{
            console.log(res)
            this.notebooks.splice(this.notebooks.indexOf(notebook),1)
            alert(res.msg)
          })
      }
    },
    onEdit(notebook) {
      console.log('edit')
      let title = window.prompt('修改标题', notebook.title)
      Notebooks.updateNotebook(notebook.id, {title})
        .then(res => {
          console.log(res)
          alert(res.msg)
          notebook.title=title
        })
    },
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);

</style>
