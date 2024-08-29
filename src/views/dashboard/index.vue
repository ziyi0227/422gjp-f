<template>
  <div class="dashboard-container">
    <el-card>
      <span>统计数值</span>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <span>收入</span>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <span>支出</span>
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
