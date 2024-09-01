<template>
  <div class="container">
    <div class="HPageTop">
      <div class="Home_avatar">
        <img style="width:150px;height:110px" :src="avatar" alt="pic">
      </div>
      <div class="FamilyTop_text">
        <div class="user_text">
          <div class="user_name">
            <span> {{ nickname }} </span>
          </div>
          <div class="user-v">
            <img src="@/assets/award.svg" class="user-v-img">
            <span class="user-v-font">优质家庭代表</span>
          </div>
          <div class="user_anniu">
            <el-button
              v-if="this.$route.params.id === this.$store.state.id"
              class="el-icon-edit"
              type="primary"
              size="medium"
              plain
              @click="edit"
            >编辑</el-button>
            <!-- 新增返回按钮 -->
            <el-button
              class="el-button-return"
              type="primary"
              size="medium"
              plain
              @click="goBack"
            >返回</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="family_body">
      <div class="family_body_left">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span
              class="family_body_list"
              style="border-bottom: none"
            >家庭中心</span>
          </div>
          <el-menu
            router
            active-text-color="#00c3ff"
            class="el-menu-vertical-demo"
          >
            <el-menu-item
              index="info"
              :route="{ name: 'info', params: $route.params.id }"
            >
              <i class="el-icon-user" />
              <span slot="title">家庭简介</span>
            </el-menu-item>
            <el-menu-item
              index="myarticle"
              :route="{ name: 'memberManage', params: $route.params.id }"
            >
              <i class="el-icon-edit-outline" />
              <span slot="title">成员管理</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </div>
      <div class="family_body_right">
        <router-view />
      </div>
    </div>
    <home-dia ref="dia" @flesh="reload" />
  </div>
</template>

<script>
import { getFamilyInfo } from '@/api/user'
import HomeDia from './HomeDia.vue'

export default {
  name: 'HPage',
  components: {
    HomeDia
  },
  inject: ['reload'],
  data() {
    return {
      avatar: '',
      nickname: ''
      // v: 1
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == `/newsuser/family/${this.$store.state.id}`) {
        this.reload()
      } else if (to.path == `/newsuser/family/${this.$route.params.id}`) {
        this.reload()
      }
    }
  },
  mounted() {
    this.load()
    //  TODO: 加一个钩子直接显示信息
  },
  methods: {
    load() {
      getFamilyInfo()
        .then((res) => {
          this.avatar = res.data.avatarUrl
          this.nickname = res.data.name
        })
        .catch((err) => {
          console.log(err)
        })
    },
    edit() {
      this.$refs.dia.open()
    },
    goBack() {
      this.$router.push('/dashboard') // 返回上一个页面
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #eaeaeb; /* 淡灰色 */
  height: 100%;
  position: relative; /* 添加相对定位，以便返回按钮的绝对定位 */
}

/* 返回按钮位置 */
.el-button-return {
  position: absolute;
  bottom: 20px; /* 距离底部20px */
  right: 20px; /* 距离右侧20px */
}
.HPageTop {
  width: 996px;
  height: 160px;
  padding-top: 20px;
  background-color: white;
  margin-top: 30px;
  margin-bottom: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  border-radius: 5px;
}

.Home_avatar {
  width: 150px;
  height: 120px;
  background-color: #8c939d;
  margin-right: 24px;
  margin-left: 20px;
  overflow: hidden;
  border-radius: 20px;
}

.Home_avatar img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.FamilyTop_text {
  height: 120px;
  width: 880px;
  display: flex;
}

.user_text {
  width: 60%;
  height: 100%;
  line-height: 30px;
}

.user_name {
  font-weight: bold;
  font-size: 24px;
  margin-top: 3px;
  margin-bottom: 7px;
}
.user-v {
  /*margin-bottom: -5px;*/
}
.user-v-img {
  width: 15px;
  height: 15px;
}
.user-v-font {
  font-size: 15px;
  color: #00c3ff;
}

.user_anniu {
  width: 60%;
  height: 30px;
  margin-top: 10px;
}

.user_num {
  display: flex;
  justify-content: space-around;
  margin-right: 30px;
  font-weight: bold;
  cursor: pointer;
}
.num_number {
  text-align: center;
  font-size: 20px;
}

.family_body {
  width: 1000px;
  height: 800px;
  position: absolute;
  top: 210px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.family_body_left {
  width: 30%;
}

.family_body_right {
  width: 67%;
  height: 100%;
  margin-left: 20px;
}

.box-card {
  width: 90%;
}
.family_body_list {
  display: inline-block;
  font-weight: bold;
  width: 100px;
  text-align: center;
  height: 35px;
  line-height: 35px;
  border-bottom: 2px solid #00c3ff;
}
</style>
