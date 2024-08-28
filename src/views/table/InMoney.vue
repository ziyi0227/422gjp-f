<template>
  <div>
    <!--  搜索栏-->
    <el-card>
      <el-col :span="5" class="search-row">
        <!--选择查询的人（身份），多选-->
        <el-select v-model="searchmodel" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="searchmodel"
          type="date"
          style="margin-left: 10px"
          placeholder="选择日期">
        </el-date-picker>
      </el-col>
      <el-col :span="1">
        <span>~</span>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="searchmodel"
          type="date"
          placeholder="选择日期"
          style="margin-left: -20px">
        </el-date-picker>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" round icon="el-icon-search" style="margin-left: 20px;">查询</el-button>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-plus" circle></el-button>
      </el-col>
    </el-card>
    <!--结果列表-->
    <el-card>
      xxx
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'InMoney',
  data() {
    return {
      options: [{
        value: '选项1',
        label: '父亲'
      }, {
        value: '选项2',
        label: '母亲'
      }, {
        value: '选项3',
        label: '儿子'
      }, {
        value: '选项4',
        label: '女儿'
      }],
      searchmodel: []
    }
  }
}
</script>

<style scoped>
.search-row{
  margin-bottom: 15px;
}
.el-card{
  margin-bottom: 10px;
}
</style>
