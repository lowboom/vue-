
<template>
  <div id="app">
 <el-form ref="form" :model="form" label-width="100px">

  <el-form-item label="活动形式">
    <el-input type="text" v-model="form.desc" style="width:180px"></el-input>
  </el-form-item>

  <el-form-item label="兑换码名称">
    <el-radio-group v-model="form.resource">
      <el-radio label="系统随机"></el-radio>
    </el-radio-group>
    <el-radio-group v-model="form.resource">
      <el-radio label="自定义导入"></el-radio>
    </el-radio-group>
  </el-form-item>
  <div class='bottomI'>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </div>
</el-form>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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

<style>
.bottomI{
  position:absolute;
  left:auto;
  bottom:20px
}
</style>