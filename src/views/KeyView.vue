<script setup>
import { onMounted, ref } from 'vue'
import { KeyService } from '@/api/api'
const getKeyList = async () => {
  let res = await KeyService.getKeys({ name: '', status: [0, 1, 2, 3, 4, 5] })
  data.value = res.data.map((item) => {
    return {
      name: item.keyword,
      bookName: item.bookName,
      applicationTime: item.applicationTime,
      id: item.id,
      status: item.keywordStatus,
      earnings: item.earnings,
      nums: item.nums
    }
  })
}

const setStatus = async (row, option) => {
  const res = await KeyService.audit({ id: row.id, reason: '', status: option })
  if (res.code === 200) {
    getKeyList()
    ElMessage({
      message: '操作成功',
      type: 'success'
    })
  }
}

const formatStatus = (value) => {
  switch (value) {
    case 0:
      return '审核中'
    case 1:
      return '已通过'
    case 2:
      return '已驳回'
    case 3:
      return '已取消'
    case 4:
      return '已发布'
    case 5:
      return '已失效'

    default:
      return '其他'
  }
}
let row = ref({})
const popShow = async (e) => {
  const res = await KeyService.getDetail(e.id)
  row.value = res.data
  dialogTableVisible.value = true
}
const dialogTableVisible = ref(false)
const filterHandler = (value, row) => {
  return row.status == value
}
let data = ref([])
onMounted(() => {
  getKeyList()
})
</script>
<template>
  <!-- 弹出层 -->
  <el-dialog v-model="dialogTableVisible" center title="关键词详情" width="800">
    <el-card style="padding-left: 2rem">
      <el-row class="row">
        <el-col :span="12"> 书名:{{ row.bookName }} </el-col></el-row
      >
      <el-row class="row">
        <el-col :span="12"> 关键词:{{ row.keyword }} </el-col></el-row
      >
      <el-row class="row">
        <el-col :span="12"> 关键词状态:{{ formatStatus(row.status) }} </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12"> 申请时间:{{ row.applicationTime }} </el-col></el-row
      >

      <el-scrollbar v-if="row.workInfoVOS.length != 0" height="300px">
        <el-card v-for="item in row.workInfoVOS" :key="item.id">
          <el-row>
            <el-col :span="12"> 作品名:{{ item.name }} </el-col></el-row
          >
          <el-row>
            <el-col :span="12"> 分享链接:{{ item.promotionLink }} </el-col></el-row
          >
          <el-row>
            <el-col :span="12"> 上传时间:{{ item.uploadTime }} </el-col>
          </el-row></el-card
        >
      </el-scrollbar>
    </el-card>
  </el-dialog>
  <!-- 表单 -->
  <el-table :data="data" style="width: 100%; height: 100%" @row-click="popShow">
    <el-table-column prop="name" label="关键词" width="150" />
    <el-table-column prop="bookName" label="书名" width="150" max-height="20" />
    <el-table-column prop="earnings" label="收益(元)" width="150" />
    <el-table-column prop="nums" label="拉新人数" width="100" />
    <el-table-column prop="applicationTime" label="申请时间" width="300" />
    <el-table-column
      :filters="[
        { text: '审核中', value: '0' },
        { text: '已通过', value: '1' },
        { text: '已驳回', value: '2' },
        { text: '已取消', value: '3' },
        { text: '已发布', value: '4' },
        { text: '已失效', value: '5' }
      ]"
      :filter-method="filterHandler"
      label="状态"
      width="200"
    >
      <template v-slot="scope">
        <el-tag :type="scope.row.status === 1 || scope.row.status === 4 ? 'success' : 'danger'">{{
          formatStatus(scope.row.status)
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template v-slot="scope">
        <el-button
          :disabled="scope.row.status != 0"
          link
          type="primary"
          size="small"
          @click="setStatus(scope.row, 1)"
          >通过</el-button
        >
        <el-button
          link
          :disabled="scope.row.status != 0"
          type="primary"
          size="small"
          @click="setStatus(scope.row, 2)"
          >驳回</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
.row {
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}
</style>
