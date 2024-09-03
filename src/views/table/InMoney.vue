<template>
  <div>
    <!--  搜索栏-->
    <el-card>
      <el-col :span="5" class="search-row">
        <!--选择查询的人（身份）-->
        <el-select v-model="inForm.userType" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :span="15">
        <el-date-picker
          v-model="inForm.incomeTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="{disabledDate:dateOptions}"
        />
      </el-col>
      <el-col :span="3">
        <el-button
          type="primary"
          round
          icon="el-icon-search"
          style="margin-left: 20px;"
          @click="selectIncome(inForm.userType, inForm.incomeTime[0], inForm.incomeTime[1])"
        >
          查询
        </el-button>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-plus" circle @click="openNewIncomeUI()" />
      </el-col>
    </el-card>
    <!--结果列表-->
    <el-card>
      <el-table :data="inList" stripe style="width: 100%">
        <!--        <template slot-scope="scope">-->
        <!--          (pageNo -1 ) * pageSize + index + 1-->
        <!--          {{ (searchModel.pageNo-1) * searchModel.pageSize + scope.$index + 1 }}-->
        <!--        </template>>-->
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            {{ (searchModel.pageNo - 1) * searchModel.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="incomeTime" label="日期" width="200" />
        <el-table-column prop="userType" label="身份" width="100" />
        <el-table-column prop="amount" label="金额" width="150" />
        <el-table-column prop="categoryName" label="类别" width="180" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="openEditUI(scope.row.id)" />
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteIncomeByID(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--  分页组件-->
    <el-pagination
      :current-page="searchModel.pageNo"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!--  用户信息编辑对话框-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="clearForm">
      <el-form :model="inForm">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="inForm.incomeTime"
            type="date"
            placeholder="选择日期"
            :picker-options="{disabledDate:dateOptions}"
          />
        </el-form-item>
        <el-form-item label="身份" :label-width="formLabelWidth">
          <el-select v-model="inForm.userType">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="inForm.amount" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-input v-model="inForm.categoryName" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="inForm.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" size="mini" style="text-align: left;margin-right: 80%" @click="categoryFormVisible = true">没找到类别？>>></el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!--TODO:上传数据-->
        <el-button type="primary" @click="saveIncomeList">确 定</el-button>
      </div>
    </el-dialog>

    <!--  添加类别对话框-->
    <el-dialog title="新增收入类别" :visible.sync="categoryFormVisible">
      <el-form :model="categoryForm">
        <el-form-item label="一级类别" :label-width="formLabelWidth">
          <el-select
            v-model="categoryForm.firstCategory"
            filterable
            allow-create
            default-first-option
            remote
            placeholder="请选择/创建一级标签"
            :remote-method="remoteMethod"
            :loading="categoryLoading"
          >
            <el-option
              v-for="item in categoryOptions"
              :key="item.categoryValue"
              :label="item.categoryLabel"
              :value="item.categoryValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="二级类别" :label-width="formLabelWidth">
          <el-input v-model="categoryForm.secondCategory" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="categoryFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="categoryFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import IncomeApi from '@/api/Income'
import { getUserType } from '@/api/user'
export default {
  name: 'InMoney',
  data() {
    return {
      formLabelWidth: '110px',
      dialogFormVisible: false,
      categoryFormVisible: false,
      dialogTitle: '',
      total: 0,
      options: [],
      searchModel: {
        pageNo: 1,
        pageSize: 10
      },
      inList: [],
      categoryForm: {
        firstCategory: '',
        secondCategory: ''
      },
      categoryOptions: [],
      categoryValue: [],
      categoryList: [],
      categoryLoading: false,
      categoryStates: [],
      inForm: {
        id: '',
        incomeTime: '',
        userType: '',
        amount: '',
        categoryName: '',
        remark: ''
      }
      // props: { // 级联配置
      //   lazy: true,
      //   lazyLoad(node, resolve) {
      //     const { level } = node
      //     setTimeout(() => {
      //       const nodes = Array.from({ length: level + 1 })
      //         .map(item => ({
      //           // eslint-disable-next-line no-undef
      //           value: ++id,
      //           // eslint-disable-next-line no-undef
      //           label: `选项${id}`,
      //           leaf: level >= 2
      //         }))
      //       // 通过调用resolve将子节点数据返回，通知组件数据加载完成
      //       resolve(nodes)
      //     }, 1000)
      //   }
      // }
    }
  },
  created() {
    this.getIncomeList()
    this.getUserType()
  },
  mounted() {
    this.categoryList = this.states.map(item => {
      return { categoryValue: `value:${item}`, categoryLabel: `label:${item}` }
    })
  },
  methods: {
    clearForm() {
      this.inForm = {}
    },
    openNewIncomeUI() {
      this.dialogTitle = '新建收入'
      this.clearForm()
      // this.inForm.incomeTime = new Date(this.inForm.incomeTime).toISOString().slice(0, 19)
      // console.log('inForm', this.inForm)
      this.dialogFormVisible = true
    },
    openEditUI(id) {
      const member = this.inList.find((item) => item.id === id)
      if (member) {
        // 假设 member.incomeTime 是一个字符串，首先创建一个 Date 对象
        const date = new Date(member.incomeTime)
        // 将日期格式化为 ISO 8601 格式（去掉毫秒部分），这通常是后端期望的格式
        const formattedIncomeTime = date.toISOString().slice(0, 19)
        this.dialogTitle = '编辑收入'
        this.inForm = {
          id: member.id,
          incomeTime: formattedIncomeTime,
          userType: member.userType,
          amount: member.amount,
          categoryName: member.categoryName,
          remark: member.remark
        }
      }
      // this.clearForm()
      // console.log('this.inForm', this.inForm)
      this.dialogFormVisible = true
    },
    saveIncomeList() {
      if (this.inForm.id) {
        IncomeApi.updateIncome(this.inForm)
          .then(() => {
            this.$message({
              type: 'success',
              message: '更新成功!'
            })
            this.dialogFormVisible = false
            this.clearForm()
            this.getIncomeList()
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: '更新失败!'
            })
            console.error('更新失败:', err)
          })
      } else {
        this.inForm.incomeTime = new Date(this.inForm.incomeTime).toISOString().slice(0, 19)
        IncomeApi.addIncome(this.inForm)
          .then(() => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.dialogFormVisible = false
            this.clearForm()
            this.getIncomeList()
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: '添加失败!'
            })
            console.error('添加失败:', err)
          })
      }
    },
    dateOptions(time) {
      return time.getTime() > Date.now() - 8.64e6
    },
    // openEditUI(id) {
    //   if (id == null) {
    //     this.title = '新增收入记录'
    //     // IncomeApi.addIncome(){}
    //   } else {
    //     this.title = '修改收入记录'
    //     // TODO：根据id查询用户数据
    //   }
    //   this.dialogFormVisible = true
    // },
    handleSizeChange(size) {
      this.searchModel.pageSize = size
      this.getIncomeList()
    },
    handleCurrentChange(page) {
      this.searchModel.pageNo = page
      this.getIncomeList()
    },
    getIncomeList() {
      IncomeApi.getIncomeList(this.searchModel).then(response => {
        // console.log(response)
        // this.searchModel.pageNo = response.data.current
        // this.searchModel.pageSize = response.data.pages
        this.total = response.data.total
        // this.total = Object.keys(response.data).length
        // console.log(response.data)
        // 提取需要的数据
        this.inList = response.data.records.map(item => ({
          id: item.id,
          incomeTime: this.formatDate(item.incomeTime),
          userType: item.type,
          amount: item.amount,
          categoryName: item.categoryName,
          remark: item.remark
        }))
      }).catch((err) => {
        console.error('加载成员数据失败:', err)
      })
    },
    deleteIncomeByID(income) {
      // console.log(income)
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO：删除逻辑
        IncomeApi.deleteIncomeByID(income.id).then(() => {
          this.getIncomeList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch((err) => {
          console.error('删除成员数据失败:', err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    selectIncome(userType, startDate, endDate) {
      // console.log('Selected User Types:', userType)
      // console.log('Start Date:', startDate)
      // console.log('End Date:', endDate)

      // 转化日期为 ISO 格式
      // if(startDate != null || endDate != null){
      const startTime = new Date(startDate).toISOString().slice(0, 19)
      const endTime = new Date(endDate).toISOString().slice(0, 19)
      // }

      // 调用接口，并传递参数
      IncomeApi.selectIncome({
        userType: userType,
        startTime: startTime,
        endTime: endTime
      }).then(response => {
        // console.log(response)
        this.inList = []
        this.inList = response.data.map(item => ({
          id: item.id,
          incomeTime: this.formatDate(item.incomeTime),
          userType: item.type,
          amount: item.amount,
          categoryName: item.categoryName,
          remark: item.remark
        }))
        this.total = this.inList.length
      }).catch((err) => {
        console.error('查询收入数据失败:', err)
      })
    },
    formatDate(isoString) {
      const date = new Date(isoString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，所以要加 1
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      // 返回格式为 YYYY-MM-DD HH:mm:ss
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
    getUserType() {
      getUserType().then(response => {
        this.options = response.data.map(item => {
          return {
            value: item,
            label: item
          }
        })
        // console.log('options', this.options)
      }).catch((err) => {
        console.error('加载成员数据失败:', err)
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style scoped>
.search-row{
  margin-bottom: 15px;
}
.el-card{
  margin-bottom: 10px;
}
.el-pagination{
  display: flex;
  justify-content: center;
}
.el-dialog .el-input{
  width: 85%;
}
</style>
