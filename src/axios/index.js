// http request 拦截器
import axios from 'axios'
import store from '@/store'
import router from '@/router'
//import {Notification} from 'element-ui'
import $ut from '@/constants/utils'
axios.defaults.baseURL = $ut.api
//设置默认请求头
axios.defaults.headers = {
  'XRequested-With':'XMLHttpRequest',
	'Content-Type': 'application/json;charset=UTF-8',
	'Cache-control': 'no-cache, no-store'
}
axios.defaults.timeout = 600000
//request拦截器

axios.interceptors.request.use(
  config => {
    // if (!!store.state.token) {
    //   config.headers.Authorization = `token ${store.state.token}`
    // }
    if(config.url != "/login"){
      if (!!store.state.token ) {
          let token = store.state.token;
          //console.log("token request拦截器",token)
          Object.assign(config.headers, {'access-token': token});
      } else {
          console.log("request 拦截器")
          router.push("/login")
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)


// http response 拦截器
axios.interceptors.response.use(
	response => {
		//在这里你可以判断后台返回数据携带的请求码
		if (response.status === 200 || response.status === '200') {
			// if (response.data && response.data ==="") {
			// 	//清除token信息并跳转到登录页面
			// 	//$ut.logout("login")
			// } else {
			// 	return response;
			// }
      return $ut.formatData(response.data)
		} else if (response.status === 403 || response.status === '403') {
			// Notification.warning({
			// 	title: "Warning",
			// 	message:"无权限，请重新登录。"
			// });
			router.push("/login")
		} else {
			//非200请求抱错
			throw Error(response.data.msg ||"服务器异常")
		}
	},

	error => {
		if (error && error.response) {
			if (error.response.status === 403 || error.response.status === '403'){
				// Notification.warning({
				// 	title: "Warning",
				// 	message:"无权限，请重新登录。"
				// });
        router.push("/login")
			}
			switch (error.response.status) {
				case 400:
					error.message = `错误请求 ${error.response.status}`
					break;
				case 401:
					error.message = `未授权，请重新登录 ${error.response.status}`
					break;
				case 403:
					error.message = `拒绝访问 ${error.response.status}`
					break;
				case 404:
					error.message = `请求错误，未找到该资源 ${error.response.status}`
					break;
				case 405:
					error.message = `请求方法未允许 ${error.response.status}`
					break;
				case 408:
					error.message = `请求超时 ${error.response.status}`
					break;
				case 500:
					error.message = `服务器端出错 ${error.response.status}`
					break;
				case 501:
					error.message = `网络未实现 ${error.response.status}`
					break;
				case 502:
					error.message = `网络错误${error.response.status}`
					break;
				case 503:
					error.message = `服务不可用 ${error.response.status}`
					break;
				case 504:
					error.message = `网络超时 ${error.response.status}`
					break;
				case 505:
					error.message = `http 版本不支持请求 ${error.response.status}`
					break;
				default:
					error.message = `连接错误 ${error.response.status}`
			}
		} else {
			error.message = "连接到服务器失败"
		}
		return Promise.reject(error)
	}
)
export default axios
