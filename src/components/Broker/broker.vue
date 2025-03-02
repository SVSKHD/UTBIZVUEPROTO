<template>
  <div class="broker">
    <h2>{{ props.broker.name }}</h2>
  </div>
</template>

<script setup lang="ts">
interface Broker {
    name: string;
}

import { defineProps } from 'vue';

const props = defineProps<{
    broker: Broker;
}>();
</script>

<style scoped>
.broker {
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  color: #333;
}
</style>