<template>
  <div>
    <!--  搜索栏-->
    <el-card>
      <el-col :span="5" class="search-row">
        <!--选择查询的人（身份），多选-->
        <el-select v-model="searchModel.member" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="15">
        <el-date-picker
          v-model="searchModel.date"
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
        <el-button type="primary" icon="el-icon-plus" circle @click="openEditUI(null)" />
      </el-col>
    </el-card>
    <!--结果列表-->
    <el-card>
      <el-table
        :data="outList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="index"
          label="#"
          width="60"
        />
        <el-table-column
          prop="date"
          label="日期"
          width="120"
        />
        <el-table-column
          prop="type"
          label="身份"
          width="80"
        />
        <el-table-column
          prop="outcome"
          label="金额"
          width="100"
        />
        <el-table-column
          prop="category"
          label="类别"
          width="180"
        />
        <el-table-column
          prop="mark"
          label="备注"
        />
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="openEditUI(scope.row.id)" />
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteOutcome(scope.row)" />
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="clearForm">
      <el-form :model="outForm">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="outForm.date"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="身份" :label-width="formLabelWidth">
          <el-select v-model="outForm.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="outForm.outcome" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-cascader v-model="outForm.category" :props="props" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="outForm.mark" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!--TODO:上传数据-->
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OutMoney',
  data() {
    return {
      formLabelWidth: '110px',
      dialogFormVisible: false,
      total: 0,
      title: '',
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
      outList: [
        { index: 1, date: '2024-08-01', type: '父亲', outcome: 1000, category: '工资', mark: '本月工资', id: 1 },
        { index: 2, date: '2024-08-02', type: '母亲', outcome: 500, category: '奖金', mark: '季度奖金', id: 2 },
        { index: 3, date: '2024-08-03', type: '儿子', outcome: 300, category: '奖学金', mark: '学校奖学金' },
        { index: 4, date: '2024-08-04', type: '女儿', outcome: 200, category: '压岁钱', mark: '春节红包' },
        { index: 5, date: '2024-08-05', type: '父亲', outcome: 500, category: '股票', mark: '股市收益' },
        { index: 6, date: '2024-08-06', type: '母亲', outcome: 100, category: '兼职', mark: '周末兼职' },
        { index: 7, date: '2024-08-07', type: '儿子', outcome: 50, category: '零花钱', mark: '父母给的零花钱' },
        { index: 8, date: '2024-08-08', type: '女儿', outcome: 150, category: '演出费', mark: '儿童剧表演费用' },
        { index: 9, date: '2024-08-09', type: '父亲', outcome: 200, category: '投资回报', mark: '基金分红' },
        { index: 10, date: '2024-08-10', type: '母亲', outcome: 300, category: '稿费', mark: '文章稿酬' }
      ],
      outForm: {},
      props: { // 级联配置
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      }
    }
  },
  methods: {
    clearForm() {
      this.outForm = {}
    },
    openEditUI(id) {
      if (id == null) {
        this.title = '新增支出记录'
      } else {
        this.title = '修改支出记录'
        // TODO：根据id查询用户数据
      }
      this.dialogFormVisible = true
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    deleteOutcome(outcome) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO：删除逻辑
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
