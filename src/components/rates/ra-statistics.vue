
<template>
  <div id="app">
      <router-link to="./rule"><el-button>导出数据</el-button></router-link>

      <div class="rhead">

        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="投资时间">
            <div class="block">
              <el-date-picker
                v-model="value6"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </el-form-item>

          <el-form-item label="手机号码">
            <el-input v-model="formInline.user" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>

    </div>

    <tableCom></tableCom>
  </div>

</template>

<script>
import Tabs from '../common/tab/Tabs.vue'
export default {
        components: {
            tableCom: Tabs
        },
        data() {
      return {
        formInline: {
          user: '',
          region: '',
        },
          value6: ''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }

</script>

<style scope>
.rhead{
    overflow:hidden;
    background-color:#F2F2F2;
    padding: 10px 30px;
    padding-top:25px;
    margin-top: 15px;
    margin-bottom:20px
  }
  .rabtn{
    position:absolute;
    right:30px
  }
</style>
