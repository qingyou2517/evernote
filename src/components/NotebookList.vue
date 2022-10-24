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
                       :to="`/note?notebookId=${notebook.id}`" class="notebook">
            <div>
              <svg class="icon">
                <use xlink:href="#icon-notebook"></use>
              </svg>
              <h3>{{ notebook.title }}</h3>
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">改标题</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.createdAtFriendly }}</span>
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
import {mapState,mapActions,mapGetters} from 'vuex'

export default {
  data() {
    return {
      // notebooks: [],
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })

    this.$store.dispatch('getNotebooks')
  },
  //想在组件中get store 中的state,需要在计算属性中访问
  computed:{
    ...mapGetters(['notebooks'])
  },

  methods: {
    //组件中分发action
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook'
    ]),
    onCreate() {
      this.$prompt('请输入笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        this.addNotebook({title:value})
      })
    },
    onDelete(notebook) {
      this.$confirm('确认删除笔记本吗?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotebook({notebookId :notebook.id})
      })
    },
    onEdit(notebook) {
      this.$prompt('请修改笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符',
        inputValue: notebook.title,
      }).then(({value}) => {
        this.updateNotebook({notebookId:notebook.id, title: value})
      })
    },

  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);

</style>
