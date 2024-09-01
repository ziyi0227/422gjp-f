<template>
  <div>
    <el-dialog
      title="修改家庭信息"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <div class="updateinfo">
          <div class="left">
            <el-form-item label="家庭头像" prop="avatar">
              <img style="width:150px;height:110px" :src="form.avatar" alt="pic">
            </el-form-item>
            <el-form-item label="家庭密码" prop="password">
              <el-input v-model="form.password" />
            </el-form-item>
            <el-form-item label="家庭名称" prop="nickname">
              <el-input v-model="form.nickname" />
            </el-form-item>
            <el-form-item label="家庭成员数量" prop="familyNumber">
              <el-input v-model="form.familyNumber" />
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item label="家庭编号" prop="id">
              <el-input v-model="form.id" disabled />
            </el-form-item>
            <el-form-item label="家庭账号" prop="account">
              <el-input v-model="form.account" disabled />
            </el-form-item>
            <el-form-item label="所在地区" prop="area">
              <el-input v-model="form.area" />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getFamilyInfo, updateInfo } from '@/api/user.js'

export default {
  name: 'HomeDia',
  data() {
    return {
      dialogVisible: false,
      form: {
        avatar: '',
        password: '',
        nickname: '',
        familyNumber: Number,
        id: Number,
        account: '',
        area: ''
      },
      rules: {
        nickname: [
          { required: true, message: '家庭名称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '家庭密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    load() {
      getFamilyInfo()
        .then((res) => {
          this.form.avatar = res.data.avatarUrl
          // this.form.password = res.data.password
          // this.form.nickname = res.data.name
          // this.form.familyNumber = res.data.memberCount
          // this.form.id = res.data.id
          // this.form.account = res.data.accountName
          // this.form.area = res.data.area
          console.log(res)
          Object.assign(this.form, res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submit() {
      updateInfo(this.form)
        .then((res) => {
          console.log(res)
          this.dialogVisible = false
          this.$emit('flesh')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleClose() {
      this.dialogVisible = false
      this.$emit('flesh')
    }
  }
}
</script>

<style scoped>
.updateinfo {
  height: 350px;
  overflow: auto;
}
.left {
  float: left;
}
.right {
  overflow: hidden;
}
</style>
