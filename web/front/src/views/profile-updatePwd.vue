<template>
  <div class="profile">
    <el-row class="row-top">
      <el-col :span="12">修改密码</el-col>
    </el-row>
    <div class="row">
      <el-row :span="6"> <div class="row-title">旧密码</div></el-row>
      <el-row>
        <el-col :span="12">
          <el-input type="password" v-model="oldPassword"> </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="row">
      <el-row :span="6"> <div class="row-title">新密码</div></el-row>
      <el-row>
        <el-col :span="12">
          <el-input type="password" v-model="newPassword"> </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="row">
      <el-row :span="6"> <div class="row-title">确认新密码</div></el-row>
      <el-row>
        <el-col :span="12">
          <el-input type="password" v-model="newPassword"> </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="row button">
      <el-button type="primary">更新密码</el-button><span>我忘记了密码</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.profile {
  .row-top {
    height: 36px;
    text-align: left;
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 18px;
    border-bottom: 1px solid #cdc7c7;
  }
  .row {
    margin-top: 12px;
    .row-title {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }
  }
  .button {
    margin-top: 24px;
    span {
      color: #5995fd;
      margin-left: 12px;
      font-size: 0.9rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
