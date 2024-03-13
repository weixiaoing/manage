<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { KeyService } from '@/api/api'
const getKeyList = async () => {
  let res = await KeyService.getKeys({ name: '', status: [0] })
  data.value = res.data.map((item) => {
    return {
      name: item.keyword,
      bookName: item.bookName,
      applicationTime: item.applicationTime,
      id: item.id,
      status: item.keywordStatus
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
let data = ref([])
onMounted(() => {
  getKeyList()
})
</script>
<template>
  <el-table :data="data" style="width: 100%; height: 100%">
    <el-table-column prop="name" label="关键词" width="150" />
    <el-table-column prop="bookName" label="书名" width="150" />
    <el-table-column prop="applicationTime" label="申请时间" width="300" />
    <el-table-column label="操作" width="200">
      <template v-slot="scope">
        <el-button link type="primary" size="small" @click="setStatus(scope.row, 1)"
          >通过</el-button
        >
        <el-button link type="primary" size="small" @click="setStatus(scope.row, 2)"
          >驳回</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
