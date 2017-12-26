// 点击发送，弹出confirm，确定的话跳到show.vue


<template>

  <div>
  
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
    <el-form-item>
      以下是导入的用户数据，是否确认发送
      <el-button type="primary" @click="submitForm('numberValidateForm')">确认发送</el-button>
      <el-button @click="resetForm('numberValidateForm')">返回</el-button>
    </el-form-item>
  </el-form>
  <tableCode></tableCode>
  
  </div>
  
</template>

<script>
import tableCode from '../../common/tab/Tabs.vue'
export default {
        components: {
            tableCode: tableCode
        },
         data() {
      return {
        
      };
    },
    methods: {
     
    }
}
</script>

<style>
</style>
