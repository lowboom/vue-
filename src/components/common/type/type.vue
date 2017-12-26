<template>
  <div>
      <div class="stype">
          <el-select v-model="value" placeholder="不限" style="width:100px">
            <el-option
              v-for="item in items"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>
    
    </div>

  </div>
</template>

<script>
export default {
         data() {
            return {
              items: [{
                value: '选项1',
                label: '不限'
              }, {
                value: '选项2',
                label: '投资券'
              }, {
                value: '选项3',
                label: '加息券'
              }, {
                value: '选项4',
                label: '现金'
              }, {
                value: '选项4',
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
</style>
