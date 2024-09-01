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
            所在地区
          </template>
          {{ area }}
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
      area: ''
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      getFamilyInfo()
        .then((res) => {
          this.avatar = res.data.avatarUrl
          this.nickname = res.data.name
          this.familyNumber = res.data.memberCount
          this.id = res.data.id
          this.account = res.data.accountName
          this.area = res.data.area
          // console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
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
