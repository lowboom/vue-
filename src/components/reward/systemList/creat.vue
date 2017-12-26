<template>
  <div id="app">

    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">

      <el-form-item label="奖券类型">
        <el-select v-model="typeName" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :num="item.num"
            @click.native="showIndex(item)">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖券名称">
        <el-input v-model="inputName" style="width:215px"></el-input>
      </el-form-item>

      <el-form-item label="所属活动">
        <el-select v-model="activityName" placeholder="请选择">
          <el-option
            v-for="item in activityNameList"
            :key="item.activityId"
            :label="item.name"
            :value="item.activityId">
          </el-option>
        </el-select>
      </el-form-item>


    </el-form>


         <!-- 投资券 -->
        <div v-if = "OK" class="clear">
            <index
              :typeName="this.typeName"
              :inputName="this.inputName"
              :activityName="this.activityName"
              v-on:child-say="listenToMyBoy"
            ></index>
        </div>

        <!-- 现金 -->
        <div v-if = "cashOk" class="clear">
          <cash
            :typeName="this.typeName"
            :inputName="this.inputName"
            :activityName="this.activityName"
            v-on:child-say="listenToMyBoy"
            ></cash>
        </div>


  </div>
</template>

<script>
import index from './index.vue'
import cash from './cash.vue'
import raRule from '../../rates/ra-rule.vue'


export default {


    components:　{
      index: index,
      raRule: raRule,
      cash: cash
    },
    created(){
      this.activityNameList1();
    },
    data() {
      return {
        // 控制index组件隐藏显示
        OK:false,
        isOK:false,
        cashOk:false,
        options: [{
          value: '选项1',
          num: 1,
          label: '投资券'
        },
          {
          value: '选项3',
          num: 3,
          label: '现金'
        },
        ],
        typeName: '',
        inputName:'',
        activityName:'',
        activityNameList:[

        ],

      }
    },
    methods: {
      showIndex:function(item) {
          if(item.num == 1){
            this.OK = true
            this.isOK = false
            this.cashOk = false
          }else if(item.num == 2){
            this.OK = false
            this.isOK = true
            this.cashOk = false
          }else if(item.num == 3){
            this.OK = false
            this.isOK = false
            this.cashOk = true
          }
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
          console.log(dataList +'123')
          that.activityNameList = dataList
        });
      },
      /*投资组件传过来值*/
      listenToMyBoy: function (somedata){
        this.typeName = somedata.typeName;
        alert(somedata.typeName)
        this.inputName = somedata.inputName;
        this.activityName = somedata.activityName;
      },
    },
}
</script>

<style>



</style>
