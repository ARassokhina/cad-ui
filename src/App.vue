<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView/>
  </div>
</template>

<style scoped>
#app {
  @apply flex max-h-screen min-h-screen w-screen overflow-hidden;
  color: #2c3e50;
}
</style>
