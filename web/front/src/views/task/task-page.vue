<template>
  <div class="page">
    <el-container>
      <el-header>
        <h2>作业管理</h2>
      </el-header>
      <el-main>
        <el-table :data="tasks" stripe>
          <el-table-column prop="name" label="作业名称" width="250" />
          <el-table-column prop="class" label="班级" width="150" />
          <el-table-column prop="deadline" label="作答时间" width="300" />
          <el-table-column prop="pending" label="待批" width="80" />
          <el-table-column prop="submitted" label="已交" width="80" />
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button @click="reviewTask(scope.row)" type="primary" icon="fas fa-edit">
                批阅
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
