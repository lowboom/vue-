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
      label="ID">
    </el-table-column>
    <el-table-column
      prop="name"
      label="奖券名称"
      min-width="200"
      >

      <template scope="scope">
        <span   @click="particulars(scope.$index, scope.row)" style="width:100% ;display:block;"><a href="javascript:;">{{ scope.row.name }}</a></span>
      </template>

    </el-table-column>
    <el-table-column
      prop="faceValue"
      label="额度">
    </el-table-column>
    <el-table-column
      prop="couponType"
      label="奖券类型">
    </el-table-column>
    <el-table-column
      prop="source"
      label="所属活动"
      min-width="200">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      min-width="200">
    </el-table-column>

    <el-table-column
      prop="auditState"
      label="审批状态"
      min-width="200">
    </el-table-column>
    <el-table-column
      prop="activityState"
      label="奖券状态"
      min-width="200">
    </el-table-column>
    <el-table-column
      label="操作"
      min-width="200">>
        <template scope="scope">


            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" v-if="(scope.row.auditState ==='待提交'&&scope.row.activityState ==='已启用')||(scope.row.auditState ==='待审批'&&scope.row.activityState ==='未开启')||(scope.row.auditState ==='审核退回'&&scope.row.activityState ==='未开启')||(scope.row.auditState ==='审核通过'&&scope.row.activityState ==='未开启')">修改</el-button>

          <el-button
            size="mini"
            @click="subBtn(scope.$index, scope.row)" v-if="(scope.row.auditState ==='待提交'&&scope.row.activityState ==='已启用')||(scope.row.auditState ==='审核退回'&&scope.row.activityState ==='未开启')">提交审批</el-button>
            <!--@click="subBtn(scope.$index, scope.row)" v-if="subShow">提交审批</el-button>-->
          <el-button
            size="mini"
            @click="close(scope.$index, scope.row)" v-if="(scope.row.auditState ==='审核通过'&&scope.row.activityState ==='已启用')">关闭</el-button>
            <!--@click="close(scope.$index, scope.row)" v-if="closeShow">关闭</el-button>-->

          <el-button
            size="mini"
            @click="subBtn(scope.$index, scope.row)" v-if="(scope.row.auditState ==='待提交'&&scope.row.activityState ==='未开启')">提交</el-button>

        </template>
    </el-table-column>

  </el-table>


    <el-dialog title="提交审批" v-model="dialogFormVisible">
      <!--<el-form :model="form">
        <el-form-item label="审批人：">
          <el-select v-model="person" placeholder="&#45;&#45;请选择审批人&#45;&#45;">
            <el-option label="姓名一" value="shanghai"></el-option>
            <el-option label="姓名二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>-->
      请确定提交审核

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>


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
        goCouponId:'',
        dialogFormVisible: false,
        person:{},
        row:{},
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
      handleEdit: function(index,row) {
        this.goCouponId = row.couponId
        this.$router.push({path: '/reviseSystem', query: {id: this.goCouponId}})
      },

      /*详情*/
      particulars: function(index,row) {
        console.log(row+'121')
        this.goCouponId = row.couponId
        this.$router.push({path: '/particularsSystem', query: {id: this.goCouponId}})
      },

      /*提交审批*/
      subBtn: function(index,row){
        this.dialogFormVisible = true;
        this.row = row
      },

      /*确定提交*/

      submit:function(){
        var that = this;

        var formData = {
          "couponId": this.row.couponId,
          /*"auditUserId":this.*/
        }

        $.ajax({
          type : "POST",
          contentType : "application/json",
          url : "http://192.168.1.130:8108/activity/coupon/submitAudit",
          data : JSON.stringify(formData),
          dataType : 'json',

          success : function(result) {

            that.dialogFormVisible = false;

          },
          error : function(e) {
            console.log("ERROR: ", e);
          }
        });

      },

      /*关闭*/
      close:function(index, rows) {


      },
    },
    created(){

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
