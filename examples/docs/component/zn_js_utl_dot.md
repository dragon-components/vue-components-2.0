# 数据埋点 #

## 安装

```
npm i @mobile-component/zn_js_utl_dot@latest --save
```

## 导入工程

```js
//main.js入口文件
import ZNDOT from '@mobile-component/zn_js_utl_dot';

let znDot = new ZNDOT(localStorage.getItem('token'), {
  appId: 'zms',
  version: '1.0.1',
  SPA: {
    is: true,
    mode: router.mode,
    route: router,
  },
  sended: (params, clear) => {
    axios({
      method: 'post',
      baseURL: '/zms',
      url: '/api-msc/api/v1/pipeline/passFlag/collectLog',
      data: params, //qs.stringify(data),
      timeout: 10000,
      headers: {
        'REQUEST-SOURCE': '3',
        'X-Auth-Token': localStorage.getItem('token'),
      },
    })
      .then(res => {
        if (res.status === 200 && res.data && res.data.errCode === 0) {
          clear();
        }
      })
      .catch(err => {
        console.error(err);
      });
  },
});

// 网络请求埋点
axios.interceptors.request.use(
  config => {
    if (config.url !== '/zms/api-msc/api/v1/pipeline/passFlag/collectLog') {
      znDot.event._net_req({
        url: config.url,
        method: config.method,
        param: config.params,
      });
    }
    return config;
  },
  error => {
    znDot.event._errors({
      error_desc: error,
    });
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    if (
      response.config.url !==
        '/zms/api-msc/api/v1/pipeline/passFlag/collectLog' &&
      response.status === 200
    ) {
      if (response.data && response.data.errCode !== 0) {
        znDot.event._net_bus_err({
          url: response.config.url,
          method: response.config.method,
          param: response.config.params,
        });
      } else {
        znDot.event._net_req({
          url: response.config.url,
          method: response.config.method,
          param: response.config.params,
        });
      }
    }

    if (response.status !== 200) {
      znDot.event._net_http_err({
        url: response.config.url,
        method: response.config.method,
        param: response.config.params,
      });
    }

    return response;
  },
  error => {
    znDot.event._errors({
      error_desc: error,
    });
    return Promise.resolve(error.response);
  },
);

Vue.prototype.$dot = znDot;
```

## 参数配置

### config

| 属性    | 说明                                                                                         | 类型     | 可选值 | 默认值 | 是否必填 |
| ------- | -------------------------------------------------------------------------------------------- | -------- | ------ | ------ | -------- |
| appId   | 项目名称                                                                                     | String   | -      | zms    | 是       |
| version | 项目版本                                                                                     | String   | -      | 0.0.1  | 是       |
| SPA     | 单页面应用配置                                                                               | Object   | -      | -      | 否       |
| loaded  | 初始化 sdk 时触发的方法                                                                      | Function | -      | -      | 否       |
| sended  | 触发上传机制回调函数,设置上传请求,回调参数(data:缓存的数据,clear:在上传成功后清楚缓存的方法) | Function | -      | -      | 是       |

### SPA

| 属性  | 说明          | 类型   | 可选值          | 默认值 | 是否必填 |
| ----- | ------------- | ------ | --------------- | ------ | -------- |
| is    | 开启 SPA 配置 | Boolen | -               | true   | 是       |
| mode  | SPA 实现类型  | String | hash 或 history | hash   | 是       |
| route | SPA 的路由    | var    | window 或 route | window | 是       |

### events

| 事件名         | 说明                         | 入参                           |
| -------------- | ---------------------------- | ------------------------------ |
| \_pageEnter    | 页面进入事件                 | params 采集的日志, cb 回调函数 |
| \_pageLeave    | 页面离开事件                 | params 采集的日志, cb 回调函数 |
| \_send         | 上报回调                     | cb 回调函数                    |
| \_errors       | 错误信息采集事件             | params 采集的日志, cb 回调函数 |
| \_net_req      | 网络请求发起事件             | params 采集的日志, cb 回调函数 |
| \_net_res      | 网络请求结束并成功           | params 采集的日志, cb 回调函数 |
| \_net_bus_err  | 网络请求结束但发生业务错误   | params 采集的日志, cb 回调函数 |
| \_net_http_err | 网络请求结束但发生 HTTP 错误 | params 采集的日志, cb 回调函数 |
| \_addLog       | 自定义事件                   | params 采集的日志, cb 回调函数 |

### _addLog 自定义事件如下 示例

```js
{
  "event_id":"buy_click",
  "event_name":"点击购买按钮事件",
  "params":{
    "price":"1000",
    "product_name":"10米臂车"
  }
}
```

- [埋点文档](http://wiki.znlhzl.org/pages/viewpage.action?pageId=21667138)

* 注意事项： 每次修改埋点源文件代码需要执行 npm run build 后再提交代码，发布版本！！！

```js
// 指令定义
export default function inserted (Vue) {
  Vue.directive('dot', {
    // 钩子函数，被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
    inserted (el, binding, vnode) {
      el.onclick = function (event) {
        try {
          if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
            if (!(binding.value && binding.value.id && binding.value.name)) {
              Vue.prototype.$alert(
                `【${this.innerText}】按钮点击事件埋点的[id]和[name]是必填的`,
                '埋点异常通知',
                {
                  confirmButtonText: '确定',
                  callback: action => {

                  }
                }
              )
              return
            }
          }

          let obj = binding.value
          let id = obj ? obj.id : 'click_' + new Date().getTime()
          let name = obj && obj.name ? obj.name : event.target.innerHTML
          obj['page_title'] = Vue.prototype.$dot.event.pageTitle
          obj['page_path'] = Vue.prototype.$dot.event.pageEnterPath
          Vue.prototype.$dot.event._addLog({
            'event_id': id,
            'event_name': name,
            'params': obj
          })
        } catch (error) {
          console.error(error)
          Vue.prototype.$dot.event._errors({
            error_desc: error
          })
        }
      }
    }
  })
}
```
```html
// 项目中使用
<a @click="addHandle(item)" v-dot='{id:"repaire_add_by_name_click",name:"报修", projectName: `${item.projectName}`, time: `${dateFormate}`}'>+ 报修</a>
```
