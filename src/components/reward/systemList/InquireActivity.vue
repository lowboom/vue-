<template>

  <div>
    <section>
      <el-table
        :data="dataList"
        border
        style="width: 100%"
        >
        <el-table-column
          prop="activityId"
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

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </div>

  </div>

</template>

<style>

</style>


<script>

export default {

    created(){
      this.inquireActivity();
    },
    data() {
      return {
        dataList:[

        ],

        pageSize:10,
        pageNumber: 1,
      }
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

      /*查询活动*/

      inquireActivity: function(){
        var that = this

        var inquireActivityData = {
          "auditState": 0,
          "activityState": 0,
          'pageNo': this.pageNumber,
          'pageSize': this.pageSize,
        }

        $.ajax({
          type : "POST",
          contentType : "application/json",
          url : "http://192.168.1.130:8108/activity/query",
          data : JSON.stringify(inquireActivityData),
          dataType : 'json',
          success : function(result) {
            var queryDataList = result.data

            console.log(queryDataList)

            for(var i = 0; i < queryDataList.length; i++){

              if(queryDataList[i].activityStatus == 0){
                queryDataList[i].activityStatus = "未启"
              }else if(queryDataList[i].activityStatus == 1){
                queryDataList[i].activityStatus = "已启用"
              }else if(queryDataList[i].activityStatus == 2){
                queryDataList[i].activityStatus = "已结束"
              }

              if(queryDataList[i].auditStatus = 0){
                queryDataList[i].auditStatus = "待提交"
              }else if(queryDataList[i].auditStatus = 1){
                queryDataList[i].auditStatus = "待审核"

              }else if(queryDataList[i].auditStatus = 2){
                queryDataList[i].auditStatus = "审核退回"

              }else if(queryDataList[i].auditStatus = 3){
                queryDataList[i].auditStatus = "审核通过"

              }else if(queryDataList[i].auditStatus = 4){
                queryDataList[i].auditStatus = "审核未通过"

              }

              if(queryDataList[i].couponType = 0){
                queryDataList[i].couponType = "投资券"
              }else if(queryDataList[i].couponType = 1){
                queryDataList[i].couponType = "加息券"
              }else if(queryDataList[i].couponType = 2){
                queryDataList[i].couponType = "现金券"
              }else if(queryDataList[i].updateTime = 3){
                queryDataList[i].couponType = "兑换码"
              }

            }
            that.dataList = queryDataList
          },
          error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
          }
        });

      },
      /*分页*/
      handleCurrentChange:function(pageNumber) {
        this.pageNumber = pageNumber;
        this.inquireActivity(pageNumber)
      },
      handleSizeChange:function(pageSize) {
        this.pageSize = pageSize;
        this.inquireActivity(pageSize)
      },

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
