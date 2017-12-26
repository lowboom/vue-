<template>

  <div>

    <router-link to="/Activity"><el-button>创建活动</el-button></router-link>
    <!--<router-link to="/ActivityList"><el-button>活动列表</el-button></router-link>
    <router-link to="/InquireActivity"><el-button>查询活动</el-button></router-link>-->
    <div class="s-head">



      <!--时间-->
        <div class="s-time">

          <div class="block">
            <span class="demonstration">创建时间</span>
            <el-date-picker
              v-model="startTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>

        </div>



        <div class="block">
          <span class="demonstration">——</span>
          <el-date-picker
            v-model="endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>

      <!-- 活动状态 -->

      <div class="stype">
        <el-form  label-width="80px">
          <el-form-item label="活动状态:">
            <el-select v-model="activityState" placeholder="全部" style="width:100px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <!-- 活动名称 -->

      <div class="stype" style="margin-right: 100px">
        <el-form  label-width="80px">
          <el-form-item label="活动名称:">
            <el-input v-model="activityName"></el-input>
          </el-form-item>
        </el-form>
      </div>




      <div class="s-btn">
        <el-button type="primary" icon="search" @click="inquire">查询</el-button>
      </div>

    </div>

    <section>
      <el-table
        :data="dataList"
        border
        style="width: 100%"
        >
        <el-table-column
          prop="activityId"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="活动名称"
          min-width="200">
          <template scope="scope">
            <span   @click="particulars(scope.$index, scope.row)" style="width:100% ;display:block;"><a href="javascript:;">{{ scope.row.name }}</a></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="230">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="生效时间"
          min-width="230">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="失效时间"
          min-width="230">
        </el-table-column>
        <el-table-column
          prop="activityState"
          label="活动状态"
          min-width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="200">>
          <template scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.activityState==='未开启'"><a href="javaScript:;">修改</a></el-button>

            <el-button
              size="mini"
              @click="close(scope.$index, scope.row)" v-if="scope.row.activityState==='任务中'"><a href="javaScript:;">关闭</a></el-button>

            <el-button
              size="mini"
              @click="close(scope.$index, scope.row)" v-if="scope.row.activityState==='结束'"><a href="javaScript:;">--</a></el-button>

          </template>
        </el-table-column>


        <!-- 修改弹窗 -->


      </el-table>
    </section>

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

</template>

<style>

</style>


<script>

  import timeCode from '../../common/time/time.vue'

  export default {

    created(){
      this.activityList();
    },
    data() {
      return {
        dataList:[

        ],
        changeShow:false,
        closeShow:false,
        noneShow:false,
        timeValue:'',
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '未开启'
        },
          {
            value: '选项3',
            label: '任务中'
          },{
            value: '选项4',
            label: '结束'
          },
        ],
        pageSize:10,
        pageNumber: 1,
        activityName:'',
        startTime:'',
        endTime:'',
        activityState:'',
        dataTotal:'',
      }
    },
    methods: {
      openPop: function(){
        this.$alert('提交审批', {
          confirmButtonText: '确定'
        });
      },

      /*修改*/
      handleEdit: function(index,row) {
        console.log(row.activityState)
        this.activityId = row.activityId
        this.name = row.name
        this.startTime = row.startTime

        this.$router.push({path: '/activityRevise', query: {id: this.activityId,name:this.name,startTime:this.startTime}})
      },

      /*详情*/
      particulars: function(index,row) {
        this.activityId = row.activityId
        this.name = row.name
        this.startTime = row.startTime
        this.endTime = row.endTime
        this.$router.push({path: '/activitParticulars', query: {id: this.activityId,name:this.name,startTime:this.startTime,endTime:this.endTime}})
      },
      /*活动查询*/
      inquire: function(){
        var that = this;

        var auditStateCode = '';
        var activityStateCode = '';


        if(this.activityState == '选项1'){
          this.activityStateCode = '';
        }else if(this.activityState == '选项2'){
          this.activityStateCode = 0;
        }else if(this.activityState == '选项3'){
          this.activityStateCode = 1;
        }else if(this.activityState == '选项4'){
          this.activityStateCode = 2;
        }


        var inquireActivityData = {
          "name":this.activityName,
          "activityState": this.activityStateCode,
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


            for(var i = 0; i < queryDataList.length; i++){

              if(queryDataList[i].activityState == 0){
                queryDataList[i].activityState = "未启"
              }else if(queryDataList[i].activityState == 1){
                queryDataList[i].activityState = "已启用"
              }else if(queryDataList[i].activityState == 2){
                queryDataList[i].activityState = "已结束"
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
      /*关闭*/
      close:function(index, rows) {
        var inquireActivityData = {
          "activityId": this.activityId
        }

        $.ajax({
          type : "POST",
          contentType : "application/json",
          url : "http://192.168.1.130:8108/activity/close",
          data : JSON.stringify(inquireActivityData),
          dataType : 'json',
          success : function(result) {

          },
          error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
          }
        });
      },

      /*活动列表*/

      activityList:function( pageNumber, pageSize){
        var that = this;
        var pageN = {
          'pageNo': pageNumber,
          'pageSize': pageSize,
        }
        var settings = {
          "async": true,
          "url": "http://192.168.1.130:8108/activity/list?pageNo="+this.pageNumber+"&pageSize="+this.pageSize,
          "method": "GET",
          "headers": {
            "cache-control": "no-cache"
          }
        }
        $.ajax(settings).done(function (response) {
          var dataTotal = response.totalSize
          var dataList = response.data
          console.log(response)

          for(var i = 0; i < dataList.length; i++){



/*
            if(dataList[i].activityState == "0"){
              that.changeShow = true
              that.closeShow = false
              that.noneShow = false

            }else if(dataList[i].activityState == "1"){
              that.changeShow = false
              that.closeShow = true
              that.noneShow = false
            }else if(dataList[i].activityState == "2"){
              that.changeShow = false
              that.closeShow = false
              that.noneShow = true
            }*/

            if(dataList[i].activityState == 0){
              dataList[i].activityState = "未开启"
            }else if(dataList[i].activityState == 1){
              dataList[i].activityState = "任务中"
            }else if(dataList[i].activityState == 2){
              dataList[i].activityState = "结束"
            }

            /*判断操作一栏中显示那些操作*/
          }
          that.dataList = dataList
          that.dataTotal = dataTotal
        });



      },
      /*分页*/
      handleCurrentChange:function(pageNumber) {
        this.pageNumber = pageNumber;
        this.activityList(pageNumber)
      },
      handleSizeChange:function(pageSize) {
        this.pageSize = pageSize;
        this.activityList(pageSize)
      },

    },
  }
</script>
<style scoped>
  demo-table-expand {
    font-size: 0;
  }

  .s-head{
    position:relative;
    overflow:hidden;
    background-color:#F2F2F2;
    padding: 25px 30px;
    margin-top: 20px;

    margin-bottom:20px;
    min-width:1550px
  }

  .stype{
    float: right;
    margin-right: 437px;
    margin-top: -34px;
  }
  .s-time{
    float:left;
    margin-left:-8px

  }
  .s-btn{
    position: absolute;
    right: 50px;
    top: 26px;
  }
  .tab{
    width:100%
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

  .time{
    margin-left: -87px;
    margin-right: 30px;
  }
</style>
