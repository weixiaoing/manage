<script setup>
import { onMounted, ref } from 'vue'
import { KeyService } from '@/api/api'
// 表数据data
let data = ref([])
// 表行数据
let row = ref({})
// 获取关键词列表函数
const getKeyList = async () => {
  // 获取所有关键词列表并赋值给data
  let res = await KeyService.getKeys({ name: '', status: [0, 1, 2, 3, 4, 5] })
  // 遍历响应值，赋值data，各种属性
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
// 设置状态码，传入行数据，和设置状态码的值
const setStatus = async (row, option) => {
  // 传入状态码id，原因目前设置为空，状态码给后端
  const res = await KeyService.audit({ id: row.id, reason: '', status: option })
  if (res.code === 200) {
    // 请求成功重新获取关键词列表
    getKeyList()
    ElMessage({
      message: '操作成功',
      type: 'success'
    })
  }
}
// 对状态码进行汉化 传入状态码，返回对应的中文意思
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

// 展开弹出层
const popShow = async (e) => {
  // 获取关键词详情，赋值给row
  const res = await KeyService.getDetail(e.id)
  row.value = res.data
  console.log(row.value)
  // ，弹出层展开
  dialogTableVisible.value = true
}
// 默认弹出层关闭
const dialogTableVisible = ref(false)
// 筛选行数据和选择的状态一致的关键词
const filterHandler = (value, row) => {
  return row.status == value
}

onMounted(() => {
  // 初始时获取关键词列表
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
        <el-col :span="12"> 关键词状态:{{ formatStatus(row.keywordStatus) }} </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12"> 申请时间:{{ row.applicationTime }} </el-col></el-row
      >

      <el-scrollbar v-if="row.workInfoVOS.length != 0" height="300px">
        <!-- 遍历作品列表 -->
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
  <!-- 每行点开，对应弹出层打开 -->
  <el-table :data="data" style="width: 100%; height: 100%" @row-click="popShow">
    <el-table-column prop="name" label="关键词" width="150" />
    <el-table-column prop="bookName" label="书名" width="150" max-height="20" />
    <el-table-column prop="earnings" label="收益(元)" width="150" />
    <el-table-column prop="nums" label="拉新人数" width="100" />
    <el-table-column prop="applicationTime" label="申请时间" width="300" />
    <!-- 根据状态码筛选数据 -->
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
      <!-- 更具状态码渲染标签 -->
      <template v-slot="scope">
        <el-tag :type="scope.row.status === 1 || scope.row.status === 4 ? 'success' : 'danger'">{{
          formatStatus(scope.row.status)
        }}</el-tag>
      </template>
    </el-table-column>
    <!-- 审核操作 -->
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
