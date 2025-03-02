<template>
  <MainLayout>
    <div class="markets-view">
      <div class="markets-header">
        <h2>Market Overview</h2>
        <div class="search-container">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="searchQuery" placeholder="Search symbol..." />
          </span>
        </div>
      </div>

      <div class="market-indices">
        <div v-for="index in indices" :key="index.symbol" class="index-card">
          <div class="index-info">
            <h3>{{ index.symbol }}</h3>
            <div
              :class="[
                'index-change',
                index.change >= 0 ? 'positive' : 'negative',
              ]"
            >
              {{ index.change >= 0 ? "+" : "" }}{{ index.change }}%
            </div>
          </div>
          <div class="index-price">{{ formatPrice(index.price) }}</div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-header">
          <div class="symbol-info">
            <h3>{{ selectedSymbol }}</h3>
            <div
              :class="[
                'price-change',
                selectedSymbolData.change >= 0 ? 'positive' : 'negative',
              ]"
            >
              {{ formatPrice(selectedSymbolData.price) }}
              <span
                >{{ selectedSymbolData.change >= 0 ? "+" : ""
                }}{{ selectedSymbolData.change }}%</span
              >
            </div>
          </div>
          <div class="chart-controls">
            <Button
              v-for="interval in timeIntervals"
              :key="interval"
              :label="interval"
              :class="[
                'interval-btn',
                { active: selectedInterval === interval },
              ]"
              @click="selectedInterval = interval"
            />
          </div>
        </div>
        <div class="chart">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="market-movers">
        <div class="movers-header">
          <h3>Market Movers</h3>
          <TabView v-model:activeIndex="activeMoversTab">
            <TabPanel header="Top Gainers">
              <DataTable :value="topGainers" :paginator="true" :rows="5">
                <Column field="symbol" header="Symbol"></Column>
                <Column field="price" header="Price">
                  <template #body="{ data }">
                    {{ formatPrice(data.price) }}
                  </template>
                </Column>
                <Column field="change" header="Change">
                  <template #body="{ data }">
                    <span
                      :class="[
                        'change-value',
                        data.change >= 0 ? 'positive' : 'negative',
                      ]"
                    >
                      {{ data.change >= 0 ? "+" : "" }}{{ data.change }}%
                    </span>
                  </template>
                </Column>
                <Column field="volume" header="Volume">
                  <template #body="{ data }">
                    {{ formatVolume(data.volume) }}
                  </template>
                </Column>
              </DataTable>
            </TabPanel>
            <TabPanel header="Top Losers">
              <DataTable :value="topLosers" :paginator="true" :rows="5">
                <Column field="symbol" header="Symbol"></Column>
                <Column field="price" header="Price">
                  <template #body="{ data }">
                    {{ formatPrice(data.price) }}
                  </template>
                </Column>
                <Column field="change" header="Change">
                  <template #body="{ data }">
                    <span
                      :class="[
                        'change-value',
                        data.change >= 0 ? 'positive' : 'negative',
                      ]"
                    >
                      {{ data.change >= 0 ? "+" : "" }}{{ data.change }}%
                    </span>
                  </template>
                </Column>
                <Column field="volume" header="Volume">
                  <template #body="{ data }">
                    {{ formatVolume(data.volume) }}
                  </template>
                </Column>
              </DataTable>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const searchQuery = ref("");
const selectedSymbol = ref("NIFTY50");
const selectedInterval = ref("1D");
const activeMoversTab = ref(0);

const timeIntervals = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

// Sample data
const indices = ref([
  { symbol: "NIFTY50", price: 19850.25, change: 1.2 },
  { symbol: "BANKNIFTY", price: 44250.75, change: -0.8 },
  { symbol: "FINNIFTY", price: 20150.5, change: 0.5 },
]);

const selectedSymbolData = computed(() => {
  return (
    indices.value.find((index) => index.symbol === selectedSymbol.value) ||
    indices.value[0]
  );
});

const topGainers = ref([
  { symbol: "RELIANCE", price: 2457.85, change: 3.2, volume: 5250000 },
  { symbol: "TCS", price: 3890.25, change: 2.8, volume: 1850000 },
  { symbol: "HDFCBANK", price: 1680.75, change: 2.5, volume: 3150000 },
  { symbol: "INFY", price: 1475.3, change: 2.1, volume: 2750000 },
  { symbol: "ICICIBANK", price: 1025.8, change: 1.9, volume: 4150000 },
]);

const topLosers = ref([
  { symbol: "TATASTEEL", price: 125.3, change: -2.8, volume: 6250000 },
  { symbol: "HINDALCO", price: 485.25, change: -2.5, volume: 3850000 },
  { symbol: "COALINDIA", price: 245.75, change: -2.2, volume: 5150000 },
  { symbol: "ONGC", price: 175.4, change: -1.9, volume: 4750000 },
  { symbol: "NTPC", price: 195.6, change: -1.7, volume: 3950000 },
]);

// Chart data
const chartData = {
  labels: [
    "9:15",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "15:30",
  ],
  datasets: [
    {
      label: selectedSymbol.value,
      data: [19750, 19800, 19825, 19790, 19815, 19845, 19860, 19850],
      borderColor: "#F97300",
      backgroundColor: "rgba(249, 115, 0, 0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        color: "rgba(226, 223, 208, 0.1)",
      },
      ticks: {
        color: "#E2DFD0",
      },
    },
    x: {
      grid: {
        color: "rgba(226, 223, 208, 0.1)",
      },
      ticks: {
        color: "#E2DFD0",
      },
    },
  },
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(price);
};

const formatVolume = (volume: number) => {
  if (volume >= 10000000) {
    return `${(volume / 10000000).toFixed(2)}Cr`;
  }
  if (volume >= 100000) {
    return `${(volume / 100000).toFixed(2)}L`;
  }
  return volume.toLocaleString("en-IN");
};
</script>

<style scoped>
.markets-view {
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.markets-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.markets-header h2 {
  color: #e2dfd0;
  font-size: 1.8rem;
  margin: 0;
}

.search-container {
  width: 300px;
}

.market-indices {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.index-card {
  background: rgba(226, 223, 208, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.index-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.index-info h3 {
  margin: 0;
  color: #e2dfd0;
  font-size: 1.2rem;
}

.index-change {
  font-size: 1rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

.index-price {
  font-size: 1.5rem;
  color: #e2dfd0;
  font-weight: 500;
}

.chart-container {
  background: rgba(226, 223, 208, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.symbol-info h3 {
  margin: 0 0 0.5rem;
  color: #e2dfd0;
  font-size: 1.4rem;
}

.price-change {
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.price-change span {
  font-size: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

.chart-controls {
  display: flex;
  gap: 0.5rem;
}

.interval-btn {
  background: transparent !important;
  border: 1px solid rgba(226, 223, 208, 0.1) !important;
  color: #e2dfd0 !important;
  padding: 0.4rem 0.8rem !important;
  font-size: 0.9rem !important;
}

.interval-btn.active {
  background: #f97300 !important;
  border-color: #f97300 !important;
  color: #0c0c0c !important;
}

.chart {
  height: 400px;
}

.market-movers {
  background: rgba(226, 223, 208, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
}

.movers-header h3 {
  margin: 0 0 1.5rem;
  color: #e2dfd0;
  font-size: 1.4rem;
}

.positive {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.negative {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.change-value {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: 500;
}
</style>
