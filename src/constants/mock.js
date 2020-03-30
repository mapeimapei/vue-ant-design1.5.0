//mock.js文件
import ut from './utils.js';
const Mock = require('mockjs');

let data = [0,1]
let obj = {
  user:"qqw",
  id:"1222"


}


Mock.mock(ut.api+'/data', data);
Mock.mock(ut.api+'/obj','post', obj);
