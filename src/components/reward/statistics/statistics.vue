<template>
  <div>

    <el-button>导出数据</el-button>
    <!--<router-link to="/Creat"><el-button>导出数据</el-button></router-link>-->

    <div class="s-head">
      <div class="stype">
        <span>奖券类型：</span>
        <el-select v-model="value" placeholder="全部" style="width:100px; height:10px">
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </div>
      <div class="stype">
        <span>任务状态：</span>
        <el-select v-model="stype" placeholder="全部" style="width:100px">
          <el-option
            v-for="item in items"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <!-- 所属活动 -->

      <div class="stype" style="margin-left: 60px;">
        <span>所属活动：</span>
        <el-select v-model="activityName" placeholder="全部" style="width:230px; height:10px">
          <el-option
            v-for="item in activityNameList"
            :key="item.activityId"
            :label="item.name"
            :value="item.activityId">
          </el-option>
        </el-select>
      </div>

      <!--时间-->
      <div class="s-time">

        <div class="block">
          <span class="demonstration">创建时间:</span>
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
      <div class="s-btn">
        <el-button type="primary" icon="search" @click="serarch">查询</el-button>
      </div>

      <div style="margin-top: 10px">
        <span class="demonstration">手机号码：</span>
          <el-input v-model="phoneNum" style="width:215px" placeholder="手机号"></el-input>
      </div>

    </div>
    <div class="tab">
      <tabCode :tabDatas="dataList"></tabCode>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next"
        :total="dataTotal">
      </el-pagination>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

  import timeCode from '../../common/time/time.vue'
  import tabCode from '../../common/tab/Tab.vue'
  export default {
    components: {
      timeCode: timeCode,
      tabCode:tabCode
    },
    created(){
      this.getStatisticsData();
      this.activityNameList1();
    },
  data() {
    return {
      dataList: [

      ],
      pageSize:10,
      pageNumber: 1,
      options: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '投资券'
      },
//        {
//        value: '选项3',
//        label: '加息券'
//      },
        {
        value: '选项4',
        label: '现金'
      },
//        {
//        value: '选项5',
//        label: '实物奖励“兑换码”'
//      }
      ],
      items: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '未开启'
      }, {
        value: '选项3',
        label: '任务中'
      }, {
        value: '选项4',
        label: '结束'
      }],
      startTime:'',
      endTime:'',
      value: '',
      activityNameList:[],
      activityName:'',
      dataTotal:'',
      phoneNum:'',
      stype:'',
    }
  },
  methods: {
    getStatisticsData: function(pageSize,pageNumber){
      var that = this;
      var pageN = {
        'pageNo': this.pageNumber,
        'pageSize': this.pageSize,
      }

      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "http://192.168.1.130:8108/activity/user/query",
        data : JSON.stringify(pageN),
        dataType : 'json',
        success : function(result) {

          var dataTotal = result.totalSize
          var dataList = result.data
          for(var i = 0; i < dataList.length; i++){

            if(dataList[i].couponState == 0){
              dataList[i].couponState = "未开启"
            }else if(dataList[i].couponState == 1){
              dataList[i].couponState = "已启用"
            }else if(dataList[i].couponState == 2){
              dataList[i].couponState = "已结束"
            }

            if(dataList[i].auditStatus == 0){
              dataList[i].auditStatus = "待提交"
            }else if(dataList[i].auditStatus == 1){
              dataList[i].auditStatus = "待审核"

            }else if(dataList[i].auditStatus == 2){
              dataList[i].auditStatus = "审核退回"

            }else if(dataList[i].auditStatus == 3){
              dataList[i].auditStatus = "审核通过"

            }else if(dataList[i].auditStatus == 4){
              dataList[i].auditStatus = "审核未通过"

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

            if(dataList[i].expireType == 0){
              dataList[i].expireDate = ''
            }

          }
          that.dataList = dataList
          that.dataTotal = dataTotal
        },
        error : function(e) {
          console.log("ERROR: ", e);
        }
      });
    },
    handleCurrentChange:function(pageNumber) {
      this.pageNumber = pageNumber;
      if(this.value == '' && this.stype == '' && this.phoneNum == '' && this.startTime == '' && this.endTime == ''){
        this.getStatisticsData(pageNumber)
      }else{
        this.search()
      }
    },
    handleSizeChange:function(pageSize) {
      this.pageSize = pageSize;
      this.getStatisticsData(pageSize)
    },

    /* 查询 */

    search: function(){


        if(this.value == '投资券'){
          this.value = 0
        }else{
          this.value = 2
        }

      if(this.stype == '未开启'){
        this.stype = 0
      }else if(this.stype == '任务中'){
        this.stype = 1
      }else{
        this.stype = 2
      }

        var that = this

        var inquireData = {
          "couponType": this.value,
          "couponState": this.stype,
          "createFromTime": this.startTime,
          "createEndTime": this.endTime,
          'mobile':this.phoneNum,
        }

        $.ajax({
          type : "POST",
          contentType : "application/json",
          url : "http://192.168.1.130:8108/activity/user/query",
          data : JSON.stringify(inquireData),
          dataType : 'json',
          success : function(result) {

            var queryDataList = result.data

            for(var i = 0; i < queryDataList.length; i++){

              if(queryDataList[i].couponState == 0){
                queryDataList[i].couponState = "未开启"
              }else if(queryDataList[i].couponState == 1){
                queryDataList[i].couponState = "已启用"
              }else if(queryDataList[i].couponState == 2){
                queryDataList[i].couponState = "已结束"
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
    }
  }
</script>

<style scope>

  .bor{
    border-bottom:10px red
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
  .stype{
    float:left;
    margin-right:50px
  }
  .s-right{
    float:left
  }
  .s-time{
    float:left;
    margin-left:80px

  }
  .s-btn{
    position:absolute;
    top: 27px;
    right:50px
  }
  .tab{
    width:100%
  }
</style>
