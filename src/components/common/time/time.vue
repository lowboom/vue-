




<template>

<div>
    <div class="block" @click="onClickMe">
      <el-date-picker
        v-model="allTime"
        type="daterange"
        placeholder="选择日期范围">
      </el-date-picker>
  </div>

</div>

</template>

<script>
  export default {
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        allTime: '',
      };
    },
    methods: {
      onClickMe: function(){
        this.$emit('child-say',this.data);
      }
    }
  };
</script>
