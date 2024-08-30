<template>
  <div class="dashboard-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <div>
            <el-statistic
              group-separator=","
              :precision="0"
              :value="memberNumber"
              title="家庭人数"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="totalMoney"
              title="家庭净资产"
            >
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
            <el-statistic
              group-separator=","
              :precision="2"
              :value="increaseMoney"
              title="本月净资产变动"
            >
              <template slot="suffix">
                <i
                  class="el-icon-star-on"
                  style="color:red"
                />
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>收入统计</span>
            <el-button style="float: right; padding: 3px 0" type="text">分析></el-button>
          </div>
          <div>
            <LineChart></LineChart>
          </div>
          <div>
            <BingChart></BingChart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>支出统计</span>
            <el-button style="float: right; padding: 3px 0" type="text">分析></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card>
      <span>统计与分析</span>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '@/views/dashboard/LineChart'
import BingChart from '@/views/dashboard/bingChart'

export default {
  name: 'Dashboard',
  components: {
    LineChart,
    BingChart
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      memberNumber: 5,
      totalMoney: 120000.00,
      increaseMoney: 5000
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
.dashboard-container .el-card{
  margin-bottom: 20px;
}
</style>
