<template>
  <div class="dashboard-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <div>
            <el-statistic group-separator="," :precision="0" :value="memberCount" title="家庭人数" />
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-statistic group-separator="," :precision="2" :value="asset" title="家庭净资产">
              <template slot="prefix">
                <i class="el-icon-s-flag" style="color: red" />
              </template>
              <template slot="suffix">
                <i class="el-icon-s-flag" style="color: blue" />
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-statistic group-separator="," :precision="2" :value="totalBalance" title="本月净资产变动">
              <template slot="suffix">
                <i class="el-icon-star-on" style="color:red" />
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row :gutter="20" align="middle">
        <el-col :span="12">
          <el-statistic :value="totalExpense" title="本月总花费" group-separator="," :precision="2">
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: #4CAF50" /> <!-- 柔和的绿色 -->
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: #757575" /> <!-- 中性的灰色 -->
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="12">
          <el-statistic :value="budget" title="月初预算" group-separator="," :precision="2">
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: #FF7043" /> <!-- 柔和的橙色 -->
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: #42A5F5" /> <!-- 柔和的蓝色 -->
            </template>
          </el-statistic>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="24">
          <el-progress
            :percentage="parseFloat(((totalExpense / budget) * 100).toFixed(2))"
            :format="format"
          />
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>收入统计</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="incomeDrawer">分析></el-button>
          </div>
          <div>
            <LineChart />
          </div>
          <div>
            <BingChart />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>支出统计</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="outcomeDrawer">分析></el-button>
            <el-drawer :title="drawerTitle" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
              <!-- 使用带有滚动条的容器包裹评语内容 -->
              <div class="drawerText">
                <el-scrollbar style="height: 100%; margin-outside: 3px">
                  <VueMarkdown v-if="drawerType === 'income'" :source="evalText.incomeText" />
                  <VueMarkdown v-else :source="evalText.outcomeText" />
                </el-scrollbar>
              </div>
            </el-drawer>
          </div>
          <div>
            <LineChartOut />
          </div>
          <div>
            <BingChartOut />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card>
      <div slot="header" class="clearfix">
        <span>统计与分析</span>
      </div>
      <div>
        <el-row>
          <el-col :span="18">
            <AreaChart />
          </el-col>
          <el-col :span="6">
            <span>分析</span>
            <el-divider direction="vertical" />
            <!-- 使用带有滚动条的容器包裹评语内容 -->
            <el-scrollbar style="height: 100%; margin-outside: 3px">
              <VueMarkdown :source="evalText.commend" />
            </el-scrollbar>
          </el-col>
        </el-row>
        <el-divider />
        <el-row :gutter="10">
          <el-col :span="8">
            <NightingaleChart />
          </el-col>
          <el-col :span="8">
            <AccessFrom />
          </el-col>
          <el-col :span="8">
            <CircleAccessFrom />
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '@/views/dashboard/LineChart'
import BingChart from '@/views/dashboard/bingChart'
import BingChartOut from '@/views/dashboard/bingChartOut'
import LineChartOut from '@/views/dashboard/LineChartOut'
import AreaChart from '@/views/dashboard/AreaChart'
import NightingaleChart from '@/views/dashboard/NightingaleChart'
import AccessFrom from '@/views/dashboard/AccessFrom'
import CircleAccessFrom from '@/views/dashboard/CircleAccessFrom'
import VueMarkdown from 'vue-markdown'
import { getDashboardInfo } from '@/api/family'

export default {
  name: 'Dashboard',
  components: {
    LineChart,
    BingChart,
    BingChartOut,
    LineChartOut,
    AreaChart,
    NightingaleChart,
    AccessFrom,
    VueMarkdown,
    CircleAccessFrom
  },
  data() {
    return {
      memberCount: Number,
      asset: Number,
      totalBalance: Number,
      budget: Number,
      totalExpense: Number,
      evalText: {
        assess: '',
        commend: '111测试**粗**',
        incomeText: '**income**',
        outcomeText: '**outcome**'
      },
      drawer: false,
      direction: 'rtl',
      drawerType: '',
      drawerTitle: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.load()
  },
  methods: {
    format(percentage) {
      return percentage >= 100 ? '超预算' : `${percentage}%`
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    outcomeDrawer() {
      this.drawer = true
      this.drawerType = 'outcome'
      this.drawerTitle = '支出分析'
    },
    incomeDrawer() {
      this.drawer = true
      this.drawerType = 'income'
      this.drawerTitle = '收入分析'
    },
    load() {
      getDashboardInfo().then((res) => {
        console.log(res)
        this.memberCount = res.data.memberCount
        this.asset = res.data.asset
        this.totalBalance = res.data.totalBalance
        this.budget = res.data.budget
        this.totalExpense = res.data.totalExpense
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container{
  margin-bottom: 20px;
}
.el-card {
  padding: 20px;
  margin-bottom: 20px;
}
.drawerText{
  margin: 20px;
}
</style>
