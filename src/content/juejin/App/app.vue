<template>
  <div class="box" :style="`right: ${right}px;`">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="每日讯息" name="first">
        <div class="card__header">
          <span>{{ name }}    {{ time }}</span>
          <!--        <el-button-->
          <!--            style="float: right; padding: 3px 0"-->
          <!--            type="text"-->
          <!--            @click="go()"-->
          <!--        >操作按钮-->
          <!--        </el-button>-->
          <a :href="imgUrl" target="_blank">主要链接</a>
        </div>
        <el-image
            style="width: 500px;"
            :src="imgUrl"
            :fit="'fill'"
        ></el-image>
      </el-tab-pane>
      <el-tab-pane label="便签" name="second">
        <ul>
          <li v-for="(o,index) in promptData" :key="index" class="box-li">
            <div style="flex: 1;text-align: left;">
              {{ index + 1 }}： {{ o }}
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <div class="hiddenBottom" style="top: 400px;" @click="toLeft">
      <i :class="ico"></i>
    </div>
  </div>
</template>

<script>
  import { api60s } from '@/api/api'

  export default {
    name: 'app',
    mixins: [],
    filters: {},
    components: {},
    props: {},
    data() {
      return {
        activeName: 'first',
        promptData: [
          '学历提升，影响工资',
          '改善沟通能力，快速响应对方，结果反馈，预计时间并告诉对方',
          '发现自己的问题，改变自己的缺点，提升自己',
          '主动发现以前的挂掉的爬虫，看能否接手重启',
          '主动承担node，和插件的开发任务',
          '干活要让上级发现，要表现出来，不能低头干活',
          '查看学徒人员的代码，发现问题，指出问题，一起提升',
          '以前端或IT部全局角度看待问题，尝试统领前端干活，提升看问题的高度和广度，为以后转管理岗，做准备',
          'saas老板已组件单独部门，后期很大可能会被拿走项目。目前只是临时开发',
          '尝试查看，老板的OKR，看能否已写插件的方式实现'
        ],
        listData: [],
        right: '0',
        ico: 'el-icon-arrow-left',
        imgUrl: ''
      }
    },
    computed: {},
    watch: {},
    created() {
      this.go()
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {
      handleClick() {
      },
      toLeft() {
        const num = this.right
        if (num === '-500') {
          this.ico = 'el-icon-arrow-left'
          this.right = '0'
        } else {
          this.ico = 'el-icon-arrow-right'
          this.right = '-500'
        }
      },
      go() {
        //http://bjb.yunwj.top/php/API/html.html?1
        //https://api.vvhan.com/60s.html
        //https://api.vvhan.com/
        api60s({ 'type': 'json' }).then(res => {
          this.listData = res.data
          this.time = res.time
          this.name = res.name
          this.imgUrl = res.imgUrl
        })
      }
    }
  }
</script>

<style rel="stylesheet/css" lang="css" scoped>
  .box {
    position: absolute;
    top: 130px;
    bottom: 0;
    width: 500px;
    height: auto;
    background: #fcfcfc;
    z-index: 99;
  }

  .card__header {
    box-sizing: border-box;
    padding: 18px 20px;
    border-bottom: 1px solid rgb(235, 238, 245);
  }

  .box-li {
    padding: 1rem 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 2rem;
    color: #515767;
    font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial !important;
  }


  .hiddenBottom {
    width: 12px;
    height: 50px;
    left: -12px;
    color: #000000;
    line-height: 50px;
    /*border-radius: 0 15px 15px 0;*/
    border-radius: 15px 0 0px 15px;
    background-color: #027ee2;
    display: inline-block;
    position: absolute;
    cursor: pointer;
    opacity: .4;
    font-size: 2px;
    margin-left: 1px;
  }
</style>