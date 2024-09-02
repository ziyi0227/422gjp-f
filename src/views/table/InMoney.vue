<template>
  <div>
    <!--  搜索栏-->
    <el-card>
      <el-col :span="5" class="search-row">
        <!--选择查询的人（身份），多选-->
        <el-select v-model="inForm.type" multiple placeholder="请选择">
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
        />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" round icon="el-icon-search" style="margin-left: 20px;">查询</el-button>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-plus" circle @click="openNewMemberUI()" />
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
        <el-table-column prop="type" label="身份" width="100" />
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
          <el-date-picker v-model="inForm.incomeTime" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="身份" :label-width="formLabelWidth">
          <el-select v-model="inForm.type">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!--TODO:上传数据-->
        <el-button type="primary" @click="saveIncomeList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import IncomeApi from '@/api/Income'
export default {
  name: 'InMoney',
  data() {
    return {
      formLabelWidth: '110px',
      dialogFormVisible: false,
      dialogTitle: '',
      total: 0,
      options: [{
        value: '选项1',
        label: '父亲'
      }, {
        value: '选项2',
        label: '母亲'
      }, {
        value: '选项3',
        label: '儿子'
      }, {
        value: '选项4',
        label: '女儿'
      }],
      searchModel: {
        pageNo: 1,
        pageSize: 10
      },
      inList: [],
      // inList: [
      //   { index: 1, date: '2024-08-01', type: '父亲', income: 1000, category: '工资', mark: '本月工资', id: 1 },
      //   { index: 2, date: '2024-08-02', type: '母亲', income: 500, category: '奖金', mark: '季度奖金', id: 2 },
      //   { index: 3, date: '2024-08-03', type: '儿子', income: 300, category: '奖学金', mark: '学校奖学金' },
      //   { index: 4, date: '2024-08-04', type: '女儿', income: 200, category: '压岁钱', mark: '春节红包' },
      //   { index: 5, date: '2024-08-05', type: '父亲', income: 500, category: '股票', mark: '股市收益' },
      //   { index: 6, date: '2024-08-06', type: '母亲', income: 100, category: '兼职', mark: '周末兼职' },
      //   { index: 7, date: '2024-08-07', type: '儿子', income: 50, category: '零花钱', mark: '父母给的零花钱' },
      //   { index: 8, date: '2024-08-08', type: '女儿', income: 150, category: '演出费', mark: '儿童剧表演费用' },
      //   { index: 9, date: '2024-08-09', type: '父亲', income: 200, category: '投资回报', mark: '基金分红' },
      //   { index: 10, date: '2024-08-10', type: '母亲', income: 300, category: '稿费', mark: '文章稿酬' }
      // ],
      inForm: {
        id: '',
        incomeTime: '',
        type: '',
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
  },
  methods: {
    clearForm() {
      this.inForm = {}
    },

    openNewMemberUI() {
      this.dialogTitle = '新建成员'
      this.clearForm()
      this.dialogFormVisible = true
    },
    openEditUI(id) {
      const member = this.inList.find((item) => item.id === id)
      if (member) {
        this.dialogTitle = '编辑成员'
        this.inForm = {
          id: member.id,
          incomeTime: member.incomeTime,
          type: member.type,
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
            this.created()
            this.$message({
              type: 'success',
              message: '更新成功!'
            })
            this.dialogFormVisible = false
            this.clearForm()
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: '更新失败!'
            })
            console.error('更新失败:', err)
          })
      } else {
        IncomeApi.addIncome(this.inForm)
          .then(() => {
            this.created()
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.dialogFormVisible = false
            this.clearForm()
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: '添加失败!'
            })
            console.error('添加失败:', err)
          })
      }
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
          type: item.type,
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
