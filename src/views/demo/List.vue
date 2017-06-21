<template>
  <section class="page-module">
    <div class="module-header">
      <h3>列表示例</h3>
    </div>
    <div class="module-content">
      <div class="panel panel-default">
        <div class="panel-body">
          <el-table :data="tableData" border>
            <el-table-column prop="date" label="日期" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="province" label="省份" width="120"></el-table-column>
            <el-table-column prop="city" label="市区" width="120"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
            <el-table-column label="操作" width="100">
              <template scope="scope">
                <el-button @click="onEditClick(scope.row, scope.$index)" type="primary" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-operate">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 50, 100]"
              :page-size="100" layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </div>
      </div>
      <edit-dialog
        :pdata="currentRowData"
        v-model="isDialogVisible"
        @dispatch-data="onUpdateRowData"></edit-dialog>
    </div>
  </section>
</template>

<script>
import EditDialog from './EditDialog'

export default {
  name: 'demo-list',

  props: {
  },

  data () {
    return {
      currentPage: 1,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      isDialogVisible: false,
      currentRowData: {},
      currentRowIndex: -1
    }
  },

  components: {
    EditDialog
  },

  computed: {},

  watch: {},

  created () {
  },

  mounted () {
  },

  filters: {},

  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },

    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },

    onUpdateRowData (data) {
      this.currentRowData = data
      this.$set(this.tableData, this.currentRowIndex, data)
    },

    /* ----------------------------On Click Event---------------------------- */
    onEditClick (rowData, index) {
      this.currentRowData = rowData
      this.currentRowIndex = index
      this.isDialogVisible = true
    }
  }
}
</script>
<style lang="scss"></style>
