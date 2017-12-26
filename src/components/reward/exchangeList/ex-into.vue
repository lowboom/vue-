
<template>
  <div id="app">
  <div>
    <h3>以下是导入的兑换码数据，是否确认提交</h3>
    <button>确认提交</button>
    <router-link to="./exCreat">返回</router-link>
  </div>
    <tableCom></tableCom>
  </div>

</template>

<script>
import Tabs from '../../common/tab/Tabs.vue'
export default {
        components: {
            tableCom: Tabs
        }
}
</script>

<style>
</style>