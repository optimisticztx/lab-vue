<script setup>
import EditAccountDialog from "./EditAccountDialog.vue";

import { useLoginUserStore } from "@/stores/useLoginUserStore.js";

import { ElMessage } from "element-plus";
import { formatDateTime } from "@/utils/formatter.js";
import "element-plus/theme-chalk/el-message.css";
import {getUserList} from "@/api/account.js";
const userLoginStroe = useLoginUserStore();
console.log("账号管理中查看userStore：", userLoginStroe.loginUser);
// 静态变量
let sexOptions = [
  {
    value: 1,
    label: "男",
  },
  {
    value: 0,
    label: "女",
  },
];
let appOptions = [
  {
    value: 1,
    label: "停用",
  },
  {
    value: 0,
    label: "正常",
  },
];
let inoutOptions4 = [
  {
    value: 1,
    label: "普通用户",
  },
  {
    value: 0,
    label: "管理员",
  },
];
let inoutOptions5 = [
  {
    value: 1,
    label: "已删除",
  },
  {
    value: 0,
    label: "未删除",
  },
];

// 响应式变量
const loading = ref(true);

const editAccountDialog = ref(null);
const queryParams = reactive({});
const tableData = ref([]);
const formRef = ref(null);
const selectedRows = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const fetchTableData = () => {
  loading.value = true;
  const params = {
    page: currentPage.value,
    pageSize: pageSize.value,
    ...queryParams,

  };
  getUserList(params).then((res)=>{
    console.log("account res:", res);
    tableData.value = res.result.list;
    totalItems.value = res.result.total;
  })

  loading.value = false;
};
// onMounted
onMounted(async () => {
  await fetchTableData();

});

// 组件中调用
const handleAdd = () => {
  editAccountDialog.value.reset();
  editAccountDialog.value.dialogVisible = true;
};
const handleAddSuccess = () => {
  fetchTableData();
};
const onSubmit = () => {
  console.log(`output->queryParams`, queryParams);
  fetchTableData();
};
const resetForm = (formRef) => {
  if (!formRef) return;
  formRef.resetFields();
  fetchTableData();
};
const handleEdit = (index, row) => {
  console.log("index:",index)
  console.log("row:",row)
  editAccountDialog.value.handleEdit(index, row);
};
const handleDelete = (index, row) => {
  console.log(index, row);
  delAction("/scpi/sc/Staff/delete/" + row.staffId).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      fetchTableData();
    } else {
      ElMessage({
        message: "删除失败,原因：" + res.message,
        type: "error",
      });
    }
  });
};

const selectionChange = (newSelection) => {
  selectedRows.value = [];
  newSelection.forEach((item) => {
    selectedRows.value.push(item);
  });
};

const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
  fetchTableData();
};
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  fetchTableData();
};
</script>
<template>
  <div class="staff-main">
    <el-container>
      <EditAccountDialog ref="editAccountDialog" :handleSuccess="handleAddSuccess"></EditAccountDialog>
      <el-container class="container">
        <el-header style="height: max-content">
          <el-form
              ref="formRef"
              :model="queryParams"
              label-width="auto"
              label-position="left"
          >
            <el-row :gutter="20" style="width: 100%">
              <el-col :span="6">
                <el-form-item label="昵称" prop="nickName">
                  <el-input
                      v-model="queryParams.nickName"
                      placeholder="请输入人员姓名"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="用户名" prop="userName">
                  <el-input
                      v-model="queryParams.userName"
                      placeholder="请输入用户名"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="resetForm(formRef)">重置</el-button>
              </el-col>

            </el-row>
            <el-row :gutter="20" style="padding-left: 10px">
              <el-button
                  type="primary"
                  @click="handleAdd"
              >新增</el-button
              >
            </el-row>
          </el-form>
        </el-header>
        <el-main>
          <el-row>
            <el-table
                class="the-table"
                v-loading="loading"
                :data="tableData"
                border
                max-height="580"
                @selection-change="selectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column
                  fixed
                  prop="id"
                  label="人员编号"
                  align="center"
                  width="120"
              />
              <el-table-column
                  fixed
                  prop="userName"
                  label="用户名"
                  align="center"
                  width="100"
              />
              <el-table-column
                  prop="nickName"
                  label="昵称"
                  align="center"
                  width="80"
              />
              <el-table-column
                  prop="status"
                  label="账号状态"
                  align="center"
                  width="150"
              ><template #default="scope">
                  <span>{{
                      scope.row.status === "0" ? "正常" : "停用"
                    }}</span>
              </template>
              </el-table-column>
              <el-table-column
                  prop="email"
                  label="邮箱"
                  align="center"
                  width="150"
              ><template #default="scope">
                  <span>{{
                      scope.row.email? scope.row.email : "无"
                    }}</span>
              </template>
              </el-table-column>

              <el-table-column
                  prop="phoneNumber"
                  label="手机号"
                  align="center"
                  width="150"
              >
                <template #default="scope">
                  <span>{{
                      scope.row.phoneNumber? scope.row.phoneNumber : "无"
                    }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="sex"
                  label="性别"
                  align="center"
                  width="150">
                <template #default="scope">
                  <span>{{
                      scope.row.sex? scope.row.sex : "无"
                    }}</span>
                </template>
              </el-table-column>

              <el-table-column
                  prop="avatar"
                  label="头像"
                  align="center"
                  width="150"
              >
                <template #default="scope">
                  <span>{{
                      scope.row.avatar? scope.row.avatar : "无"
                    }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="userType"
                  label="用户类型"
                  align="center"
                  width="200"
              ><template #default="scope">
                  <span>{{
                      scope.row.userType === "0" ? "管理员" : "普通用户"
                    }}</span>
              </template>
              </el-table-column>
              <el-table-column
                  prop="createBy"
                  label="创建人id"
                  align="center"
                  width="200"
              >
                <template #default="scope">
                  <span>{{
                      scope.row.createBy? scope.row.createBy : "无"
                    }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="createTime"
                  label="创建时间"
                  align="center"
                  width="200"
              >
                <template #default="scope">
                  <span style="margin-left: 10px">{{
                      scope.row.createTime ? scope.row.createTime : "无"
                    }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="updateBy"
                  label="更新人id"
                  align="center"
                  width="200"
              >
                <template #default="scope">
                  <span>{{
                      scope.row.updateBy? scope.row.updateBy : "无"
                    }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="updateTime"
                  label="更新时间"
                  align="center"
                  width="200"
              >
                <template #default="scope">
                  <span style="margin-left: 10px">{{
                      scope.row.updateTime ? scope.row.updateTime : "无"
                    }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="delFlag"
                  label="删除标志"
                  align="center"
                  width="120"
              >
                <template #default="scope">
                  <span>{{
                      scope.row.delFlag == 1 ? "已删除" : "未删除"
                    }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="300">
                <template #default="scope">
                  <el-button
                      size="small"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-popconfirm
                      title="确认删除吗？"
                      confirm-button-text="确认"
                      cancel-button-text="取消"
                      @confirm="handleDelete(scope.$index, scope.row)"
                  >
                    <template #reference>
                      <el-button
                          size="small"
                          type="danger"
                      >
                        删除
                      </el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row justify="end" class="pagination">
            <el-pagination
                background
                @update:current-page="handleCurrentChange"
                @update:page-size="handleSizeChange"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[1, 10, 20, 40]"
                :pager-count="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems"
            ></el-pagination>

          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.staff-main {
  padding: 20px;
  height: 100%;
}
.container {
  position: relative;
  // height: calc(100vh - 59px - 58px);
  height: max-content;
}
// aside和main的分割线
// .container::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 1px;
//   height: calc(100vh - 200px);
//   background-color: #dfdfdf;
// }
.pagination {
  top: 8px;
}
.the-table {
  // 100可视高度-ManageHeader高度-面包屑高度-查询功能栏高度-分页高度-padding(staff-main)*2
  height: calc(100vh - 59px - 58px - 182px - 38px - 20 * 2px);
}
</style>
