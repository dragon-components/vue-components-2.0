import { login, logout, getUserInfo, getJurisdiction } from '@/api/user'
import { setToken, getToken } from '@/utils/libs/util'
import { removeStore, setJSONStore, getJSONStore } from '@/utils/localStorage'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { name, pwd }) {
      name = name.trim()
      return new Promise((resolve, reject) => {
        login({
          name,
          pwd
        }).then(res => {
          const data = (res.data && res.data.data) || []
          if (data) {
            let userId = data.userInfo && data.userInfo.user && data.userInfo.user.userCode
            commit('setToken', data.token)
            commit('setUserId', userId)
            setJSONStore('userId', userId)
            resolve(res.data)
          }
        }).catch(err => {
          reject(err)
        })
      }
      )
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout({ tokenId: state.token }).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          removeStore('leftmenu')
          removeStore('buttonStatusList')
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          if (!state.userId) {
            state.userId = getJSONStore('userId')
          }
          // getUserInfo(state.userId).then(res => {
          //   const data = res.data
          //   // commit('setAvator', data.avator)
          //   // commit('setUserName', data.name)
          //   // commit('setUserId', data.user_id)
          //   commit('setAccess', ['super_admin'])
          //   commit('setHasGetInfo', true)
          //   // TODO 获取菜单列表
          //   getJurisdiction({}).then(respose => {
          //     // 获取菜单列表
          //     if (respose.data && respose.data.menus && respose.data.menus.length) {
          //       data.leftmenu = respose.data.menus[0]
          //       resolve(data)
          //     }
          //   })
          //   // resolve(data)
          // }).catch(err => {
          //   reject(err)
          // })
          Promise.all([getUserInfo({ userCode: state.userId }), getJurisdiction({})]).then((resArr) => {
            let respose = resArr[1]
            if (respose.data.data && respose.data.data.menus && respose.data.data.menus.length) {
              respose.data.leftmenu = respose.data.data.menus[0].subs
              respose.data.buttonStatusList = respose.data.data.elements
              commit('setHasGetInfo', true)
              resolve(respose.data)
            }
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
