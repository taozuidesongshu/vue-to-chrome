<template>
  <div class="dome_box" ref="dome_box" :style="{'z-index': 2002}">
    <el-button @click="close" type="danger" class="header-btn el-icon el-icon-close"></el-button>
    <div class="header-box" ref="headerBox">
      <el-form ref="listQuery" :inline="true" :model="listQuery" size="mini">
        <el-form-item label="周期" prop="period_id">
          <el-select v-model="listQuery.period_id" filterable placeholder="请选择" style="width: 80vw; max-width: 400px;">
            <el-option
                v-for="item in period_options"
                :key="item.period_id"
                :label="item.name"
                :value="item.period_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="被评估人姓名" prop="be_evaluate_user_id">
          <el-select
              v-model="listQuery.be_evaluate_user_id"
              style="width: 150px"
              clearable
              filterable
              remote
              :remote-method="remoteMethod"
              placeholder="通过姓名搜索"
          >
            <el-option
                v-for="item in options"
                :key="item.user_id"
                :value="item.user_id"
                :label="`${item.user_name}[${item.employee_number}]`"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button data-type="search" type="primary" @click="handleFilter">搜索</el-button>
          <el-button data-type="clear" @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p>他人给我的评估</p>
    <el-table
        ref="multipleTable"
        :data="tableData"
        :key="newDate"
        element-loading-text="努力加载中"
        border
        :default-expand-all="expand"
        @header-click="handleExpand"
        @expand-change="handleExpandChange"
        size="mini"
    >
      <el-table-column type="expand" width="34">
        <template slot="header">
          <svg-icon icon-class="right" />
        </template>
        <template slot-scope="props">
          <div class="info-title-fast" v-for="(contentItem, conItemIndex) in props.row.content" :key="conItemIndex">
            <div v-for="(item,itemsIndex) in contentItem.items" :key="itemsIndex">
              <div class="info-title-conte-v1" v-if="item.hasOwnProperty('item_id') || item.hasOwnProperty('is_custom')">
                <div class="info-title-conte-title-v1 ">{{ item.item_title }}</div>
                <div class="info-title-conte-box-v1">
                  <pre v-html="getHref(item.item_content)"></pre>
                </div>
              </div>
              <div class="info-title-conte-v1" v-if="item.hasOwnProperty('itemInfo')">
                <div class="info-title-conte-title-v1 ">{{ item.itemInfo.item_title }}</div>
                <div class="info-title-conte-box-v1">
                  <pre v-html="getHref(item.itemInfo.item_content)"></pre>
                </div>
              </div>
              <div v-for="(subItem,subItemIndex) in item.item_option" :key="subItemIndex">
                <div class="info-title-conte-v2" v-if="subItem.hasOwnProperty('item_id')">
                  <div class="info-title-conte-title-v2">{{ subItem.item_title }}</div>
                  <div class="info-title-conte-box-v2">
                    <pre v-html="getHref(subItem.item_content)"></pre>
                  </div>
                  <div v-for="(item_sub_sub,item_sub_subIndex) in subItem.item_sub_option" :key="item_sub_subIndex">
                    <div class="info-title-conte-v2" v-if="item_sub_sub.hasOwnProperty('item_id')">
                      <div class="info-title-conte-title-v2">{{ item_sub_sub.item_title }}</div>
                      <div class="info-title-conte-box-v2">
                        <pre v-html="getHref(item_sub_sub.item_content)"></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="info-title-conte-v1" v-if="contentItem.attachment.length">
              <div class="info-title-conte-title-v1">附件</div>
              <div>
                <p v-for="file in contentItem.attachment" :key="file.file_name">
                  <el-link :href="file.file_url" target="_blank" type="primary" :download="file.file_name">
                    {{ file.file_name }}
                  </el-link>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="360°评分" align="center" min-width="77" sortable />
      <el-table-column prop="evaluate_user_name" label="评估人" align="center" min-width="90"></el-table-column>
      <el-table-column prop="be_evaluate_user_name" label="被评估人" align="center" min-width="90"></el-table-column>
      <el-table-column prop="" label="评分区间" align="center" min-width="78">
        <template slot-scope="{ row }">
          {{ row.min_score }}-{{ row.max_score }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="评分排名" align="center" min-width="60">
        <template slot-scope="{ row }">
          {{ row.rank || '--' }}/{{ row.rank_total }}
        </template>
      </el-table-column>
      <el-table-column prop="label" label="环评标签" align="center" min-width="78">
        <template slot-scope="{ row }">
          {{ row.label || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="evaluate_user_department" label="部门" align="center" min-width="110" />
      <el-table-column prop="evaluate_user_position" label="职位" align="center" min-width="94" />
    </el-table>
  </div>
</template>
<script>

import { apiResultViewFlowContent, apiPersonalPeriodList ,apiDepartmentUser} from '@/api/performance'

export default {
  name: 'Ass360List',
  components: {},
  props: {
    // info: {
    //   type: Object,
    //   request: true,
    //   default: () => {
    //   }
    // },
    // name: {
    //   type: String,
    //   request: true,
    //   default: ''
    // }
  },
  data() {
    return {
      newDate: new Date().getTime(),
      expand: false,
      //我给他人的评估
      tableData: [],
      listQuery: {
        period_id: undefined,
        be_evaluate_user_id: 7196
      },
      period_options: [],
      user_options: [],
      options: []
    }
  },
  created() {
    this.getSelectList()
  },
  methods: {
    //获取展示数据
    async getInfo() {
      this.loading = true
      try {
        const query = {
          period_id: this.listQuery.period_id,
          flow_id: [4], //只看流程4 他人给我评估
          type: 1, //1 获取参考内容 2 获取填写内容
          be_evaluate_user_id: this.listQuery.be_evaluate_user_id
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
        this.tableData = data
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    //获取用户，组织架构
    async get_options(period_id) {
      const { user, department } = (await apiDepartmentUser({ period_id })).data //获取所有组织架构、所有用户
      this.user_options = user
    },
    close(e) {
      e.currentTarget.parentNode.remove()
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.flow_id === 3) {
        return 'info-row'
      }
    },
    getHref(content) {
      if (!content || typeof (content) !== 'string') {
        return content
      }
      let value = content.replaceAll('<', '&lt;').replaceAll('<', '&gt;')
      // let urlPattern = /(https?:\/\/|www\.)[a-zA-Z_0-9\-@]+(\.\w[a-zA-Z_0-9\-:]+)+(\/[\(\)~#&\-=?\+\%/\.\w]+)?/g
      let urlPattern = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;\u4E00-\u9FA5]+[-A-Za-z0-9+&@#/%=~_|]/g
      let urlPattern2 = /https?:\/\/((?!&gt;).)*/g
      return value.replace(urlPattern, function(match) {
        return match.replace(urlPattern2, function(match2) {
          return '<a target="_blank" style="color: #409eff;text-decoration: underline;" href="' + match2 + '">' + match2 + '</a>'
        })
      })
    },
    handleExpand(column) {
      if (column.type === 'expand') {
        this.newDate = new Date().getTime()
        this.expand = !this.expand
      }
    },
    handleExpandChange(row, list) {
      this.expand = list.length === this.tableData.length
    },
    //另一个tab的list
    getTabsList(val) {
      const query = {
        period_id: val.period_id,
        flow_id: [3, 4],
        type: 1,
        evaluate_user_id: val.be_evaluate_user_id
      }
      //获取我给他人评估
      apiToOthersEvaluateOther(query).then(res => {
        if (res.hasOwnProperty('data')) {
          this.MyOthersTableData = res.data
        }
      }).catch(err => {

      })

    },
    //获取周期
    async getSelectList() {
      console.log('调用了')
      this.period_options = []
      const query = {
        type: 1
      }
      const { data = [] } = await apiPersonalPeriodList(query)
      this.get_options(data[1].period_id)
      this.period_options = data
    },
    //搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getInfo()

    },
    //清空
    clearSearch() {
      this.$refs['listQuery'].resetFields()
      this.getInfo()
    },
    //筛选搜索的用户
    remoteMethod(query) {
      if (query !== '') {
        this.options = this.user_options.filter(item => {
          return item.user_name.toLowerCase().includes(query.toLowerCase()) || item.employee_number.toLowerCase().includes(query.toLowerCase())
        })
      } else {
        this.options = []
      }
    }
  },
  watch: {
    expand: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          if (document.querySelector('.el-table th>.cell > svg')) {
            if (val) {
              document.querySelector('.el-table th>.cell > svg').style.transform = 'rotate(90deg)'
            } else {
              document.querySelector('.el-table th>.cell > svg').style.transform = 'rotate(0deg)'
            }
          }
        })
      }
    },
    tableData: {
      immediate: true,
      handler(val) {
        if (val.length) {
          this.newDate = new Date().getTime()
          this.expand = false
          //请求另一个tab的数据
          // this.getTabsList(this.info)
        }
      }
    }
  }
}
</script>
<style scoped>
.header-box {
  height: auto;
  padding: 0 4px;
  border-bottom: 1px solid #ebeef5;
  width: max-content;
  margin: 20px auto;
}

.dome_box {
  background-color: #f7f9fa;
  border: 1px solid #e0e1e9;
  height: 60vh;
  border-radius: 6px;
  width: max-content;
  min-width: 80vw;
  position: absolute;
  top: 50px;
  left: 100px;
}

.header-btn {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
