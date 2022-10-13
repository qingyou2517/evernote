import axios from 'axios'
import baseURLConfig from './config-baseURL'

console.log(baseURLConfig.baseURL)

axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'

//baseURL将自动加在`url`前面
//url (如'/user') 是服务器资源目录
axios.defaults.baseURL=baseURLConfig.baseURL
//是否允许跨域
axios.defaults.withCredentials=true

//request参数里：type='GET' 表示如果未声明则默认type是get请求
export default function request(url,type='GET',data={}){
  return new Promise((resolve,reject)=>{
    let option={
      url,
      method:type,
      //详见官网的错误处理：validateStatus
      validateStatus(status){
        return (status>=200 && status<300) || status===400
      } //处理状态码属于 [200,300) 或 400 的情况
    }
    //从官网知道: get和post请求的option参数不一样
    //'get'：params是与请求一起发送的 URL 参数
    //'PUT','POST','DELETE和'PATCH'：data是作为请求体被发送的数据
    if(type.toLowerCase()==='get'){
      option.params=data
    }else {
      option.data=data
    }
    axios(option)
      .then(res=>{
        if(res.status===200){
          resolve(res.data)
        }else {
          console.error(res.data)
          reject(res.data)
        }})
      .catch(err=>{
        console.error({msg:'网络异常'})
        reject({msg:'网络异常'})
      })
  })
}

// request('/auth/login','POST',{username:'hunger',password:'123456'})
//   .then(data=>{
//     console.log(data)
//   })
