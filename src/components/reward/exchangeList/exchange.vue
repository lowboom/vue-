
<template>
  <div id="app">
    
    <div>
      <el-button><router-link to="/exCreat">+创建奖券</router-link></el-button>
    </div>
    <div class='head'>

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            
            <el-form-item label="创建时间">
                <div class="block">
                    <el-date-picker
                    v-model="value6"
                    type="daterange"
                    placeholder="选择日期范围" style="width:150px">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                手机号码：
            </el-form-item>
            <el-form-item>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
                奖券类型：
            </el-form-item>
            <el-form-item>
                <typeCode></typeCode>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="state">
             <stateCode></stateCode>
        </div>
    </div>

    <div>
      <tableCom></tableCom>
    </div>

  </div>

</template>

<script>

import Tabs from '../../common/tab/Tabs.vue'
export default {
        components: {
            tableCom: Tabs
        },
        data(){
            return{
                value6:''
            }
        }
}
</script>

<style scope>

.head{
    margin:25px 0;
    padding:0 25px;
    padding-top: 30px;
    background-color:#F2F2F2
}
</style>