<template>
  <div>
    <el-dialog
      title="修改家庭信息"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <div class="updateInfo">
          <div class="left">
            <!--            <el-form-item label="家庭头像" prop="avatar">-->
            <!--              <img style="width:150px;height:110px" :src="form.avatar" alt="pic">-->
            <!--            </el-form-item>-->
            <el-form-item label="家庭头像" prop="avatar">
              <div class="avatar-container">
                <img class="avatar-img" :src="form.avatarUrl" alt="pic">
                <div class="avatar-actions">
                  <el-upload
                    class="upload-demo"
                    action=""
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :on-change="handleFileChange"
                  >
                    <el-button size="small" type="primary">上传本地图片</el-button>
                  </el-upload>
                  <el-input
                    v-model="avatarUrlInput"
                    placeholder="或输入图片链接"
                    class="avatar-url-input"
                    @input="handleUrlInput"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="家庭密码" prop="password">
              <el-button @click="clickModifyPassword">修改密码</el-button>
            </el-form-item>
            <el-form-item label="家庭名称" prop="nickname">
              <el-input v-model="form.nickname" />
            </el-form-item>

            <el-form-item label="家庭预算" prop="account">
              <el-input v-model="form.budget" />
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item label="家庭编号" prop="id">
              <el-input v-model="form.id" disabled />
            </el-form-item>
            <el-form-item label="家庭账号" prop="account">
              <el-input v-model="form.accountName" disabled />
            </el-form-item>
            <el-form-item label="家庭成员数量" prop="familyNumber">
              <el-input v-model="form.familyNumber" disabled />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </el-dialog>

    <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="passwordFormVisible">
      <el-form :model="passwordForm">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input
            v-model="passwordForm.oldPassword"
            type="password"
            placeholder="请输入旧密码"
            autocomplete="off"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            autocomplete="off"
            show-password
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="passwordFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getFamilyInfo, updateInfo } from '@/api/family.js'

export default {
  name: 'HomeDia',
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '110px',
      passwordFormVisible: false,
      form: {
        avatarUrl: '',
        password: '',
        nickname: '',
        familyNumber: Number,
        id: Number,
        accountName: '',
        budget: Number
      },
      passwordForm: {
        oldPassword: '',
        newPassword: ''
      },
      rules: {
        nickname: [
          { required: true, message: '家庭名称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '家庭密码不能为空', trigger: 'blur' }
        ]
      },
      avatarUrlInput: '' // 用于保存用户输入的图片链接
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    clickModifyPassword() {
      this.passwordForm = {}
      this.passwordFormVisible = true
    },
    load() {
      getFamilyInfo()
        .then((res) => {
          this.form.avatarUrl = res.data.avatarUrl
          this.form.id = res.data.id
          this.form.accountName = res.data.accountName
          this.form.familyNumber = res.data.memberCount
          // this.form.password = res.data.password
          this.form.nickname = res.data.name
          this.form.budget = res.data.budget
          // this.form.area = res.data.area
          // console.log(res)
          // Object.assign(this.form, res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submit() {
      // 创建包含需要传递的参数的列表
      const params = {
        avatarUrl: this.form.avatarUrl, // 家庭头像链接
        name: this.form.nickname, // 家庭名称
        oldPassword: this.passwordForm.oldPassword, // 旧密码
        password: this.passwordForm.newPassword, // 新密码
        budget: this.form.budget
      }
      // 调用 updateInfo 函数并传入参数列表
      updateInfo(params).then((res) => {
        console.log('res', res)
        this.dialogVisible = false
        this.$emit('flesh')
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.$emit('flesh')
    },
    handleFileChange(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.form.avatarUrl = e.target.result // 将本地文件读取为base64编码的图片
      }
      reader.readAsDataURL(file.raw)
    },
    handleUrlInput() {
      this.form.avatarUrl = this.avatarUrlInput // 当用户输入图片链接时，将其设为头像
    },
    uploadFile() {
      // 上传处理函数，如果需要上传到服务器，可以在这里实现
    }
  }
}
</script>

<style scoped>
.updateInfo {
  height: 350px;
  overflow-x: auto; /* 允许左右滚动 */
  overflow-y: auto; /* 禁止上下滚动 */
  white-space: nowrap; /* 防止内容换行 */
}
.left, .right {
  display: inline-block; /* 使两个部分在同一行显示 */
  vertical-align: top;
}

.el-dialog .el-input {
  width: 85%;
}
.avatar-container {
  display: flex;
  align-items: center;
}
.avatar-img {
  width: 150px;
  height: 110px;
}
.avatar-actions {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.upload-demo {
  margin-bottom: 10px;
}
.avatar-url-input {
  margin-top: 10px;
}
</style>

