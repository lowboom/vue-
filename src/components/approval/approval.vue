
<template>
  <div id="app">
    <div class="ahead">
       <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批类型">
                <el-select v-model="value1" placeholder="--请选择--" style="width:150px">
                <el-option
                           v-for="option in options"
                           :key="option.value"
                           :label="option.label"
                           :value="option.value"
                  ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审批状态">
                <el-select v-model="value2" placeholder="--请选择--" style="width:150px">
                <el-option v-for="item in items"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
                </el-select>
            </el-form-item>

         <!-- 所属活动 -->


         <el-form-item label="所属活动">
           <el-select v-model="activityId" placeholder="全部" style="width:210px; height:10px">
             <el-option
               v-for="item in activityNameList"
               :key="item.activityId"
               :label="item.name"
               :value="item.activityId">
             </el-option>
           </el-select>
         </el-form-item>


         <div class="s-btn">
           <el-button type="primary" icon="search" @click="inquire">查询</el-button>
         </div>
        </el-form>

      <el-table
        :data="dataList"
        border
        style="width: 100%"
        >
        <el-table-column
          prop="couponId"
          label="ID"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="奖券名称"
          min-width="150"
          >
        </el-table-column>
        <el-table-column
          prop="couponType"
          label="奖券类型"
          >
        </el-table-column>
        <el-table-column
          prop="activityName"
          label="所属活动"
          min-width="160"
          >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="150"
          >
        </el-table-column>
        <!--<el-table-column
          prop="createTime"
          label="开启时间"
          width="210">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="失效时间"
          width="210">
        </el-table-column>-->

        <el-table-column
          prop="auditState"
          label="审批状态"
          >
        </el-table-column>
        <el-table-column
          prop="activityState"
          label="奖券状态"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="150"
          >
          <template scope="scope">


            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看</el-button>

            <el-button
              size="mini"
              @click="open(scope.$index, scope.row)" >通过</el-button>
            <!--@click="subBtn(scope.$index, scope.row)" v-if="subShow">提交审批</el-button>-->
            <el-button
              size="mini"
              @click="close(scope.$index, dataList)">驳回</el-button>
            <!--@click="close(scope.$index, scope.row)" v-if="closeShow">关闭</el-button>-->
          </template>
        </el-table-column>

      </el-table>


      <el-dialog title="奖券详细信息" v-model="dialogFormVisible">
        <!--<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="奖券ID">
            <el-input v-model="ID" style="width:215px" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="奖券名称">
            <el-input v-model="name" style="width:215px" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="奖券类型">
            <el-input v-model="style" style="width:215px" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所属活动">
            <el-input v-model="activity" style="width:215px" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="time" style="width:215px" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-input v-model="statue" style="width:215px" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="奖券状态">
            <el-input v-model="state" style="width:215px" :disabled="true"></el-input>
          </el-form-item>
        </el-form>-->
        <el-form ref="form" :model="form" label-width="80px" class="wrape">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">

            <el-form-item label="奖券类型">
              <el-input v-model="typeName" style="width:215px" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="奖券名称">
              <el-input v-model="inputName" style="width:215px" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="所属活动">
              <el-input v-model="activityName" style="width:215px" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="奖券额度">
              <el-input v-model="inputLimit" style="width:215px" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="发放数量">
              <el-input v-model="inputNumber" style="width:215px" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="奖券来源">
              <el-input v-model="inputSource" style="width:215px" :disabled="true"></el-input>
              <!--<el-input v-model="formLabelAlign.type"></el-input>-->
            </el-form-item>
          </el-form>


          <el-form-item label="发放规则">
            <el-input v-model="couponRule" style="width:215px" :disabled="true"></el-input>
          </el-form-item>

          <div class="sendAmountWrap">
            <el-form-item label="数量限制">
              <el-input v-model="sendAmount" style="width:215px" :disabled="true"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="过期设置">
            <el-input v-model="expireType" style="width:215px" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="发放时间">
            <el-input v-model="provideTime" style="width:215px" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="奖券用途备注">
            <el-input type="textarea" v-model="purpose" :disabled="true" style="width:215px;height:100px;"></el-input>
          </el-form-item>


          <el-form-item>
              <el-button @click="dialogFormVisible = false">返回</el-button>
          </el-form-item>
        </el-form>


      </el-dialog>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNumber"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next"
          :total="dataTotal">
        </el-pagination>
      </div>

    </div>

  </div>

</template>

<script>
  import axios from 'axios'

export default {

    data() {
      return {
        activityNameList:[],
        activityId:'',
        pageSize:10,
        pageNumber: 1,
        dataTotal:'',
        dialogFormVisible:false,
        typeName:'',
        inputName:'',
        activityName:'',
        inputLimit:'',
        inputNumber:'',
        inputSource:'',
        couponRule:'111',
        sendAmount:'',
        expireType:'',
        provideTime:'',
        purpose:'',
        id:'',
        formInline: {
          user: '',
          region: ''
        },
         options: [{
          value: '奖券审批',
          label: '奖券审批'
        }, ],
        items: [{
          value: '待审批',
          label: '待审批'
        }, {
          value: '通过',
          label: '通过'
        }, {
          value: '驳回',
          label: '驳回'
        }, ],
        value1:'',
        value2:'',
        valueCode:'',
        dataList: [
          {}
        ]

      }
    },
  created(){
    this.getData();
    this.activityNameList1();
  },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getData: function( pageNumber, pageSize){
        var that = this;

        var pageN = {
          'pageNo': pageNumber,
          'pageSize': pageSize,
        }
        var settings = {
          "async": true,
          "url": "http://192.168.1.130:8108/activity/coupon/list?pageNo="+this.pageNumber+"&pageSize="+this.pageSize,
          "method": "GET",
          "headers": {
            "cache-control": "no-cache"
          }
        }
        $.ajax(settings).done(function (response) {


          var dataTotal = response.totalSize
          var dataList = response.data

          for(var i = 0; i < dataList.length; i++){

            if(dataList[i].activityState == 0){
              dataList[i].activityState = "未开启"
            }else if(dataList[i].activityState == 1){
              dataList[i].activityState = "任务中"
            }else if(dataList[i].activityState == 2){
              dataList[i].activityState = "结束"
            }

            if(dataList[i].auditState == 0){
              dataList[i].auditState = "待提交"
            }else if(dataList[i].auditState == 1){
              dataList[i].auditState = "待审核"

            }else if(dataList[i].auditState == 2){
              dataList[i].auditState = "审核退回"

            }else if(dataList[i].auditState == 3){
              dataList[i].auditState = "通过"

            }else if(dataList[i].auditState == 4){
              dataList[i].auditState = "未通过"

            }

            /*判断操作一栏中显示那些操作*/
            if(dataList[i].auditState == "待提交" && dataList[i].activityState == "任务中"){
              that.changeShow = true,
                that.subShow = true,
                console.log( this.subShow )
            } else if(dataList[i].auditState == "通过" && dataList[i].activityState == "任务中"){
              that.closeShow = true
            } else if(dataList[i].auditState == "待审批" && dataList[i].activityState == "未开启"){
              that.overShow = true,
                that.changeShow = true
              console.log( that.changeShow )
            } else if(dataList[i].auditState == "未通过" && dataList[i].activityState == "未开启"){
              that.changeShow = true,
                that.subShow = true
            } else if(dataList[i].auditState == "通过" && dataList[i].activityState == "未开启"){
              that.changeShow = true
            } else if(dataList[i].auditState == "通过" && dataList[i].activityState == "结束"){
              that.overShow = true
            }



            if(dataList[i].couponType == 0){
              dataList[i].couponType = "投资券"
            }else if(dataList[i].couponType == 1){
              dataList[i].couponType = "加息券"
            }else if(dataList[i].couponType == 2){
              dataList[i].couponType = "现金券"
            }else if(dataList[i].updateTime == 3){
              dataList[i].couponType = "兑换码"
            }

          }
          that.dataList = dataList
          that.dataTotal = dataTotal
        });



      },

      /*分页*/
      handleCurrentChange:function(pageNumber) {
        this.pageNumber = pageNumber;

        if(this.value2 == '' && this.activityId == ''){
          this.getData(pageNumber)
        }else{
          this.inquire()
        }


      },
      handleSizeChange:function(pageSize) {
        this.pageSize = pageSize;
        this.getData(pageSize)
      },

      /*查看*/

      handleEdit:function(index,row){
        var that = this;
        this.dialogFormVisible = true;
        this.id = row.couponId;
        var settings = {
          "async": true,
          "url": "http://192.168.1.130:8108/activity/coupon/getCouponById?id="+this.id,
          "method": "GET",
          "headers": {
            "cache-control": "no-cache"
          }
        }
        $.ajax(settings).done(function (response) {
          console.log(response)

          var response = response.data

            that.typeName = response.couponType
            that.inputName = response.name
            that.activityName = response.activityId
            that.inputLimit = response.faceValue
            that.inputNumber = response.sendAmount
            that.inputSource = response.source
            that.purpose = response.Description
            that.couponRule = response.couponRule
            that.sendAmount = response.couponTotal
            that.expireType = response.expireType
              that.provideTime = response.createTime

            if(response.couponRule == ''){
              that.sendAmount = '无限制'
            }else{
              that.sendAmount = response.couponRule
            }

            if(response.couponRule == 0){
              that.couponRule = '注册'
            }else{
              that.couponRule = '投资'
            }

              if(response.expireType == 0){
              that.expireType = '永不过期'
            }else if(response.expireType == 1){
              that.expireType = '有效天数' + response.expireDays
            }else if(response.expireType == 2){
                that.expireType = '有效期截止' + response.expireDate
              }




        })

      },

      /* 通过 */
      open:function(index,row) {

        var that = this

        var formData = {
          "couponId": row.couponId,
          "auditState": 3
        }
        this.$confirm('是否确定通过审核?', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "http://192.168.1.130:8108/activity/coupon/audit",
            data : JSON.stringify(formData),
            dataType : 'json',

            success : function(result) {
              that.getData()

            },
            error : function(e) {
              alert("Error!")
              console.log("ERROR: ", e);
            }
          });
          this.$message({
            type: 'success',
            message: '审核通过!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          });
        });
      },

      /* 驳回 */
      close:function(index,row){

        var that = this

        var formData = {
          "couponId": row.couponId,
          "auditState": 2
        }
        this.$confirm('是否确定驳回?', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "http://192.168.1.130:8108/activity/coupon/audit",
            data : JSON.stringify(formData),
            dataType : 'json',

            success : function(result) {
              that.getData()

            },
            error : function(e) {
              alert("Error!")
              console.log("ERROR: ", e);
            }
          });
          this.$message({
            type: 'success',
            message: '驳回!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消驳回'
          });
        });
      },

      /* 查询 */
      inquire: function() {

        if(this.value2 == '待审批'){
          this.valueCode = 0
        }else if(this.value2 == '通过'){
          this.valueCode = 1
        }else if(this.value2 == '驳回'){
          this.valueCode = 2
        }


        var that = this
        var inquireData = {
          "couponType": this.options.lable,
          "couponRule": 1,
          "createFromTime": this.startTime,
          "createEndTime": this.endTime,
          'pageNo': this.pageNumber,
          'pageSize': this.pageSize,
          'activityId':this.activityId,
          'auditState':this.valueCode
        }

        $.ajax({
          type : "POST",
          contentType : "application/json",
          url : "http://192.168.1.130:8108/activity/coupon/query",
          data : JSON.stringify(inquireData),
          dataType : 'json',
          success : function(result) {

            var dataTotal = result.totalSize
            var queryDataList = result.data

            for(var i = 0; i < queryDataList.length; i++){

              if(queryDataList[i].activityState == 0){
                queryDataList[i].activityState = "未启"
              }else if(queryDataList[i].activityState == 1){
                queryDataList[i].activityState = "已启用"
              }else if(queryDataList[i].activityState == 2){
                queryDataList[i].activityState = "已结束"
              }

              if(queryDataList[i].auditState = 0){
                queryDataList[i].auditState = "待提交"
              }else if(queryDataList[i].auditState = 1){
                queryDataList[i].auditState = "待审核"

              }else if(queryDataList[i].auditState = 2){
                queryDataList[i].auditState = "审核退回"

              }else if(queryDataList[i].auditState = 3){
                queryDataList[i].auditState = "审核通过"

              }else if(queryDataList[i].auditState = 4){
                queryDataList[i].auditState = "审核未通过"

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
            that.dataTotal = dataTotal
          },
          error : function(e) {
            alert("Error448!")
            console.log("ERROR: ", e);
          }
        });
      },

      /* 加载活动名称 */

      activityNameList1:function(){
        var that = this;
        var settings = {
          "async": true,
          "url": "http://192.168.1.130:8108/activity/getActivities",
          "method": "GET",
          "headers": {
            "cache-control": "no-cache"
          }
        }
        $.ajax(settings).done(function (response) {
          var dataList = response.data
          that.activityNameList = dataList
        });
      },
    },
}
</script>

<style scoped>

.ahead{
    background-color:#F2F2F2;
    padding: 0 30px;
    padding-top:20px;
    margin-top: 15px;
    margin-bottom:20px;
    position:relative;
    overflow:hidden;
    background-color:#F2F2F2;
    padding: 25px 30px;
    margin-top: 20px;

    margin-bottom:20px;
    min-width:1220px
}
.s-btn{
  position: absolute;
  right: 50px;
  top: 26px;
}
.s-head{
  position:relative;
  overflow:hidden;
  background-color:#F2F2F2;
  padding: 25px 30px;
  margin-top: 20px;

  margin-bottom:20px;
  min-width:1220px
}


</style>
