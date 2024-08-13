<template>
  <div class="class-page">
    <div class="left-part">
      <div class="buttons">
        <CustomButton
          buttonText="新建班级"
          @click="insertClass"
          :height="55"
          :width="140"
          :isRadius="false"
          :fontSize="1.2"
        ></CustomButton>
        <CustomButton
          @click="insertRow"
          buttonText="添加成员"
          :height="55"
          :width="140"
          :isRadius="false"
          :fontSize="1.2"
        ></CustomButton>
      </div>
      <div class="search">
        <el-input clearable placeholder="搜索班级" v-model.trim="searchContent">
          <template #prefix><i class="fas fa-search"></i></template>
        </el-input>
        <el-button @click="searchClass">搜索</el-button>
      </div>
      <div class="class-list">
        <el-menu class="el-menu" :default-active="defaultClassId" @select="handleSelect">
          <el-menu-item v-for="item in classData" :index="item.id" :key="item.id">
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="right-part">
      <div class="class-info">
        <div class="qr-code"><i class="fas fa-qrcode"></i></div>
        <div class="class-name">{{ selectedClass?.name }}</div>
        <div class="buttons">
          <CustomButton
            buttonText="编辑班级"
            @click="editClass"
            :isRadius="false"
            :height="40"
            :width="75"
            :fontSize="1"
          ></CustomButton>
          <CustomButton
            @click="deleteClass"
            buttonText="删除班级"
            :isRadius="false"
            :height="40"
            :width="75"
            :fontSize="1"
          ></CustomButton>
        </div>
      </div>
      <vxe-table
        border
        height="600"
        show-overflow
        :loading="tableLoading"
        ref="tableRef"
        :row-config="{ isHover: true }"
        :data="rowTableData"
        @cell-dblclick="cellDBLClickEvent"
      >
        <vxe-column type="seq" title="序号" width="60"></vxe-column>
        <vxe-column field="real_name" title="姓名" width="100"></vxe-column>
        <vxe-column field="user_id" title="学号" width="120"></vxe-column>
        <vxe-column field="user_email" title="邮箱" width="180"></vxe-column>
        <vxe-column field="major" title="专业" width="220"></vxe-column>
        <vxe-column field="create_time" title="加入时间" width="220"></vxe-column>
        <vxe-column title="操作" width="100" show-overflow>
          <template #default="{ row }">
            <vxe-button mode="text" icon="vxe-icon-edit" @click="editRow(row)"></vxe-button>
            <vxe-button mode="text" icon="vxe-icon-delete" @click="deleteRow(row)"></vxe-button>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
  <vxe-modal
    v-model="showEditRow"
    title="编辑成员"
    width="800"
    min-width="600"
    min-height="300"
    :loading="submitRowLoading"
    resize
    destroy-on-close
  >
    <template #default>
      <vxe-form
        ref="rowRef"
        :data="rowFormData"
        :rules="rowRules"
        title-align="right"
        title-width="100"
        @submit="submitRow"
        @reset="clearRow"
      >
        <vxe-form-item
          title="基础信息"
          title-align="left"
          :title-width="200"
          :span="24"
          :title-prefix="{ icon: 'vxe-icon-comment' }"
        ></vxe-form-item>
        <vxe-form-item field="realName" title="姓名" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input
              v-model="data.real_name"
              placeholder="请输入姓名"
              :disabled="true"
            ></vxe-input>
          </template>
        </vxe-form-item>

        <vxe-form-item field="userId" title="学号" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input
              v-model="data.user_id"
              placeholder="请输入学号"
              :disabled="true"
            ></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="userEmail" title="邮箱" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input
              v-model="data.user_email"
              placeholder="请输入姓名"
              :disabled="true"
            ></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="major" title="专业" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input
              v-model="data.major"
              placeholder="请输入专业"
              :disabled="true"
            ></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item
          title="其他信息"
          title-align="left"
          :title-width="200"
          :span="24"
          :title-prefix="{ message: '请填写必填项', icon: 'vxe-icon-info-circle-fill' }"
        ></vxe-form-item>
        <vxe-form-item field="create_time" title="加入时间" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input
              v-model="data.create_time"
              type="datetime"
              placeholder="请选择日期"
              transfer
              :disabled="true"
            ></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item align="center" title-align="left" :span="24">
          <template #default>
            <vxe-button type="submit">提交</vxe-button>
            <vxe-button type="reset">重置</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </template>
  </vxe-modal>
  <vxe-modal
    v-model="showClass"
    :title="isEditClass ? '编辑班级' : '新增班级'"
    width="800"
    min-width="600"
    min-height="300"
    :loading="submitClassLoading"
    resize
    destroy-on-close
  >
    <template #default>
      <vxe-form
        ref="classRef"
        :data="classFormData"
        :rules="classRules"
        title-align="left"
        title-width="100"
        @submit="submitClass"
        @reset="clearClass"
      >
        >
        <vxe-form-item
          title="基础信息"
          title-align="left"
          :title-width="200"
          :span="24"
          :title-prefix="{ icon: 'vxe-icon-comment' }"
        ></vxe-form-item>
        <vxe-form-item field="name" title="班级名称" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.name" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="total" title="班级人数" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.total" type="number" placeholder="请输入数值"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="major" title="班级专业" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.major" placeholder="请确认专业"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="create_time" title="创建时间" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input
              v-model="data.create_time"
              type="datetime"
              placeholder="默认创建日期"
              transfer
              :disabled="true"
              :readonly="true"
            ></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item
          title="其他信息"
          title-align="left"
          :title-width="200"
          :span="24"
          :title-prefix="{ icon: 'vxe-icon-info-circle-fill' }"
        ></vxe-form-item>
        <vxe-form-item field="permit_join" title="是否允许加入" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-switch v-model="data.permit_join"></vxe-switch>
          </template>
        </vxe-form-item>
        <vxe-form-item
          field="join_confirm"
          title="加入是否需要验证"
          :span="12"
          :item-render="{}"
        >
          <template #default="{ data }">
            <vxe-switch v-model="data.join_confirm"></vxe-switch>
          </template>
        </vxe-form-item>
        <vxe-form-item
          field="finish_mode"
          title="是否开启结课模式"
          :span="12"
          :item-render="{}"
        >
          <template #default="{ data }">
            <vxe-switch v-model="data.finish_mode"></vxe-switch>
          </template>
        </vxe-form-item>
        <vxe-form-item align="center" title-align="left" :span="24">
          <template #default>
            <vxe-button type="submit">提交</vxe-button>
            <vxe-button type="reset">重置</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </template>
  </vxe-modal>
  <vxe-modal
    v-model="showInsertRow"
    title="添加班级成员"
    width="1200"
    height="400"
    min-width="900"
    min-height="500"
    resize
    destroy-on-close
  >
    <div style="display: flex; height: 100%">
      <div style="flex: 1; margin-right: 20px">
        <vxe-table
          :data="studentsData"
          height="100%"
          border
          show-header
          @checkbox-change="handleUserSelectionChange"
        >
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column field="user_id" title="用户名" width="150"></vxe-column>
          <vxe-column field="email" title="邮箱" width="200"></vxe-column>
          <vxe-column field="real_name" title="真实姓名" width="150"></vxe-column>
        </vxe-table>
      </div>

      <!-- 右边的当前班级成员表格 -->
      <div style="flex: 1">
        <vxe-table :data="classMembers" height="100%" border show-header>
          <vxe-column field="user_id" title="用户名" width="150"></vxe-column>
          <vxe-column field="real_name" title="真实姓名" width="150"></vxe-column>
        </vxe-table>
      </div>
    </div>
    <template v-slot:footer>
      <vxe-button type="primary" @click="addSelectedUsersToClass">添加选中用户</vxe-button>
      <vxe-button @click="showInsertRow = false">取消</vxe-button>
    </template>
  </vxe-modal>
</template>
<script setup>
import CustomButton from "@/components/common/CustomButton.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, getCurrentInstance, onMounted, reactive, computed } from "vue";
import { ClassService } from "@/utils/api";
const { proxy } = getCurrentInstance();
//左侧处理班级逻辑
const classRef = ref();
const classData = ref([]);
const reserveClassData = ref([]);
const selectedClass = ref();
const getAllClasses = async () => {
  await ClassService.getAllClasses().then((res) => {
    if (res.code === 200) {
      reserveClassData.value = classData.value = res.data;
      defaultClassId.value = classData.value[0].id;
      handleSelect(defaultClassId.value);
    } else {
      ElMessage.error("获取班级信息失败");
    }
  });
};
const classRules = reactive({
  name: [{ required: true, message: "请确认班级名称", trigger: "blur" }],
  major: [{ required: true, message: "请确认所属专业", trigger: "blur" }],
  total: [
    { required: true, message: "请确认班级人数", trigger: "blur" },
    { validator: proxy.Verify.total, message: "班级人数必须大于0" },
  ],
});
// 选中的班级并发起对应的请求
const defaultClassId = ref("");
const handleSelect = (index) => {
  selectedClass.value = classData.value.find((item) => item.id === index);
  if (selectedClass.value) {
    getManyByClass();
  }
};
//搜索班级
const searchContent = ref("");
const searchClass = () => {
  if (searchContent.value) {
    const searchResult = reserveClassData.value.filter((item) =>
      item.name.includes(searchContent.value)
    );
    if (searchResult.length > 0) {
      classData.value = searchResult;
    } else {
      ElMessage.warning("未搜素相关班级");
    }
  } else {
    classData.value = reserveClassData.value;
  }
};
const classFormData = ref({
  name: "",
  total: 0,
  major: "",
  create_time: "",
  permit_join: false,
  join_confirm: false,
  finish_mode: false,
});
const submitClassLoading = ref(false);
const showClass = ref(false);
const isEditClass = ref();
const insertClass = () => {
  Object.assign(classFormData.value, {
    name: "",
    number: 0,
    major: "",
    create_time: "",
    permit_join: false,
    join_confirm: false,
    finish_mode: false,
  });
  isEditClass.value = false;
  showClass.value = true;
};
const editClass = () => {
  Object.assign(classFormData.value, selectedClass.value);
  showClass.value = true;
  isEditClass.value = true;
};

const deleteClass = () => {
  ElMessageBox.confirm(`你确定要删除【${selectedClass.value.name}】?`, "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    ClassService.deleteClass().then((res) => {
      if (res.code === 200) {
        classData.value.splice(classData.value.indexOf(selectedClass), 1);
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      } else {
        ElMessage({
          type: "success",
          message: "删除失败",
        });
      }
    });
  });
};
const updateClass = () => {
  submitClassLoading.value = true;
  let params = {};
  Object.assign(params, classFormData.value);
  ClassService.updateClass(selectedClass.value.id, params)
    .then((res) => {
      if (res.code === 200) {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "修改失败",
          type: "error",
        });
      }
    })
    .finally(() => {
      submitClassLoading.value = false;
      showClass.value = false;
    });
};
const addClass = () => {
  submitClassLoading.value = true;
  let params = {};
  Object.assign(params, classFormData.value);
  ClassService.addClass(params)
    .then((res) => {
      if (res.code === 200) {
        classData.value.push(params);
        ElMessage({
          message: "新建班级成功",
          type: "success",
          center: true,
        });
      } else {
        ElMessage({
          message: "新建班级失败",
          type: "error",
          center: true,
        });
      }
    })
    .finally(() => {
      submitClassLoading.value = false;
      showClass.value = false;
    });
};
const submitClass = async () => {
  switch (isEditClass.value) {
    case true:
      updateClass();
      break;
    case false:
      addClass();
      break;
  }
};
const clearClass = () => {
  Object.assign(classFormData.value, {
    name: "",
    number: 0,
    major: "",
    permit_join: false,
    join_confirm: false,
    finish_mode: false,
  });
};
// 右侧表单逻辑处理
const showInsertRow = ref(false);
const rowTableData = ref([]);
const tableLoading = ref(false);
const rowRef = ref();
const tableRef = ref();
const submitRowLoading = ref(false);
const showEditRow = ref(false);
const rowFormData = ref({
  user_uid: "",
  user_email: "",
  user_id: "",
  real_name: "",
  class_id: "",
  create_time: "",
});
// 获取班级的专业
const getMajorByClass = (id) => {
  return classData.value.find((item) => item.id === id).major;
};
// 拿到对应班级的所有学员
const getManyByClass = async () => {
  tableLoading.value = true;
  let params = selectedClass.value.id;
  ClassService.getManyByClass(params)
    .then((res) => {
      if (res.code === 200) {
        rowTableData.value = res.data.map((item) => {
          return {
            ...item,
            major: getMajorByClass(item.class_id),
          };
        });
      } else {
        rowTableData.value = null;
        ElMessage.warning("当前班级暂无成员，快去添加吧!");
      }
    })
    .finally(() => {
      tableLoading.value = false;
    });
};
// 添加成员信息
const insertRow = () => {
  showInsertRow.value = true;
};
const addRow = () => {};
// 编辑成员信息
const editRow = (row) => {
  Object.assign(rowFormData.value, row);
  showEditRow.value = true;
};
const cellDBLClickEvent = ({ row }) => {
  editRow(row);
};
const submitRow = async () => {
  submitRowLoading.value = true;
  submitRowLoading.value = false;
};
// 删除
const deleteRow = async (row) => {
  ElMessageBox.confirm(`你确定要从【${selectedClass.value.name}】移除这个学生?`, "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    ClassService.deleteStudent(row.class_id, row.user_uid).then((res) => {
      if (res.code === 200) {
        rowTableData.value.splice(rowTableData.value.indexOf(row), 1);
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      } else {
        ElMessage({
          type: "error",
          message: "删除失败",
        });
      }
    });
  });
};
const clearRow = (row) => {
  Object.assign(rowFormData.value, {
    name: "",
    userId: "",
    major: "",
    joinTime: "",
  });
};
// 表单规则
const rowRules = {
  realName: [{ required: true, message: "请输入姓名" }],
  userEmail: [{ required: true, message: "请输入邮箱" }],
  userId: [
    { required: true, message: "请输入学工号" },
    { validator: proxy.Verify.userId, message: "学工号不存在", trigger: "blur" },
  ],
};

onMounted(() => {
  getAllClasses();
});
</script>

<style lang="scss" scoped>
.class-page {
  display: flex;
  justify-content: flex-start;
  margin-top: 80px;
  .left-part {
    display: flex;
    flex: 0 0 auto;
    align-content: center;
    justify-content: flex-start;
    flex-direction: column;
    max-height: calc(100vh - 80px);
    width: 250px;
    overflow: hidden;
    margin-right: 16px;
    .buttons {
      display: flex;
    }
    .class-list {
      :deep(.el-menu) {
        .el-menu-item.is-active {
          color: #5995fd;
          background-color: #ecf5ff;
        }
      }
    }
    .search {
      display: flex;
      justify-content: flex-start;
    }
  }
  .right-part {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
    .class-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 24px;
      height: 48px;
      i {
        font-size: 1.4rem;
        color: #5995fd;
      }
      .qr-code {
        cursor: pointer;
      }
      .class-name {
        line-height: 48px;
        font-size: 1.5rem;
        font-weight: bold;
      }
      .class-setting {
        cursor: pointer;
      }
    }

    .vxe-button {
      &:hover {
        background-color: #ecf5ff;
        font-weight: bold;
        color: #409eff;
      }
    }
  }
}
</style>
