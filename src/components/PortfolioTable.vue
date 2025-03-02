<script setup lang="ts">
import { ref, computed } from "vue";
import AnimatedButton from "./AnimatedButton.vue";

interface Portfolio {
  symbol: string;
  quantity: number;
  price: number;
  value: number;
}

interface Position {
  symbol: string;
  type: "BUY" | "SELL";
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
}

defineProps<{
  portfolioData: Portfolio[];
}>();

const filters = ref({
  global: { value: null, matchMode: "contains" },
});

// Sample open positions data
const openPositions = ref<Position[]>([
  {
    symbol: "NIFTY25MAY18500CE",
    type: "BUY",
    quantity: 50,
    entryPrice: 150.25,
    currentPrice: 175.5,
    pnl: 1262.5,
    pnlPercentage: 16.81,
  },
  {
    symbol: "BANKNIFTY25MAY44300PE",
    type: "SELL",
    quantity: 25,
    entryPrice: 220.75,
    currentPrice: 195.25,
    pnl: 637.5,
    pnlPercentage: 11.55,
  },
]);

const totalPnL = computed(() => {
  return openPositions.value.reduce((sum, position) => sum + position.pnl, 0);
});

const totalPnLPercentage = computed(() => {
  const totalInvestment = openPositions.value.reduce(
    (sum, position) => sum + position.entryPrice * position.quantity,
    0,
  );
  return ((totalPnL.value / totalInvestment) * 100).toFixed(2);
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
};

const getPnLClass = (value: number) => {
  return value >= 0 ? "positive" : "negative";
};
</script>

<template>
  <div class="portfolio-container">
    <!-- Holdings Table -->
    <div class="portfolio-table-container">
      <div class="table-header">
        <div class="search-wrapper">
          <i class="pi pi-search"></i>
          <InputText
            v-model="filters['global'].value"
            placeholder="Search stocks..."
            class="search-input"
          />
        </div>
      </div>
      <DataTable
        :value="portfolioData"
        :paginator="true"
        :rows="5"
        :filters="filters"
        stripedRows
        class="portfolio-table"
        :scrollable="true"
        scrollHeight="300px"
        :globalFilterFields="['symbol']"
      >
        <Column
          field="symbol"
          header="Symbol"
          sortable
          style="width: 15%"
        ></Column>
        <Column
          field="quantity"
          header="Quantity"
          sortable
          style="width: 15%"
        ></Column>
        <Column field="price" header="Price" sortable style="width: 25%">
          <template #body="{ data }">
            {{ formatCurrency(data.price) }}
          </template>
        </Column>
        <Column field="value" header="Value" sortable style="width: 25%">
          <template #body="{ data }">
            {{ formatCurrency(data.value) }}
          </template>
        </Column>
        <Column header="Actions" style="width: 20%">
          <template #body>
            <div class="action-buttons">
              <AnimatedButton
                icon="pi pi-check-circle"
                tooltip="Trade"
                color="#22C55E"
                @click="() => {}"
              />
              <AnimatedButton
                icon="pi pi-times-circle"
                tooltip="Don't Trade"
                color="#EF4444"
                @click="() => {}"
              />
              <AnimatedButton
                icon="pi pi-bolt"
                tooltip="Auto Trade"
                @click="() => {}"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Open Positions -->
    <div class="positions-container">
      <div class="positions-header">
        <h3>Open Positions</h3>
        <div class="total-pnl" :class="getPnLClass(totalPnL)">
          {{ formatCurrency(totalPnL) }} ({{ totalPnLPercentage }}%)
        </div>
      </div>
      <DataTable
        :value="openPositions"
        class="positions-table"
        :scrollable="true"
        scrollHeight="200px"
      >
        <Column field="symbol" header="Symbol" style="width: 20%"></Column>
        <Column field="type" header="Type" style="width: 10%">
          <template #body="{ data }">
            <span :class="['position-type', data.type.toLowerCase()]">
              {{ data.type }}
            </span>
          </template>
        </Column>
        <Column field="quantity" header="Qty" style="width: 10%"></Column>
        <Column field="entryPrice" header="Entry" style="width: 15%">
          <template #body="{ data }">
            {{ formatCurrency(data.entryPrice) }}
          </template>
        </Column>
        <Column field="currentPrice" header="Current" style="width: 15%">
          <template #body="{ data }">
            {{ formatCurrency(data.currentPrice) }}
          </template>
        </Column>
        <Column field="pnl" header="P&L" style="width: 15%">
          <template #body="{ data }">
            <span :class="['pnl', getPnLClass(data.pnl)]">
              {{ formatCurrency(data.pnl) }}
            </span>
          </template>
        </Column>
        <Column field="pnlPercentage" header="%" style="width: 15%">
          <template #body="{ data }">
            <span :class="['pnl', getPnLClass(data.pnlPercentage)]">
              {{ data.pnlPercentage }}%
            </span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.portfolio-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.portfolio-table-container {
  background-color: #0c0c0c;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(226, 223, 208, 0.1);
}

.table-header {
  margin-bottom: 1rem;
}

.search-wrapper {
  position: relative;
  max-width: 300px;
}

.search-wrapper i {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #e2dfd0;
  opacity: 0.7;
}

.search-input {
  width: 100%;
  padding-left: 2.5rem !important;
}

.portfolio-table {
  width: 100%;
}

.positions-container {
  background-color: #0c0c0c;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(226, 223, 208, 0.1);
}

.positions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.positions-header h3 {
  font-size: 1.1rem;
  font-weight: 400;
  color: #e2dfd0;
  margin: 0;
}

.total-pnl {
  font-size: 1rem;
  font-weight: 400;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

.position-type {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 400;
}

.position-type.buy {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.position-type.sell {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.pnl {
  font-weight: 400;
}

.positive {
  color: #22c55e;
}

.negative {
  color: #ef4444;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
</style>
