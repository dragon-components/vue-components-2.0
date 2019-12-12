
# 封装自定义请求
### 请求方法注册
注册的请求名 $$api_module_method
```js
    例如:
    this.$$api_promotion_queryDictionary({
        data: {
            code: 1,
            name: '测试'
        },
        fn: (data) => {
            // 成功回调
        },
        errFn:(data) => {
            // 自定义失败回调, 不定义则默认弹出报错信息
        }
    })
```
### 请求入参拼接在url后
```js
    this.$$api_promotion_queryDictionary({
        requestType: 'getString',  // 请求类型为getString时，参数拼在路由后面
        requestString: userData.userId + '/' + userData.sessionId,
        fn: (data) => {
            // 成功回调
        }
    })
```
### 自定义返回code处理
```js
    this.$$api_promotion_queryDictionary({
        data: {
            code: 1,
            name: '测试'
        },
        opts: {
            'code': true
        },
        fn: (data) => {
            if (data.code == 20100) {
                // do something
            } else if (data.code == 50101) {
                // do something
            } else {
                // do something
            }
        }
    })
```
### 自定义请求头信息
```js
    this.$$api_promotion_queryDictionary({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        },
        data: {
            code: 1,
            name: '测试'
        },
        fn: (data) => {
            // 成功回调
        },
        errFn:(data) => {
            // 自定义失败回调, 不定义则默认弹出报错信息
        }
    })
```
### 请求需要的入参不是对象，是个简单的值
```js
    this.$$api_promotion_queryDictionary({
        headers: {
            'Content-Type': 'application/json'
        },
        data: 123,
        fn: (data) => {
            // 成功回调
        },
        errFn:(data) => {
            // 自定义失败回调, 不定义则默认弹出报错信息
        }
    })
```
### 参数配置 ###

|属性                       |说明|
|--------------------------|-----|
|data                       |入参|
|requestType                |请求类型为getString时，参数拼在路由后面|
|requestString              |拼在路由后面的参数|
|fn                         |成功回调|
|errFn                      |失败回调|
|headers                    |http请求头的配置|
|opts                       |其它配置 'code':true  自定义code判断|