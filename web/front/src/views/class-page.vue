<template>
  <div class="class-page">
    <div class="left-part">
      <div class="class-manage">
        <div class="item new" @click="addClass">新建班级</div>
        <div class="item manage">管理班级</div>
      </div>
      <div class="search">
        <el-input clearable placeholder="搜索班级" v-model.trim="searchClass" size="default">
          <template #prefix><i class="fas fa-search"></i></template>
        </el-input>
      </div>
      <div class="class-list">
        <el-menu class="el-menu" :default-active="selectedClass" @select="handleSelect">
          <el-menu-item v-for="item in classeItems" :index="item.name">
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="right-part">
      <div class="class-info">
        <div class="qr-code"><i class="fas fa-qrcode"></i></div>
        <div class="class-name">{{ selectedClass }}</div>
        <div class="class-setting" @click="editClass"><i class="fas fa-cogs"></i> 班级设置</div>
      </div>
      <p>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="removeSelectRowEvent">删除选中</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
      </p>

      <vxe-table
        border="full"
        round="true"
        show-overflow
        keep-source
        ref="xTable"
        :loading="loading"
        :data="filteredTableData"
        :edit-config="{ trigger: 'click', mode: 'cell', showStatus: true }"
      >
        <vxe-column type="checkbox" width="60"></vxe-column>
        <vxe-column type="seq" title="序号" width="60"></vxe-column>
        <vxe-column
          field="name"
          title="姓名"
          width="100"
          :edit-render="{ autofocus: '.myinput' }"
        >
          <template #edit="scope">
            <input
              type="text"
              class="myinput"
              v-model="scope.row.name"
              @input="updateRowStatus(scope)"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="studentId"
          title="学号"
          width="200"
          :edit-render="{ autofocus: '.myinput' }"
        >
          <template #edit="scope">
            <input
              type="text"
              class="myinput"
              v-model="scope.row.studentId"
              @input="updateRowStatus(scope)"
            />
          </template>
        </vxe-column>
        <vxe-column field="department" title="院系" width="200" :edit-render="{}">
          <template #edit="scope">
            <input type="text" v-model="scope.row.department" @input="updateRowStatus(scope)" />
          </template>
        </vxe-column>
        <vxe-column field="major" title="专业" width="200" :edit-render="{}">
          <template #edit="scope">
            <input type="text" v-model="scope.row.major" @input="updateRowStatus(scope)" />
          </template>
        </vxe-column>
        <vxe-column
          field="joinTime"
          title="加入时间"
          width="200"
          :formatter="formatDate"
          :edit-render="{}"
        >
          <template #edit="scope">
            <input type="date" v-model="scope.row.date12" @input="updateRowStatus(scope)" />
          </template>
        </vxe-column>

        <vxe-column title="操作" width="200">
          <template #default="{ row }">
            <template v-if="hasUpdateStatus(row)">
              <vxe-button @click="saveUpdateEvent(row)" :loading="row.loading"
                >局部保存</vxe-button
              >
            </template>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
  <vxe-modal
    v-model="showEdit"
    :title="type ? '编辑&保存' : '新增&保存'"
    width="800"
    min-width="600"
    min-height="300"
    :loading="submitLoading"
    resize
    destroy-on-close
  >
    <template #default>
      <vxe-form
        :data="addedClass"
        :rules="formRules"
        title-align="right"
        title-width="100"
        @submit="submitEvent"
      >
        <vxe-form-item
          title="基础信息"
          title-align="left"
          :title-width="200"
          :span="24"
          :title-prefix="{ message: '这是必填项', icon: 'vxe-icon-comment' }"
        ></vxe-form-item>
        <vxe-form-item field="name" title="班级名称" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.name" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>

        <vxe-form-item field="major" title="专业" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.major" placeholder="请输入专业"></vxe-input>
          </template>
        </vxe-form-item>

        <vxe-form-item
          title="其他信息"
          title-align="left"
          :title-width="200"
          :span="24"
          :title-prefix="{ message: '这是选填项', icon: 'vxe-icon-info-circle-fill' }"
        ></vxe-form-item>
        <vxe-form-item field="number" title="班级人数" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.number" type="number" placeholder="请输入数值"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="period" title="班级时期" :span="12" :item-render="{}">
          <template #default="{ data }">
            <vxe-input
              v-model="data.period"
              type="date"
              placeholder="请选择日期"
              transfer
            ></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="description" title="班级描述" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-textarea
              v-model="data.description"
              :autosize="{ minRows: 2, maxRows: 4 }"
            ></vxe-textarea>
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
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import XEUtils from "xe-utils";
//左侧处理班级逻辑
const classeItems = ref([
  {
    name: "计科1701",
    number: 50,
    major: "计算机科学与技术",
    period: "",
    description: "",
  },
  {
    name: "计科1702",
    number: 50,
    major: "计算机科学与技术",
    period: "",
    description: "",
  },
  {
    name: "计科1703",
    number: 50,
    major: "计算机科学与技术",
    period: "",
    description: "",
  },
]);
const formRules = ref({
  name: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
  number: [{ required: true, message: "请输入班级人数", trigger: "blur" }],
  major: [{ required: true, message: "请输入专业", trigger: "blur" }],
  period: [{ required: true, message: "请输入时期", trigger: "blur" }],
  description: [{ required: true, message: "请输入描述", trigger: "blur" }],
});
const addedClass = ref({
  name: "",
  number: 0,
  major: "",
  period: "",
  description: "",
});
//搜索班级
const searchClass = ref("");
// 当前选中的班级
const handleSelect = (index) => {
  selectedClass.value = index;
  filteredTableData.value = tableData.value.filter(
    (item) => item.class === selectedClass.value
  );
};
const selectedClass = ref(classeItems.value[0].name);
// 添加班级
const addClass = () => {
  type.value = false;
  showEdit.value = true;

  // 这里应该打开一个对话框，让用户输入新班级的信息
  // 然后将新班级的信息发送到服务器
  // 为了简单起见，我们只是硬编码了一个新班级

  classeItems.value.push(addedClass);
};
const editClass = () => {
  type.value = true;
  showEdit.value = true;
};
const showEdit = ref(false);
//是新增还是编辑班级
const type = ref();
//右侧表单逻辑处理
// 班级成员列表
const tableData = ref([
  {
    name: "张三",
    studentId: "123456",
    department: "计算机科学与技术学院",
    major: "计算机科学与技术",
    class: "计科1701",
    joinTime: "2017-09-01",
  },
  {
    name: "张三",
    studentId: "123456",
    department: "计算机科学与技术学院",
    major: "计算机科学与技术",
    class: "计科1701",
    joinTime: "2017-09-01",
  },
  {
    name: "张三",
    studentId: "123456",
    department: "计算机科学与技术学院",
    major: "计算机科学与技术",
    class: "计科1701",
    joinTime: "2020-12-04",
  },
  {
    name: "李四",
    studentId: "123456",
    department: "计算机科学与技术学院",
    major: "计算机科学与技术",
    class: "计科1702",
    joinTime: "2017-09-01",
  },
  {
    name: "李四",
    studentId: "123456",
    department: "计算机科学与技术学院",
    major: "计算机科学与技术",
    class: "计科1702",
    joinTime: "2017-09-01",
  },
  {
    name: "李四",
    studentId: "123456",
    department: "计算机科学与技术学院",
    major: "计算机科学与技术",
    class: "计科1702",
    joinTime: "2020-12-04",
  },
]);
//筛选对应班级的人员
const filteredTableData = ref([]);
const xTable = ref();
//显示表格是否加载中
const loading = ref(false);
const formatDate = ({ cellValue }) => {
  return XEUtils.toDateString(cellValue, "yyyy-MM-dd");
};
const insertEvent = async () => {
  const $table = xTable.value;
  if ($table) {
    const record = {};
    const { row: newRow } = await $table.insert(record);
    await $table.setEditCell(newRow, "name");
  }
};
const removeSelectRowEvent = () => {
  const $table = xTable.value;
  if ($table) {
    $table.removeCheckboxRow();
  }
};
const hasUpdateStatus = (row) => {
  const $table = xTable.value;
  if ($table) {
    return $table.isUpdateByRow(row);
  }
};
const updateRowStatus = (params) => {
  const $table = xTable.value;
  if ($table) {
    return $table.updateStatus(params);
  }
};
const saveUpdateEvent = (row) => {
  const $table = xTable.value;
  if ($table) {
    if ($table.isUpdateByRow(row)) {
      row.loading = true;
      // 模拟异步
      setTimeout(() => {
        row.loading = false;
        // 保存完成后将行恢复到初始状态
        $table.reloadRow(row, {});
        xTable.modal.message({ content: "保存成功！", status: "success" });
      }, 300);
    } else {
      xTable.modal.message({ content: "数据未改动！", status: "info" });
    }
  }
};
const saveEvent = () => {
  loading.value = true;
  // 默认异步
  setTimeout(() => {
    loading.value = false;
    // 保存完成后重新刷新数据
    tableData.value = [
      {
        name: "张三",
        studentId: "123456",
        department: "计算机科学与技术学院",
        major: "计算机科学与技术",
        class: "计科1701",
        joinTime: "2017-09-01",
      },
      {
        name: "张三",
        studentId: "123456",
        department: "计算机科学与技术学院",
        major: "计算机科学与技术",
        class: "计科1701",
        joinTime: "2017-09-01",
      },
      {
        name: "张三",
        studentId: "123456",
        department: "计算机科学与技术学院",
        major: "计算机科学与技术",
        class: "计科1701",
        joinTime: "2020-12-04",
      },
    ];
  }, 300);
};
onMounted(() => {
  handleSelect(selectedClass.value);
});
</script>

<style lang="scss" scoped>
.class-page {
  display: flex;
  justify-content: flex-start;
  .left-part {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    flex-direction: column;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
    margin-right: 16px;
    margin-top: 16px;
    .class-manage {
      display: flex;
      border-top: 1px solid #cdc7c7;
      border-right: 1px solid #cdc7c7;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      .item {
        height: 48px;
        width: 100%;
        font-size: 1.3rem;
        line-height: 48px;
        text-align: center;
        cursor: pointer;

        &:hover {
          background-color: #ecf5ff;
          font-weight: bold;
          color: #409eff;
        }
      }
      .new {
        border-right: 1px solid #cdc7c7;
      }
    }
  }
  .right-part {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    margin-top: 16px;
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
