<template>
  <div>
      <div class="stype">
        <span>任务状态：</span>
          <el-select v-model="value" placeholder="全部" style="width:100px">
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
