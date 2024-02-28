<script setup>
import { useMessage } from 'naive-ui'
window.onmessage = useMessage()
</script>

<template>
  <div>
    <header>test</header>

    <RouterView />
  </div>
</template>
<style scoped></style>
