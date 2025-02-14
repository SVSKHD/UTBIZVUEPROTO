<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  document.title = 'UTBIZ | Trade-Home'
})

</script>