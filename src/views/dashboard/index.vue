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
                <i class="el-icon-s-flag" style="color: red"></i>
              </template>
              <template slot="suffix">
                <i class="el-icon-s-flag" style="color: blue"></i>
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
                ></i>
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
            <span>月度收入统计线性</span>
          </div>
          <div>
            <span>收入类别统计圆饼</span>
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

export default {
  name: 'Dashboard',
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
