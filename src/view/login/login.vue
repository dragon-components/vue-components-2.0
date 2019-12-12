<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login"
       @keydown.enter="handleSubmit">
    <div class="screenBg"
         id="screenBg"></div>
    <div class="login-con">
      <h1 class="header-title">众能联合设备管理系统</h1>
      <Card :bordered="false">
        <p slot="title">登录</p>
        <div class="form-con">
          <Form ref="loginForm"
                :model="form"
                :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName"
                     placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16"
                      type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password"
                     v-model="form.password"
                     placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14"
                      type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem class="btn-list">
              <Button @click="handleSubmit()"
                      type="primary"
                      :disabled="load"
                      event-param="30000|0536001|登录">登录</Button>
              <Checkbox class="re-password"
                        :class="verify ? 'new_password': ''">
                <span>记住密码</span>
              </Checkbox>
            </FormItem>
          </Form>
          <p class="login-tip"></p>
        </div>
      </Card>
      <p class="copy-right">2019 © by znlh.</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import THREE from '@/utils/libs/three/three'
export default {
  data () {
    return {
      verify: false,
      form: {
        userName: '',
        password: ''
      },
      load: false,
      loginData: null,
      rules: {
        userName: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }]
      },
      timer: false,
      screenWidth: document.body.clientWidth
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'getLeftMenu', // by store module main.js
      'getButtonStatusList'
    ]),
    handleSubmit () {
      let param = {
        name: this.form.userName || 'super_admin',
        pwd: this.form.password }
      // 登录健权
      this.handleLogin(param).then(resp => {
        if (resp.success) {
          // 获取用户
          this.getUserInfo().then(res => {
            if (res.success) {
              let leftMenu = res.leftmenu
              let buttonStatusList = res.buttonStatusList
              leftMenu.length && leftMenu.map(item => {
                switch (item.code + '') {
                  case 'dms':
                    item.subs.map(value => {
                      if (value.code + '' === 'deviceList') {
                        value.subs = [{ code: 'third-leave', title: '第三级菜单' }]
                      }
                    })
                    break
                  default:
                    break
                }
              })
              // 菜单
              leftMenu.unshift({ code: 'document', title: '开发文档' })
              this.getLeftMenu(leftMenu)
              // 按钮
              this.getButtonStatusList(buttonStatusList)
              this.$router.push({
                name: this.$config.homeName
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    /* 登录界面动画 */
    screenBg () {
      if (document.getElementsByTagName('canvas') && document.getElementsByTagName('canvas').length > 0) {
        document.getElementById('screenBg').innerHTML = ''
      }
      var SCREEN_WIDTH = window.innerWidth
      var SCREEN_HEIGHT = window.innerHeight
      var SEPARATION = 90
      var AMOUNTX = 50
      var AMOUNTY = 50
      var container
      var particles, particle
      var count
      var camera
      var scene
      var renderer
      var mouseX = 0
      var windowHalfX = window.innerWidth / 2
      init()
      this.interval = setInterval(loop, 1000 / 60)
      function init () {
        container = document.createElement('div')
        container.style.position = 'relative'
        container.style.top = '200px'
        document.getElementById('screenBg').appendChild(container)

        camera = new THREE.Camera(60, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000)
        // camera = new THREE.PerspectiveCamera(60, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 20000)
        camera.position.z = 1000

        scene = new THREE.Scene()

        renderer = new THREE.CanvasRenderer()
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

        particles = []

        var i = 0
        var material = new THREE.ParticleCircleMaterial(0x556171, 1)

        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++] = new THREE.Particle(material)
            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2)
            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2)
            scene.add(particle)
          }
        }
        count = 0
        container.appendChild(renderer.domElement)
        document.addEventListener('mousemove', onDocumentMouseMove, false)
      }

      function onDocumentMouseMove (event) {
        mouseX = event.clientX - windowHalfX
      }

      function loop () {
        camera.position.x += (mouseX - camera.position.x) * 0.05
        camera.position.y = 364
        var i = 0
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++]
            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2
          }
        }

        renderer.render(scene, camera)
        count += 0.1
      }
      this.interval = null
    }
  },
  mounted () {
    const _this = this
    _this.screenBg()
    window.onresize = () => {
      return (() => {
        _this.screenWidth = document.body.clientWidth
      })()
    }
  }
}
</script>

<style>
</style>
