
<template>
  <div id="app">
      <div class="mhead">
          <el-button><router-link to="excel">发送奖励</router-link> </el-button>
          <el-button> <router-link to="./excel">+ 批量发送</router-link></el-button>
      </div>
     
    
    <div class="middle">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <div class="left">
          <el-form-item label="注册时间">
            <timeCode></timeCode>
          </el-form-item>
          </div>

          <el-form-item label="用户名">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input v-model="formInline.region">
            </el-input>
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
import timeCode from '../../common/time/time.vue'
import Tabs from '../../common/tab/Tabs.vue'
export default {
        components: {
            tableCom: Tabs,
            timeCode:timeCode
        },
         data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
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
.mhead{
  margin-bottom:20px
}
.middle{
    position:relative;
    overflow:hidden;
    background-color:#F2F2F2;
    padding: 0 30px;
    padding-top:25px;
    margin-top: 15px;
    
    margin-bottom:20px;
    min-width:980px
}
.left{
  float:left;
  margin-right:50px
}
.btn{
  position:absolute;
  right:30px
}
</style>