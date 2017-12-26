<template>
  <div id="app">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="兑换码名称">
        <el-input v-model="form.name" style="width:150px"></el-input>
     </el-form-item>
      <el-form-item label="兑换码规则">
        <el-radio class="radio" v-model="radio" label="1">系统随机</el-radio>
        <el-radio class="radio" v-model="radio" label="2">自定义导入</el-radio>
        <el-button>导入兑换码</el-button>
      </el-form-item>
      <el-form-item label="导入时间">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-select v-model="value" placeholder="发送时间" style="width:150px">
                    <el-option
                    v-for="item in items"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动区域">
                <div class="block">
                    <el-date-picker
                    v-model="value6"
                    type="daterange"
                    placeholder="选择日期范围" style="width:150px">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                手机号码：
            </el-form-item>
            <el-form-item>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
                奖券类型：
            </el-form-item>
            <el-form-item>
                <typeCode></typeCode>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                兑换码编码查询：<el-input v-model="input" style="width:150px"></el-input>
            </el-form-item>
            
        </el-form>
      </el-form-item>

      <el-form-item>
        <tabCode></tabCode>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>


import tabCode from '../../common/tab/Tabs.vue'
import typeCode from '../../common/type/type.vue'
import stateCode from '../../common/state/state.vue'

  export default {
    components: {
            tabCode: tabCode,
            typeCode: typeCode,
            stateCode: stateCode
        },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        radio: '1',
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
              }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
</style>