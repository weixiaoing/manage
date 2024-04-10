<script setup>
import { NoticeService } from '@/api/api'
import { onMounted, ref } from 'vue'
// 定义公告列表
let noticeList = ref([])
// 获取公告列表
const getNotice = async () => {
  noticeList.value = (await NoticeService.noticeGet()).data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      createTime: item.createTime
    }
  })
}
// 删除公告
const deleteNotice = async (row) => {
  const res = await NoticeService.noticeDelete({ id: row.id })
  if (res.code == 200) {
    getNotice()
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
  }
}
onMounted(() => {
  // 初始化，获取公告列表
  getNotice()
})
</script>
<template>
  <el-table :data="noticeList" style="width: 100%; height: 100%">
    <el-table-column prop="title" label="标题" width="200" />
    <el-table-column prop="createTime" label="发布时间" width="400" />
    <el-table-column label="操作" width="200">
      <template v-slot="scope">
        <el-button link type="primary" size="small" @click="deleteNotice(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  .card-header {
    position: relative;
  }
}
</style>
