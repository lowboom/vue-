<template>
  <div id="app">


    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">

      <el-form-item label="活动名称">
        <el-input v-model="inputName" style="width:215px" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="生效时间">
        <div class="block">
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions0"
            :disabled="true">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="失效时间">
        <div class="block">
          <el-date-picker
            v-model="endTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </div>
      </el-form-item>




      <el-form-item label="活动描述">
        <el-input
          type="textarea"
          :rows="4"
          width="550px"
          placeholder="请输入内容"
          v-model="ruleDescription"
          style="margin-bottom: 20px;width: 550px;margin-left: 13px;">
        </el-input>
      </el-form-item>

      <el-form-item>
        <!--<el-button @click="subButton">确定</el-button>-->
        <router-link to="ActivityList">
          <el-button @click="subButton">返回</el-button>
        </router-link>
      </el-form-item>


    </el-form>






  </div>
</template>

<script>
  import index from './index.vue'
  import cash from './cash.vue'
  import raRule from '../../rates/ra-rule.vue'


  export default {
    data() {
    return {
      inputName:'',
      pickerOptions0: {
        disabledDate(time)
    {
      return time.getTime() < Date.now();
    }
  },
  pickerOptions1: {
    shortcuts: [{
      text: '今天',
      onClick(picker) {
      picker.$emit('pick', new Date());
  }
  },
  {
    text: '昨天',
      onClick(picker)
    {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      picker.$emit('pick', date);
    }
  },
  {
    text: '一周前',
      onClick(picker)
    {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', date);
    }
  }
  ]
  },
  pickerOptions2: {
    disabledDate(time)
    {
      return time.getTime() < Date.now();
    }
  },
  startTime:'',
    endTime:'',
    ruleDescription:'',

    // 控制index组件隐藏显示
    OK:false,
    isOK:false,
    options: [{
    value: '选项1',
    num: 1,
    label: '投资券'
  },
    //          {
    //          value: '选项2',
    //          num: 2,
    //          label: '加息券'
    //        },
    {
      value: '选项3',
      num: 3,
      label: '现金'
    },
    //          {
    //          value: '选项4',
    //          num: 4,
    //          label: '实物奖励兑换码'
    //        }
  ],
    value: ''
  }
  },
  created(){
    this.reviseSystem();
  },
  methods: {
    /*重置创建*/
    reset: function(){
      this.ruleDescription = '';
      this.inputName = '';
      this.startTime = '';
      this.endTime = '';
    },

    /* 根据列表填充数据 */

    reviseSystem: function(){
      this.activityId = this.$route.query.id;
      this.inputName = this.$route.query.name;
      this.startTime = this.$route.query.startTime;
    },

    /* 确定修改 */

    subButton:function(){


      var that = this;

      var inquireData = {
        "activityId":this.$route.query.id,
        "name":this.$route.query.name,
        "endTime":this.endTime,
      }

      $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "http://192.168.1.130:8108/activity/updateActivity",
        data : JSON.stringify(inquireData),
        dataType : 'json',
        success : function(result) {

          setTimeout(function(){
            this.$router.push({path: '/ActivityList'})
          },200)

        },
        error : function(e) {
          alert("Error!")
          console.log("ERROR: ", e);
        }
      });


    },

   /* successSub:function(){
      alert(206)
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      });
    },*/

    openPop: function(){
      this.$alert('请填写完整', {
        confirmButtonText: '确定'
      });
    },

  },
  components:　{
    index: index,
      raRule: raRule,
      cash: cash
  }
  }
</script>

<style>



</style>
