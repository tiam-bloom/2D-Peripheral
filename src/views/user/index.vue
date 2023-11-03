<template>
  <div class="container-box">
    <div class="header p-2">
      <el-button type="primary" class="w-24">新增</el-button>
      <el-input
        v-model="searchKey"
        class="w-50 h-8 rounded"
        placeholder="搜索用户名"
        :prefix-icon="Search"
      />
    </div>

    <el-table
      :data="userList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      clearable
    >
      <el-table-column type="index" width="50" />
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="roleId" label="roleId" />
      <el-table-column label="Operations" width="200">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { Result } from "@/utils/http/types";
import { ref } from "vue";
import { User } from "./types";
import { Search } from "@element-plus/icons-vue";
const searchKey = ref("");
const userList = ref<User[]>([]);
http.get("/user/list").then((res: Result<User[]>) => {
  console.log(res);
  userList.value = res.data;
});

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const handleSelectionChange = (val: any) => {
  console.log(val);
};
</script>

<style>
.header {
  display: grid;
  grid-template-columns: auto 350px;
}
</style>
