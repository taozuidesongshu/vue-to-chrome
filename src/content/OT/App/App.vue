<template>
  <div class="box_app">
    <el-button v-if="isShow" type="text" @click="adddome">
      查看
    </el-button>
    <!--    <ass-360-list name="我" :table-data="infoData"></ass-360-list>-->
  </div>
</template>

<script>
import ass360List from '@/content/OT/App/ass360List'
import Vue from 'vue'

export default {
  name: 'app',
  mixins: [],
  filters: {},
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    isShow() {
      return true
    }
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    adddome() {
      const time = new Date().getTime()
      var mpNode = document.createElement('div')
      mpNode.setAttribute('id', `mp${time}`)
      var pnode = document.body
      pnode.appendChild(mpNode)
      var Profile = Vue.extend(ass360List)
      new Profile({ propsData: {} }).$mount(`#mp${time}`)
    }

  }
}
</script>

<style scoped>
.box_app {
  position: absolute;
  top: 100px;
  right: 20px;
}

</style>
