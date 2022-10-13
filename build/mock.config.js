const fs = require('fs')
const path = require('path')

//本地开发、线上生产的URL
const mockBaseURL = 'https://localhost:3000'
const realBaseURL = 'https://note-server.hunger-valley.com'

//isDev：是否开发环境
//向外exports一个对象，该对象内的config是函数
exports.config = function ({isDev = true} = {isDev: true}) {
  let fileTxt = `
    module.exports={
      baseURL:"${isDev ? mockBaseURL : realBaseURL}"
    }
  `
  //把 fileTxt 写入 src/helpers/config-baseURL.js（运行时生成的文件）
  fs.writeFileSync(
    path.join(__dirname, '../src/helpers/config-baseURL.js'),
    fileTxt)
}
