
<template>
  <div id="app">
    <div>

      <el-form ref="form" :model="form" label-width="80px" class="wrape">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="奖券额度">
            <el-input v-model="inputLimit" style="width:215px"></el-input>
          </el-form-item>
          <el-form-item label="发放数量">
            <el-input v-model="inputNumber" style="width:215px"></el-input>
          </el-form-item>
          <el-form-item label="奖券来源">
            <el-input v-model="inputSource" style="width:215px"></el-input>
            <!--<el-input v-model="formLabelAlign.type"></el-input>-->
          </el-form-item>
        </el-form>


        <el-form-item label="发放规则">
          <div class="clear">

            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <div class="left">

                <el-radio-group v-model="couponRule">
                  <el-radio :label="1">注册</el-radio>
                  <el-radio :label="2">投资</el-radio>
                  <!--<el-radio :label="2">邀请码注册</el-radio>
                  <div><el-radio :label="3">认证绑卡</el-radio></div>
                  <div><el-radio :label="4" @click.native="showModel">首投</el-radio></div>
                  <div><el-radio :label="5">充值</el-radio></div>
                  <div><el-radio :label="6">投资</el-radio></div>
                  <div><el-radio :label="7">单笔满标</el-radio></div>
                  <div><el-radio :label="8">标的单笔投资额度最大</el-radio></div>
                  <div><el-radio :label="9">标的第一笔投资</el-radio></div>
                  <div><el-radio :label="10">标的最后一笔投资</el-radio></div>
                  <div><el-radio :label="11">老用户登录</el-radio></div>
                  <div><el-radio :label="12">生日当天</el-radio></div>
                  <div><el-radio :label="13">用户召回</el-radio></div>
                  <div><el-radio :label="14">投资到期</el-radio></div>-->
                </el-radio-group>

              </div>

              <div class="right" v-if="isShow">
                <el-form-item>
                  <el-input v-model="input1" style="width:100px"></el-input>
                </el-form-item>
                <el-form-item>
                  ≤ 首投金额（元） ≤
                </el-form-item>
                <el-form-item>
                  <el-input v-model="input2" style="width:100px"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-form-item>
                    <el-input v-model="input3" style="width:100px"></el-input>
                  </el-form-item>
                  <el-form-item>
                    ≤ 首投金额（元） ≤
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="input" style="width:100px"></el-input>
                  </el-form-item>
                </el-form-item>
              </div>

            </el-form>

          </div>

        </el-form-item>

        <div class="sendAmountWrap">
          <el-form-item label="数量限制">
            <el-radio-group v-model="sendAmount" @change="sendAmountShow">
              <el-radio class="radio" label="1">无</el-radio>
              <el-radio class="radio" label="2">限制
                <el-input v-model="sendAmountInput" max="10" v-if="sendAmountShowN"></el-input><span v-if="sendAmountShowN">个</span></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <el-form-item label="过期设置">
          <el-radio-group v-model="expireType" @change="changeShow">

          <el-radio class="radio"  label="0">永不过期</el-radio>
          <div class="timeStartInput">
            <el-radio class="radio" label="1">有效期 <span class="timeStart" v-if="timestartShow1">自生成之日起</span><el-input v-model="input" max="10" v-if="timestartShow1"></el-input><span class="timeStartRight" v-if="timestartShow1">天</span></el-radio>
          </div>
            <div v-if="errorMe">
              <span>请填写天数</span>
            </div>
          <div>

            <el-radio class="radio" label="2">有效期截止
              <el-date-picker
              v-model="value3"
              type="date"
              placeholder="选择日期"
              v-if="timestartShow2"
              :picker-options="pickerOptions2">
            </el-date-picker></el-radio>
          </div>
            <div v-if="errorMe2">
              <span>请选择日期</span>
            </div>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="发放时间">
          <el-radio-group v-model="provideTime">
            <el-radio class="radio" label="6">投资后即时</el-radio>
            <el-radio class="radio" label="7">满标</el-radio>
            <el-radio class="radio" label="8">放款</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生效时间">
          <div class="block">
            <el-date-picker
              v-model="startTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions0">
            </el-date-picker>
            <span class="demonstration">不设置时间审批通过后，立即生效</span>
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
            <span class="demonstration">不设置时间默认永久有效</span>
          </div>
        </el-form-item>

        <el-input
          type="textarea"
          :rows="4"
          width="30px"
          placeholder="请输入内容"
          v-model="ruleDescription"
          style="margin-bottom: 20px;width: 550px;margin-left: 13px;">
        </el-input>


        <el-form-item>
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button @click="subButton">确定</el-button>
          <router-link to="systemList">
            <el-button>取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>

      <div>
        <el-button type="text"></el-button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
     data () {
      return {
        couponRule: '',
        sendAmount: '',
        expireType: '',
        expireTypeInput:'',
        provideTime:'',
        isShow: false,
        sendAmountShowN:false,
        sendAmountInput:'',
        timestartShow1: false,
        timestartShow2:false,
        errorMe1: false,
        errorMe2: false,
        typeName:'',
        inputName:'',
        activityName:'',
        inputLimit:'',
        inputNumber:'1',
        inputSource:'',
        ruleDescription: '',
        pickerOptions0: {
                disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        }
        ,
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
          value3:'',
        }
    },
    created(){
//      this.change()
    },
    methods: {
      showModel: function(){
        if(this.isShow == false){
          this.isShow = true
        }else{
          alert(this.radio1)
          this.isShow = false
        }

      },
      openPop: function(){
          this.$alert('请填写完整', {
            confirmButtonText: '确定'
        });
      },
      sendAmountShow: function(){
        if(this.sendAmount == 1){
          this.sendAmountShowN = false
        }else{
          this.sendAmountShowN =true
        }
      },
      changeShow: function(){
        if(this.expireType == 1){
          this.timestartShow1 = true;
          this.timestartShow2 = false;
        }else if(this.expireType == 2){
          this.timestartShow1 = false;
          this.timestartShow2 = true;

        }else if(this.expireType == 0){

          this.timestartShow1 = false;
          this.timestartShow2 = false;
        }

      },


      /*重置创建*/
      reset: function(){
        this.couponType = '';
        this.inputName = '';
        this.typeName = '';
        this.activityName = '';
        this.inputSource = '';
        this.couponRule = '';
        this.sendAmount = '';
        this.inputLimit = '';
        this.inputNumber = '';
        this.expireType ='';
        this.startTime = '';
        this.endTime = '';
        this.provideTime='';
        this.$emit('child-say',this.data);

      },


      /*确定创建*/
      subButton: function(){

        var that = this;

        if(this.couponType == '' || this.inputName == '' || this.activityName == '' || this.inputSource == '' || this.inputLimit == '' || this.inputNumber == '' || this.expireType =='' ){
          this.openPop();
          return
        }
        if(!this.expireType == 0){
          if(this.expireType == 1 && this.input == ''){
            this.expireType = Math.round(this.expireType)
            this.errorMe1 == true;
            return
          }
          if(this.expireType == 2 && this.value3 == ''){
            this.expireType = Math.round(this.expireType)
            this.errorMe2 == true;
            return
          }

        }

        console.log(typeof Math.round(this.expireType))
        this.inputLimit = Math.round(this.inputLimit)
        var formData = {
          "couponType" : 0,
          "couponRule" : this.couponRule,
          "name" : this.inputName,
          "source" : this.inputSource,
          "faceValue" : this.inputLimit,
          "sendAmount" : Math.round(this.inputNumber),
          "allowMultiple" : false,
          "expireType" : Math.round(this.expireType),
          "extendAttribute": {"raiseType":0},
          "couponRuleText": {"couponId":2,"actionType":0,"allowMultiple":false},
          "minDuration": 3,
          "expireDays": this.expireTypeInput,
          "activityId":this.activityName,

          /*textarea内容*/
          "ruleDescription": this.ruleDescription,

          /*发放时间*/
          "provideTime":this.provideTime,
          /*奖券面额是否是固定值*/

          "faceFixed":true,
        }

        $.ajax({
          type : "POST",
          contentType : "application/json",
          url : "http://192.168.1.130:8108/activity/coupon/createCoupon.do",
          data : JSON.stringify(formData),
          dataType : 'json',

          success : function(result) {

            /* 创建完后清空填写数据 */
            that.reset()
            this.$router.push({path: '/systemList'})
          },
          error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
          }
        });

      },

    },
    props:['typeName','inputName','activityName'],
}
</script>

<style>
.head div{
    margin-top:20px
}
.wrape{
  margin-top: 30px;
}
span{
    margin-right:7px
}
.sendAmountWrap .el-input{
  width: 80px;
}
.checkbox2{
   position:absolute; top:0; left:0;
}
.first{
    position: relative
}
.indecClear{
  overflow:hidden;
  margin-top:36px;
  margin-left:12px;
  margin-bottom: 26px;
}
.left{
  float:left;
  text-align:center;
  margin-right:7px
}
.indecClear .left el-input{
  margin-bottom: 20px;
  margin-left: -8px;
}
  .timeStart{
    margin-left: 120px;
  }
  .timeStartInput .el-input{
    width: 75px;
  }
.timeStartRight{
  margin-left: 6px;
}

</style>
