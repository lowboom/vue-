<template>
  <div id="app">
    <div  class="menu">
        <el-row class="tac">
          <el-col :span="8">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark"  style="width:150px">
               <router-link to="systemList">
                 <el-submenu index="1">
                  <template slot="title" >奖券管理</template>
                  <router-link to="ActivityList"><el-menu-item index="1-1"><i class="el-icon-menu"></i>活动管理</el-menu-item></router-link>
                  <router-link to="systemList"><el-menu-item index="1-2"><i class="el-icon-menu"></i>系统发放</el-menu-item></router-link>
                  <!--<router-link to="manual"><el-menu-item index="1-2"><i class="el-icon-menu"></i>手动发放</el-menu-item></router-link>-->
                  <router-link to="statistics"><el-menu-item index="1-3"><i class="el-icon-menu"></i>奖券统计</el-menu-item></router-link>
                  <!--<router-link to="exchange"><el-menu-item index="1-4"><i class="el-icon-menu"></i>兑换码管理</el-menu-item></router-link>-->
                  <!--<router-link to="exCreat"><el-menu-item index="1-5"><i class="el-icon-menu"></i>兑换码创建</el-menu-item></router-link>-->
                 </el-submenu>
               </router-link>

              <!--<el-submenu index="2">
                <template slot="title" >加息管理</template>
                  <router-link to="raCreat"><el-menu-item index="2-1"><i class="el-icon-menu"></i>规则创建</el-menu-item></router-link>
                  <router-link to="raStatistics"><el-menu-item index="2-2"><i class="el-icon-menu"></i>加息统计</el-menu-item></router-link>
              </el-submenu>-->

              <el-submenu index="3">
                <template slot="title" >首页-审批</template>
                  <router-link to="approval"><el-menu-item index="3-1"><i class="el-icon-menu"></i>审批管理</el-menu-item></router-link>
              </el-submenu>

            </el-menu>
          </el-col>

      </el-row>

    </div>

    <div class="rightMenue">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/systemList' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>

    <div class="right">
      <router-view></router-view>
    </div>

  </div>


</template>

<script>
export default {
  name: 'app',
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
body{
  height:100%;
}
html{height:100%;min-width: 1000px}
.menu{
   position:absolute; top:0; left:0;
   padding:20px 0 0 20px;
   width:150px
}
.right{
  margin-left:210px;
  margin-top:20px
}

  .rightMenue{
    width: 300px;
    margin-left: 210px;
    margin-top: 23px;
  }

.rightMenue .el-breadcrumb{
  width: 300px;
}

</style>
