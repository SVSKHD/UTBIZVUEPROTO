<template>
  <MainLayout>
    <div class="calendar-view">
      <TabView v-model:activeIndex="activeTab" class="broker-tabs">
        <TabPanel header="Zerodha">
          <TradeCalendar broker="zerodha" />
        </TabPanel>
        <TabPanel header="Fyers">
          <TradeCalendar broker="fyers" />
        </TabPanel>
        <TabPanel header="Dhan">
          <TradeCalendar broker="dhan" />
        </TabPanel>
      </TabView>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import TradeCalendar from "../components/TradeCalendar.vue";

const activeTab = ref(0);
</script>

<style scoped>
.calendar-view {
  width: 100%;
  max-width: 1400px;
}

:deep(.broker-tabs) {
  background: transparent;
}

:deep(.p-tabview-nav) {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

:deep(.p-tabview-nav-link) {
  background: rgba(226, 223, 208, 0.05) !important;
  border: 1px solid rgba(226, 223, 208, 0.1) !important;
  color: #e2dfd0 !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
}

:deep(.p-tabview-selected .p-tabview-nav-link) {
  background: #f97300 !important;
  color: #0c0c0c !important;
  border-color: #f97300 !important;
}
</style>
