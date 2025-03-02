<template>
  <div class="app-container">
    <Navbar />
    <div class="main-content">
      <slot></slot>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0c0c0c;
}

.main-content {
  flex: 1;
  padding: 3rem;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
</style>
