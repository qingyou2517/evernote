import Notebook from '../../apis/notebooks'
import {Message} from 'element-ui'

const state = {
  notebooks: null,
  currentBookId: null
}
//获取：读
const getters = {
  notebooks: state => state.notebooks || [],

  currentBook: state => {
    if (!Array.isArray(state.notebooks)) return {}
    //比如删干净了，导致notebooks为空数组
    if (!state.currentBookId) return state.notebooks[0] || {}
    //注意currentBookId是字符串，notebook.id是数字，二者不能用全等号'==='，下面均如此
    return state.notebooks.find(notebook => notebook.id == state.currentBookId) || {}
  }
}

const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },

  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },

  updateNotebook(state, payload) {
    let notebook = state.notebooks.find(notebook => notebook.id == payload.notebookId) || {}
    notebook.title = payload.title
  },

  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId)
  },

  setCurrentBookId(state, payload) {
    state.currentBookId = payload.currentBookId
  }
}

const actions = {
  getNotebooks({commit, state}) {
    //优化：如果notebooks已被赋值过，则直接返回它给调用者，无需重复向后台访问接口来获取notebooks => 节省时间，更快加载
    if (state.notebooks !== null) return Promise.resolve()

    return Notebook.getAll()
      .then(res => {
        commit('setNotebooks', {notebooks: res.data})
      })
  },

  addNotebook({commit}, payload) {
    return Notebook.addNotebook({title: payload.title})
      .then(res => {
        commit('addNotebook', {notebook: res.data})
        Message.success(res.msg)
      })
    //commit无return，故无法调用.then()，实现后续相关功能需要放进其他接口
    //比如讨巧把 修改时间格式 放在上面的 Notebook.addNotebook()里
  },

  updateNotebook({commit}, payload) {
    return Notebook.updateNotebook(payload.notebookId, {title: payload.title})
      .then(res => {
        commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
        Message.success(res.msg)
      })
  },

  deleteNotebook({commit}, payload) {
    return Notebook.deleteNotebook(payload.notebookId)
      .then(res => {
        commit('deleteNotebook', {notebookId: payload.notebookId})
        Message.success(res.msg)
      })
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
