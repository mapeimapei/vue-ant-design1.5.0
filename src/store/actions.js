//import axios from 'axios'
//import $api from "../constants/api"
//import $http from "../constants/http"
//import ut from "../constants/utils"
//import {Loading} from 'element-ui'
//import {Notification} from 'element-ui'

export default {

	// getPublicParams(context, type) {
	// 	return new Promise((resolve, reject) => {
	// 		if (!!context.state[type]) {
	// 			return resolve(context.state[type]);

	// 		} else {
	// 			axios.get(api.lookup + type).then( (res)=> {
	// 				if (!!res && Hres.data) {
	// 					if (res.data.resultCode === "200000" && res.data.result.length) {
	// 						context.commit(type,res.data.result);//更新数据
	// 						resolve(res.data.result);
	// 					} else {
	// 						reject("data error")
	// 					}
	// 				} else {
	// 					reject("api error")
	// 				}
	// 			}).catch( (err)=> {
	// 				alert(err);
	// 			});
	// 		}
	// 	})
	// }

}
