<template>
  <vxe-table
    border
    height="600"
    show-overflow
    :loading="loading"
    ref="tableRef"
    :row-config="{ isHover: true }"
    :data="data"
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
</template>

<script>
export default {
  name: "CustomTable",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    cellDBLClickEvent(event) {
      this.$emit("cell-dblclick", event);
    },
    editRow(row) {
      this.$emit("edit-row", row);
    },
    deleteRow(row) {
      this.$emit("delete-row", row);
    },
  },
};
</script>

<style scoped>
/* 你的样式代码 */
</style>
