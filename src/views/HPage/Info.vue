<template>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="家庭信息" :column="2" border>
        <!--        <template slot="extra">-->
        <!--          <el-button v-if="$route.params.id==$store.state.id" type="primary" size="small">操作</el-button>-->
        <!--        </template>-->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline" />
            家庭头像
          </template>
          <img class="img" :src="avatar" alt="">
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom" />
            家庭名称
          </template>
          {{ nickname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid" />
            家庭成员数量
          </template>
          {{ familyNumber }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-document" />
            家庭编号
          </template>
          {{ id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-claim" />
            家庭账号
          </template>
          {{ account }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location" />
            创建时间
          </template>
          {{ createTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location" />
            预算
          </template>
          {{ budget }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import { getFamilyInfo } from '@/api/user'
// import {data} from "autoprefixer";
export default {
  name: 'Info',
  data() {
    return {
      avatar: '',
      nickname: '',
      familyNumber: 0,
      id: 0,
      account: '',
      createTime: '',
      budget: ''
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      getFamilyInfo().then((res) => {
        this.avatar = res.data.avatarUrl
        this.nickname = res.data.name
        this.familyNumber = res.data.memberCount
        this.id = res.data.id
        this.account = res.data.accountName
        this.createTime = this.formatDate(res.data.createTime)
        // console.log('createTime', this.createTime)
        // this.createTime = (res.data.createTime)
        this.budget = res.data.budget
        // console.log(res)
      }).catch((err) => {
        console.log(err)
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
.img {
  width: 150px;
  height: 110px;
}
</style>
