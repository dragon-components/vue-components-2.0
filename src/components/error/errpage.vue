<template>
<div class="ZnErrorpage">
    <div class="noData" v-if="statuCode == 99999">{{ dataDesc }}</div>
    <div class="errContent" v-else>
        <div class="mes">
            <div class="title">{{ statuCode }}</div>
            <div class="desc">{{ statuDesc }}</div>
        </div>
        <img :src="status404" class="pic" :width="imgWidth" />
        <div class="countCell" v-if="isJumping && isShowCount">
            <span>{{ count }}</span>
            秒后跳转至{{ routerDes ? routerDes : "首页" }}
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'ZnErrorpage',
  props: {
    // 空数据描述文字
    dataDesc: {
      type: String,
      default: '暂无数据'
    },
    // 状态码
    statuCode: {
      default: '99999'
    },
    // desc
    statuDesc: {
      type: String,
      default: '浏览器找不到这个页面了'
    },
    // 图片宽度
    imgWidth: {
      type: Number,
      default: 450
    },
    // 是否跳转
    isJumping: {
      type: Boolean,
      default: false
    },
    // 路由
    router: {
      type: String,
      default: '/'
    },
    // 页面名称
    routerDes: {
      type: String,
      default: '首页'
    },
    // 倒计时
    count: {
      type: Number,
      default: 3
    },
    // 是否显示倒计时
    isShowCount: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      status404: require('./welcome.png')
    }
  },
  created () {
    this.toRouter()
  },
  mounted () {
    var _this = this
    debugger
    _this.statuCode = (!_this.statuCode || _this.statuCode === '') ? '99999' : _this.statuCode
  },
  methods: {
    toRouter () {
      let that = this
      const TIME_COUNT = that.count
      if (that.statuCode !== '99999' && that.isJumping) {
        that.count = (!that.count || that.count === '') ? 3 : that.count
        that.timer = setInterval(() => {
          if (that.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            clearInterval(that.timer)
            this.timer = null
            // 路由跳转
            that.$router.push({
              path: that.router // 默认首页
            })
            // alert('跳转到：' + that.router)
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less">
.ZnErrorpage {
    width: 100%;
    height: 100%;
    position: relative;

    .noData {
        font-size: 14px;
        color: #c0c0c0;
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .errContent {
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .pic {
            display: inline-block;
        }

        .title {
            font-weight: 800;
            font-size: 50px;
            color: blueviolet;
        }

        .desc {
            font-size: 14px;
            color: #c0c0c0;
        }
    }

    .countCell {
        text-align: right;
        font-size: 18px;

        span {
            color: blueviolet;
        }
    }
}
</style>
