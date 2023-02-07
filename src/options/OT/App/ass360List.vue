<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="`他人给${name}的评估`" name="second">
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
        class="table-gray"
        :row-class-name="tableRowClassName"
        :default-sort="{prop:'score',order:'descending'}"
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
    </el-tab-pane>
    <!--给他人评估页面-查看详情-不展示-我给他人的评估-->
  </el-tabs>
</template>
<script>

export default {
  name: 'Ass360List',
  components: {
  },
  props: {
    //他人给我
    tableData: {
      type: Array,
      default: () => []
    },
    dataItem: {
      type: Object,
      default: () => {
      }
    },
    info: {
      type: Object,
      request: true,
      default: () => {
      }
    },
    name: {
      type: String,
      request: true,
      default: ''
    }
  },
  data() {
    return {
      newDate: new Date().getTime(),
      expand: false,
      activeName: 'second',
      //我给他人的评估
      MyOthersTableData: []
    }
  },
  created() {

  },
  methods: {
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
    clickDetail(scope) {
      this.$refs.multipleTable.toggleRowExpansion(scope.row, true)
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
<style>
.el-table .info-row {
  background-color: #e6a23c26;
}
</style>
