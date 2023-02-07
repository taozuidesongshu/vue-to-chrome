<template>
  <div class="main_app">
    <ass-360-list name="我" :table-data="infoData"></ass-360-list>
  </div>
</template>

<script>
import {  apiResultViewFlowContent } from '@/api/performance'
import ass360List from '@/options/OT/App/ass360List'

export default {
  name: 'app',
  mixins: [],
  filters: {},
  components: { ass360List },
  props: {},
  data() {
    return {
      infoData: [],
      activeName: undefined
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getInfo()
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    //获取展示数据
    async getInfo(newValue) {
      this.loading = true
      try {
        const query = {
          period_id: 16,
          flow_id: [4], //只看流程4 他人给我评估
          type: 1, //1 获取参考内容 2 获取填写内容
          be_evaluate_user_id: 7196
        }
        const { data = [] } = (await apiResultViewFlowContent(query))//展示数据
        //处理数据
        this._.forEach(data, viewData => {
          this._.forEach(viewData.content, (item) => {
            this._.forEach(item.items, listItem => {
              const item_option = this._.cloneDeep(listItem.item_option)
              const newItem_option = []
              //父评估项挪到外面，
              this._.forEach(item_option, subItem => {
                if (subItem.is_main && subItem.item_type === 'OPTION') {
                  listItem.itemInfo = this._.cloneDeep(subItem)
                } else {
                  newItem_option.push(subItem)
                }
              })
              listItem.item_option = newItem_option
            })
          })
        })
        this.infoData = data
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
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
