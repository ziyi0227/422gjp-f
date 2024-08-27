<template>
  <div>
    <el-card>
      <!-- 新建按钮 -->
      <div style="margin-bottom: 20px; text-align: right;">
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="openNewMemberUI">新建成员</el-button>
      </div>

      <!-- 成员列表表格 -->
      <el-table :data="memberList" stripe style="width: 100%">
        <el-table-column label="#" width="60">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="成员ID" width="140" />
        <el-table-column prop="name" label="姓名" width="130" />
        <el-table-column prop="type" label="身份" width="130" />
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openEditUI(scope.row.id)" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteUser(scope.row)" />
          </template>
        </el-table-column>
      </el-table>

      <!-- 用户信息编辑对话框 -->
      <el-dialog :visible.sync="dialogFormVisible" :title="dialogTitle" @close="clearForm">
        <el-form ref="userFormRef" :model="userForm" :rules="rules">
          <el-form-item label="成员ID" prop="id">
            <el-input v-model="userForm.id" autocomplete="off" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="userForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="身份" prop="type">
            <el-input v-model="userForm.type" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="saveUser">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberList: [
        { id: 1, name: '张三', type: '家长' },
        { id: 2, name: '李四', type: '孩子' },
        { id: 3, name: '王五', type: '家长' }
      ],
      dialogFormVisible: false,
      dialogTitle: '',
      userForm: {
        id: '',
        name: '',
        type: ''
      },
      rules: {
        id: [{ required: true, message: '请输入成员ID', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        type: [{ required: true, message: '请输入身份', trigger: 'blur' }]
      }
    }
  },
  methods: {
    openNewMemberUI() {
      this.dialogTitle = '新建成员'
      this.clearForm()
      this.dialogFormVisible = true
    },
    openEditUI(id) {
      const member = this.memberList.find((item) => item.id === id)
      if (member) {
        this.dialogTitle = '编辑成员'
        this.userForm = { ...member }
        this.dialogFormVisible = true
      }
    },
    deleteUser(member) {
      this.$confirm(`确定删除成员 ${member.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.memberList = this.memberList.filter((item) => item.id !== member.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    saveUser() {
    },
    clearForm() {
      this.$refs.userFormRef.resetFields()
      this.userForm = {
        id: '',
        name: '',
        type: ''
      }
    }
  }
}
</script>

<style scoped>
#search .el-input {
  width: 250px;
  margin-right: 10px;
}
.el-dialog .el-input {
  width: 80%;
}

.dialog-footer {
  text-align: right;
}
</style>
