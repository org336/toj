<template>
  <div class="profile-identity">
    <el-row class="row-top">
      <el-col :span="12">身份认证</el-col>
    </el-row>
    <el-row :gutter="20" class="row-middle">
      <el-col :span="20"
        ><el-form
          ref="identityRef"
          label-width="100px"
          :model="identityForm"
          :rules="identityRules"
          class="row-middle"
          @submit.prevent>
          <el-form-item label="真实姓名" prop="realName">
            <el-input type="text" v-model.trim="identityForm.realName" clearable />
          </el-form-item>
          <el-form-item label="学工号" prop="userId">
            <el-input type="text" v-model.trim="identityForm.userId" clearable />
          </el-form-item>
          <el-form-item label="身份" prop="identity">
            <el-radio-group v-model="identityForm.identity">
              <el-radio border value="student">学生</el-radio>
              <el-radio border value="teacher">老师</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="证件上传" prop="file">
            <el-upload
              ref="uploadRef"
              class="identity-uploader"
              action="uploadCard"
              :on-change="handleChange"
              :auto-upload="false"
              :show-file-list="false"
              :before-upload="beforeUpload">
              <img v-if="identityForm.imageUrl" :src="identityForm.imageUrl" class="image" />
              <i v-else class="fa-regular fa-image image"></i>
            </el-upload>
          </el-form-item>
          <span class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2MB</span>
        </el-form>
        <el-form-item></el-form-item
      ></el-col>
    </el-row>
    <el-row class="row-bottom">
      <el-col :span="8" :offset="4"
        ><CustomButton
          :width="120"
          :height="45"
          :isLoading="loadingList.identityLoading"
          buttonText="点击提交"
          loadingText="提交中"
          @click="submitForm"></CustomButton>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { UploadService } from "@/api/apiServices";
import { myLocalStorage } from "@/utils/storage";
import { ref, reactive, getCurrentInstance } from "vue";
import { useSnackbarStore } from "@/store/snackbar";
const snackbarStore = useSnackbarStore();
const { proxy } = getCurrentInstance();
const loadingList = reactive({
  identityLoading: false,
});
const uploadRef = ref();
const identityRef = ref();
const identityForm = reactive({});
const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
const identityRules = {
  realName: [{ required: true, message: "请输入真实姓名" }],
  userId: [
    { required: true, message: "请输入学工号" },
    { validator: proxy.Verify.userId, message: "学工号不存在", trigger: "blur" },
  ],
  identity: [{ required: true, message: "请选择身份" }],
};
// 上传证件的逻辑
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let fileResult = "";
    reader.readAsDataURL(file.raw);
    reader.onload = () => (fileResult = reader.result);
    reader.onerror = (error) => reject(error);
    reader.onloadend = () => resolve(fileResult);
  });
}
const handleChange = (file) => {
  toBase64(file).then((result) => (identityForm.imageUrl = result));
};
function beforeUpload(rawFile) {
  // 异步操作，比如调用API检查文件
  const isIMAGE = allowedTypes.includes(rawFile.type);
  const isL2M = rawFile.size / 1024 / 1024 < 2;
  if (!isIMAGE) {
    snackbarStore.show("上传文件只能是图片格式!", "error");
    return false;
  }
  if (!isL2M) {
    snackbarStore.show("上传文件大小不能超过2MB!", "error");
    return false;
  }
}
//表单上传的逻辑
const submitForm = () => {
  identityRef.value.validate((valid) => {
    if (valid) {
      // 处理认证信息上传逻辑
      let params = {};
      Object.assign(params, identityForm);
      UploadService.uploadIdentity(myLocalStorage.get("user_uid"), params).then((res) => {
        if (res.code === 200) {
          snackbarStore.show("上传信息成功", "success");
        } else {
          snackbarStore.show("上传失败", "error");
        }
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.profile-identity {
  margin: 16px;
  .row-top {
    height: 36px;
    text-align: left;
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 18px;
    border-bottom: 1px solid #cdc7c7;
  }
  .row-middle {
    width: 100%;
    .el-form-item {
      :deep(.el-form-item__label) {
        font-size: 1.1rem;
        color: #000;
      }
      :deep(.el-form-item__content) {
        .el-input {
          width: 220px;
          font-size: 1.1rem;
        }
      }
    }
    .el-upload__tip {
      margin-left: 78px;
    }
    .image {
      text-align: center;
      border-radius: 24px;
      border: 2px solid;
      font-size: 2.4rem;
      color: #5995fd;
      width: 280px;
      height: 240px;
      line-height: 240px;
    }
  }
}
</style>
