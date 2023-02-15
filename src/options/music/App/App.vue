<template>
  <div class="main_app">
    <!--    <el-tag-->
    <!--        v-for="(item,index) in taglist" :key="index"-->
    <!--    >{{item.name}}</el-tag>-->
    <el-card class="box-card">
      <div
          slot="header"
          class="clearfix"
      >
        <div style="flex: 1">
          <el-input v-model="input" placeholder="输入歌名" />
        </div>
        <div style="width: 100px">
          <el-button
              @click="search"
          >搜索
          </el-button>
        </div>
      </div>
      <ul v-loading="loading">
        <li v-for="(o,index) in listData" :key="index" class="box-li">
          <div style="width: 10vw; height: 10vh">
            <el-image
                style="width: 100px; height: 100px"
                :src="o.al.picUrl"
                :fit="'fill'"></el-image>
          </div>
          <div style="flex: 1;text-align: left;">
            <div> {{ o.name }}{{ o.al.name }}</div>
            <div>{{o.alia.join(',')}}</div>
            <el-button v-if="!o.hasOwnProperty('url')" type="text" @click="getDownloadUrl(o)">获取下载地址</el-button>
            <el-button type="text" v-if="o.hasOwnProperty('url')&&o.url.length" @click="download(o)">中转下载</el-button>
            <a v-if="o.hasOwnProperty('url')&&o.url.length" :download="o.name" :href="o.url" target="_blank">源连接下载</a>
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { apiDownloadUrl, apiGetList } from '@/api/api'

export default {
  name: 'app',
  mixins: [],
  filters: {},
  components: {},
  props: {},
  data() {
    return {
      listData: [],
      input: undefined,
      loading: false
      // taglist:[
      //   {name:'歌曲',}
      // ]
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    search() {
      this.listData=[]
      this.loading=true
      const query = {
        'keywords': this.input
      }
      apiGetList(query).then(res => {
        this.listData = res.result.songs
        this.loading=false
      })
    },
    getDownloadUrl(item) {
      apiDownloadUrl({ id: item.id }).then(res => {
        if(!res.data.url){
          this.$notify.error({
            title: '错误',
            message: '未获取到下载链接'
          });
          return
        }
        this.$set(item, 'url', res.data.url)
      })
    },
    async download(item) {
      this.$message({
        message: `${item.name}下载中`,
        type: 'success',
      })
      const data = await fetch(item.url)
      const blob = await data.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = item.name+item.al.name
      a.click()
    }

  }
}
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.box-li {
  display: flex;
  height: 10vh;
  margin-bottom: 1vh;
  width: max-content;
}
</style>
