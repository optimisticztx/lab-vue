<script setup>
import {ElNotification, ElMessage} from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import {useAccountStore} from "@/stores/useAccountStore.js"

const accountStore = useAccountStore();
// Props
const props = defineProps({
  handleSuccess: {
    type: Function,
    required: true,
  },
});

// 响应式变量
const title = ref(accountStore.title);
// const headers = ref({
//   aToken: localStorage.getItem("aToken"),
// });
// const uploadData = ref({
//   biz: 'device',
// })
const dialogVisible = ref(false);
const statusList = [
  {
    id: 0,
    name: "正常"
  },
  {
    id: 1,
    name: "停用"
  }
]
const sexList = [
  {
    id: 0,
    name: "男"
  },
  {
    id: 1,
    name: "女"
  }
]
const delFlagList = [
  {
    id: 0,
    name: "未删除"
  },
  {
    id: 1,
    name: "已删除"
  }
]
const userTypeList = [
  {
    id: 0,
    name: "管理员"
  },
  {
    id: 1,
    name: "普通用户"
  }
]
const form = reactive({
  userName: "",
  nickName: "",
  sex: "",
  password: "",
  email: "",
  phonenumber: "",
  status: "",
  userType: "",
  delFlag: "",

});
const formRef = ref(null);

const rules = reactive({
  userName: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "change",
    },
  ],
  nickName: [
    {
      required: true,
      message: "请输入昵称",
      trigger: "change",
    },
  ],
  sex: [
    {
      required: true,
      message: "请选择性别",
      trigger: "change",
    },
  ],
  password: [
    {
      required: false,
      message: "请输入密码",
      trigger: "change",
    },
  ],
  email: [
    {
      required: false,
      message: "请输入邮箱",
      trigger: "change",
    },
  ],

  phonenumber: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "change",
    },
  ],
  status: [
    {
      required: true,
      message: "请选择账号状态",
      trigger: "change",
    },
  ],
  userType: [
    {
      required: false,
      message: "请选择用户类型",
      trigger: "change",
    },
  ], delFlag: [
    {
      required: false,
      message: "请选择是否删除",
      trigger: "change",
    },
  ],
});

// const imageUrl = ref("");


// 挂载后的处理
onMounted(() => {

});

// 组件内的触发方法
const handleClose = (done) => {
  dialogVisible.value = false;
};

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("数据验证成功!");
      //   TODO: 上传数据

      if (title.value === "编辑盒子信息") {
        // putAction("/scpi/sc/box/edit", form).then((res) => {
        //   console.log(`output->人员更新res`, res);
        //   if (res.code == 200) {
        //     ElMessage({
        //       message: "更新成功！",
        //       type: "success",
        //     });
        //     props.handleSuccess();
        //     resetForm(formRef);
        //   } else {
        //     ElMessage({
        //       message: "更新失败！",
        //       type: "error",
        //     });
        //     resetForm(formRef);
        //   }
        // });
      } else {
        // postAction("/scpi/sc/box/add", form).then((res) => {
        //   console.log(`output->人员新增res`, res);
        //   if (res.code == 200) {
        //     ElMessage({
        //       message: "添加成功！",
        //       type: "success",
        //     });
        //     props.handleSuccess();
        //     resetForm(formRef);
        //   } else {
        //     ElMessage({
        //       message: "添加失败！",
        //       type: "error",
        //     });
        //     resetForm(formRef);
        //   }
        // });
      }
      handleClose();
    } else {
      ElMessage({
        message: "验证出错，请检查输入项！",
        type: "warning",
      });
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();

};

const handleAvatarSuccess = (response, uploadFile) => {
  console.log(`output->图片上传response`, response);
  // imageurl的图片是在内存生成的为了在用户本地预览，不是从后端请求的数据
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
  if (response.code == 200) {
    form.boxImg = response.result;
    ElMessage({
      message: "上传成功！",
      type: "success",
    });
  } else {
    ElMessage({
      message: "上传失败,原因：" + res.message,
      type: "error",
    });
  }
};

const beforeAvatarUpload = (rawFile) => {
  // if (rawFile.type !== "image/jpeg") {
  //   ElMessage.error("Avatar picture must be JPG format!");
  //   return false;
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error("Avatar picture size can not exceed 2MB!");
  //   return false;
  // }
  return true;
};
const handleEdit = (index, row) => {
  console.log(`output->add:index,row`, index, row);
  title.value = "编辑盒子信息";
  // form.boxId = row.boxId;
  // form.boxName = row.boxName;
  // form.boxSn = row.boxSn;
  // form.boxUrl = row.boxUrl;
  // form.boxCompany = row.boxCompany;
  // form.boxSpeakerId = row.boxSpeakerId;
  // form.boxStationId = row.boxStationId;
  // form.boxGridId = row.boxGridId;
  // form.boxImg = row.boxImg;
  dialogVisible.value = true;
};
const reset = () => {
  title.value = "新增";
  resetForm(formRef.value);
  // 重置其他相关数据
  // form.boxId = "";
  // form.boxName = "";

};
defineExpose({
  dialogVisible,
  handleEdit,
  reset,
});
</script>
<template>
  <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="800px"
      :before-close="handleClose"
  >
    <el-form
        ref="formRef"
        class="form-padding"
        :model="form"
        :rules="rules"
        label-position="right"
        label-width="auto"
    >
      <el-form-item label="用户名：" prop="userName" style="margin-left:50px;">
        <el-input v-model="form.userName" style="width: 240px"/>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickName"style="margin-left:50px;">
        <el-input v-model="form.nickName" style="width: 240px"/>
      </el-form-item>
      <el-form-item label="性别：" prop="sex"style="margin-left:50px;">
        <el-select
            v-model="form.sex"
            placeholder="请选择性别"
            style="width: 240px"
            filterable
        >
          <el-option
              v-for="item in sexList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="密码：" prop="password" style="margin-left:50px;">
        <el-input v-model="form.password" style="width: 240px"/>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email" style="margin-left:50px;">
        <el-input v-model="form.email" style="width: 240px"/>
      </el-form-item>
      <el-form-item label="手机号：" prop="phonenumber" style="margin-left:50px;">
        <el-input v-model="form.phonenumber" style="width: 240px"/>
      </el-form-item>

      <el-form-item label="账号状态：" prop="status" style="margin-left:50px;">
        <el-select
            v-model="form.status"
            placeholder="请选择帐号状态"
            style="width: 240px"
            filterable
        >
          <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用户类型：" prop="userType"style="margin-left:50px;">
        <el-select
            v-model="form.userType"
            placeholder="请选择用户类型"
            style="width: 240px"
            filterable
        >
          <el-option
              v-for="item in userTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否删除：" prop="delFlag"style="margin-left:50px;">
        <el-select
            v-model="form.delFlag"
            placeholder="请选择是否删除"
            style="width: 240px"
            filterable
        >
          <el-option
              v-for="item in delFlag"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>

      <!--      <el-form-item label="图片：" prop="boxImg">-->
      <!--        <el-upload-->
      <!--            class="avatar-uploader"-->
      <!--            action="/scpi/sc/common/upload"-->
      <!--            :headers="headers"-->
      <!--            :data="uploadData"-->
      <!--            :show-file-list="true"-->
      <!--            :on-success="handleAvatarSuccess"-->
      <!--            :before-upload="beforeAvatarUpload"-->
      <!--        >-->
      <!--          <img-->
      <!--              v-if="imageUrl"-->
      <!--              :src="imageUrl"-->
      <!--              style="width: 178px; height: 178px"-->
      <!--          />-->
      <!--          <el-icon v-else class="avatar-uploader-icon"><i-ep-plus /></el-icon>-->
      <!--        </el-upload>-->
      <!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="title==='新增' " @click="resetForm(formRef)">重置</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(formRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss">
.form-padding {
  padding-left: 100px;
  padding-right: 100px;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  border: 1px dashed var(--el-border-color);
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
