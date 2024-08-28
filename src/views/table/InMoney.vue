<template>
  <div>
    <!--  搜索栏-->
    <el-card>
      <el-col :span="5" class="search-row">
        <!--选择查询的人（身份），多选-->
        <el-select v-model="searchModel.member" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="15">
        <el-date-picker
          v-model="searchModel.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" round icon="el-icon-search" style="margin-left: 20px;">查询</el-button>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-plus" circle />
      </el-col>
    </el-card>
    <!--结果列表-->
    <el-card>
      <el-table
        :data="inList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
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
      searchModel: {},
      inList: []
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
