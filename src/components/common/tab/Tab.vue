<template>

  <div>
    <section>
      <el-table
        :data="tabDatas"
        border
        style="width: 100%"
        >
        <el-table-column
          prop="couponId"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="奖券名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="couponType"
          label="奖券类型">
        </el-table-column>
        <el-table-column
          prop="couponType"
          label="所属活动">
        </el-table-column>
        <el-table-column
          prop="couponState"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="faceValue"
          label="奖券额度">
        </el-table-column>
        <el-table-column
          prop="sendTime"
          label="发送时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="expireDate"
          label="截止时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="usedTime"
          label="使用时间"
          width="150">
        </el-table-column>
        <!--<el-table-column
          prop="enable"
          label="使用获利"
          width="150">
        </el-table-column>-->
        <el-table-column
          prop="purpose"
          label="用途备注"
          width="150">
        </el-table-column>
      </el-table>


    </section>
  </div>
</template>

<style>

</style>


<script>
  import pageCode from '../page/page.vue'


  export default {

    components: {
      pageCode: pageCode
    },
    methods: {
      changeClick: function(row) {
        console.log(row);
      }
    },
    created(){

  },
  data() {
    return {

    }
  },
  props:['tabDatas']
  }
</script>
<style>
  demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .table_container{
    padding: 20px;
  }
  .Pagination{
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
