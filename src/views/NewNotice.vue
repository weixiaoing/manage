<script setup>
// 引入了 Quill 编辑器，以及 QuillEditor 组件，并引入相应的 CSS 样式
import { QuillEditor } from '@vueup/vue-quill'
import { ref, reactive } from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { NoticeService } from '@/api/api'
//定义内容
let content = ref('')
// 公告标题
let title = ref('')
// 添加公告功能
const addNotice = async () => {
  // 如果标题为空，内容为空
  if (title.value == '' || content.value == '') {
    ElMessage({
      message: '标题和内容不能为空',
      type: 'error'
    })
    return
  }
  // 发送添加公告请求
  const res = await NoticeService.noticeCreate({
    title: title.value,
    content: content.value
  })
  if (res.code == 200) {
    ElMessage({
      message: '发布成功',
      type: 'success'
    })
    // 请求成功后，设置内容为空
    content.value = ''
    title.value = ''
  }
}
// 编辑器配置
const editorOptions = reactive({
  modules: {
    toolbar: [
      // 工具栏配置
      ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 粗体、斜体、下划线、删除线
      [{ header: 1 }, { header: 2 }], // 标题1和标题2
      [{ list: 'ordered' }, { list: 'bullet' }], // 有序列表和无序列表
      [{ script: 'sub' }, { script: 'super' }], // 上标和下标
      [{ indent: '-1' }, { indent: '+1' }], // 缩进
      [{ direction: 'rtl' }], // 文字方向
      [{ size: ['small', false, 'large', 'huge'] }], // 字号
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题等级
      [{ color: [] }, { background: [] }], // 字体颜色和背景色
      [{ font: [] }], // 字体
      [{ align: [] }], // 对齐方式
      ['clean'], // 清除格式,
      ['link', 'image', 'video']
    ]
  }
})
</script>

<template>
  <div class="container">
    <!-- 引入了 QuillEditor 组件，通过 :options 属性传递编辑器的选项参数，通过 v-model:content 实现双向绑定编辑器中的内容content 变量 -->
    <div class="title">
      <span>公告标题:</span><el-input v-model="title" spaceholder="请输入公告标题"></el-input>
    </div>
    <div class="content">
      <!-- 使用编辑器组件 -->
      <quill-editor
        style="min-height: 70vh"
        v-model:content="content"
        contentType="html"
        placeholder="请输入公告内容"
        :options="editorOptions"
      ></quill-editor>
    </div>
    <el-button type="primary" @click="addNotice">发布</el-button>
  </div>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  gap: 20px;
  span {
    width: 100px;
  }
  width: 500px;
  align-items: center;
}
.container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 80%;
  gap: 20px;
}
.content {
  overflow: hidden;
}
</style>
