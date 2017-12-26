<template>
  <div>
      <div class="stype">
        <span>奖券状态</span>
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
                label: '未使用'
              }, {
                value: '选项3',
                label: '已使用'
              }, {
                value: '选项4',
                label: '已过期'
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
