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
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="奖券名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="couponType"
          label="奖券类型"
          width="150">
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开启时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="失效时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="auditStatus"
          label="审批状态"
          width="190">
        </el-table-column>
        <el-table-column
          prop="activityStatus"
          label="任务状态"
          width="150">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">>
          <template scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" v-if="changeShow">修改</el-button>
            <el-button
              size="mini"
              @click="subBtn(scope.$index, scope.row)" v-if="subShow">提交审批</el-button>
            <el-button
              size="mini"
              @click="close(scope.$index, scope.row)" v-if="closeShow">关闭</el-button>
            <el-button
              size="mini"
              @click="close(scope.$index, scope.row)" v-if="overShow">--</el-button>
          </template>
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

    data() {
    return {

    }
  },

  components: {
    pageCode: pageCode
  },
  methods: {
    openPop: function(){
      this.$alert('提交审批', {
        confirmButtonText: '确定'
      });
    },
    /*修改*/
    handleEdit: function(row) {
      this.openPop()
    },
    /*提交审批*/
    subBtn: function(row){
      this.openPop()
    },
    /*关闭*/
    close:function(index, rows) {

    },
  },
  created(){

  },
  data() {
    return {

    }
  },
  props:['tabDatas','overShow','changeShow','subShow','closeShow']
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
