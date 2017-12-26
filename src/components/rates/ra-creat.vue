
<template>
  <div id="app">
    <router-link to="./rule"><el-button>+添加规则</el-button></router-link>
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
      <div class="s-right">
        <selectCode></selectCode>
      </div>

      <div class="s-time"> 

        <timeCode></timeCode>
      </div>
      <div class="s-btn">
        <el-button type="primary" icon="search">查询</el-button>
      </div>
      
    </div>
    <div class="tab">
        <listCode></listCode>
    </div>
  </div>

</template>

<script>
import selectCode from '../common/select/select.vue'
import timeCode from '../common/time/time.vue'
import tabCode from '../common/tab/Tabs.vue'
import listCode from '../common/list/list.vue'
export default {
        components: {
            selectCode: selectCode,
            timeCode: timeCode,
            tabCode: tabCode,
            listCode: listCode
        },
         data() {
            return {
              options: [{
                value: '选项6',
                label: '全部'
              }, {
                value: '选项7',
                label: '投资券'
              }, {
                value: '选项8',
                label: '加息券'
              }, {
                value: '选项9',
                label: '现金'
              }, {
                value: '选项10',
                label: '实物奖励“兑换码”'
              }],
              value: ''
            }    
         }  
}
</script>

<style>
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
    min-width:980px
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
    right:50px
  }
  .tab{
    width:100%
  }
</style>