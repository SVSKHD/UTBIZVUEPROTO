<script setup lang="ts">
import { ref } from 'vue';
import TradeCalendar from './TradeCalendar.vue';

const activeTab = ref('zerodha');
</script>

<template>
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
</template>

<style scoped>
.calendar-view {
  padding: 2rem;
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
  color: #E2DFD0 !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
}

:deep(.p-tabview-selected .p-tabview-nav-link) {
  background: #F97300 !important;
  color: #0C0C0C !important;
  border-color: #F97300 !important;
}
</style>