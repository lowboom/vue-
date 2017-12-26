<template>
  <div>

    <router-link to="/Creat"><el-button>创建奖券</el-button></router-link>
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
        <el-select v-model="value2" placeholder="全部" style="width:100px">
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
        <el-select v-model="activityId" placeholder="全部" style="width:230px; height:10px">
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
        <el-button type="primary" icon="search" @click="inquire">查询</el-button>
      </div>

    </div>

    <!--奖券列表-->
    <div class="tab" v-if="listShow">
        <tabCode :tabDatas="this.dataList"
                 :changeShow="this.changeShow"
                 :subShow="this.subShow"
                 :closeShow="this.closeShow"
                 :overShow="this.overShow"></tabCode>
    </div>



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
    <router-view></router-view>
  </div>
</template>

<script>
/*import selectCode from '../../common/select/select.vue'*/

import tabCode from '../../common/tab/Tabs.vue'
import activityTabCode from '../../common/tab/activityTab.vue'

export default {
        components: {
            tabCode:tabCode
        },
        created(){
            this.getData();
            this.activityNameList1();
        },
         data() {
            return {
              dataList: [

              ],
              pageSize:10,
              pageNumber: 1,
              options: [{
                value: '0',
                label: '全部'
              }, {
                value: '1',
                label: '投资券'
              },
//                {
//                value: '选项3',
//                label: '加息券'
//              },
                {
                value: '2',
                label: '现金'
              },
//                {
//                value: '选项5',
//                label: '实物奖励“兑换码”'
//              }
              ],
              value: '',
              value2:'',
              valueCode:'',
              style:'',
              items: [{
                value: '0',
                label: '全部'
              }, {
                value: '1',
                label: '未开启'
              }, {
                value: '2',
                label: '任务中'
              }, {
                value: '3',
                label: '结束'
              }],
              startTime:'',
              endTime:'',
              changeShow: '',
              subShow: '',
              closeShow: '',
              overShow: '',
              listShow: true,
              activityNameList:[],
              activityId:'',
              dataTotal:'',
            }
         },
          methods: {

            /*获取列表*/
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
/*
                    /!*判断操作一栏中显示那些操作*!/
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
                    }*/



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
              if(this.value == '' && this.style == '' && this.stype == ''){
                this.getData(pageNumber)
              }else{
                this.inquire()
              }
            },
            handleSizeChange:function(pageSize) {
              this.pageSize = pageSize;
              this.getData(pageSize)
            },

            /*查询*/

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
                "couponType": this.value,
                "couponRule": 1,
                "createFromTime": this.startTime,
                "createEndTime": this.endTime,
                'pageNo': this.pageNumber,
                'pageSize': this.pageSize,
                'activityId':this.activityId,
                'activityState':this.valueCode
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
                      queryDataList[i].activityState = "未开启"
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
                  alert("Error!")
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

<style scoped>

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
    min-width:1460px
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
     position: absolute;
     right: 50px;
     top: 26px;
  }
  .tab{
    width:100%
  }
</style>
