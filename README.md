## Install
```bush
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```
## 文件结构
```
├─config 本地开发条线域名配置
├─src
│  ├─api 业务接口请求
│  │  ├─cis 信用管理
│  │  ├─common 通用接口
│  │  ├─dms 设备管理
│  │  ├─fin 财务管理
│  │  ├─iot 物联网
│  │  ├─opr 运营线
│  │  ├─sale 销售线
│  │  ├─ser 服务管理
│  │  └─tms 供应链
│  ├─assets 项目静态资源
│  │  ├─icons 自定义图标资源
│  │  └─images 自定义图标资源
│  ├─components 框架组件
│  ├─config 项目运行配置
│  ├─constants 项目枚举定义
│  ├─directive 自定义指令
│  ├─libs 封装工具函数
│  ├─locale 多语言文件
│  ├─mock mock模拟数据
│  ├─plugin 自定义插件
│  ├─router 路由配置
│  ├─store Vuex配置
│  │  └─module 业务模块
│  │      ├─cis 信用管理
│  │      ├─dms 设备管理
│  │      ├─fin 财务管理
│  │      ├─iot 物联网
│  │      ├─opr 运营线
│  │      ├─sale 销售线
│  │      ├─ser 服务管理
│  │      └─tms 供应链
│  ├─utils 常用工具
│  │  ├─hosts 业务线条配置
│  │  ├─register 全局方法原型链挂载
│  │  └─service 请求服务抽象
│  └─view 页面文件
│      ├─cis-app 信用管理
│      │  └─children 子组件定义
│      ├─dms-app 设备管理
│      │  └─children 子组件定义
│      ├─error-page
│      ├─fin-app 财务管理
│      │  └─children 子组件定义
│      ├─iot-app 物联网
│      │  └─children 子组件定义
│      ├─login 登录
│      ├─opr-app 运营线
│      │  └─children 子组件定义
│      ├─sale-app 销售线
│      │  ├─crm
│      │  │  └─children 子组件定义
│      │  ├─order
│      │  └─report
│      ├─ser-app 服务管理
│      │  └─children 子组件定义
│      ├─single-page 首页管理
│      │  └─home 首页
│      └─tms-app 供应链
│          └─children 子组件定义
└─tests 测试相关
└─static 静态资源，全局样式定义，以及组件开发必备
```
