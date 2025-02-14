<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  broker: string;
}>();

interface MarketData {
  symbol: string;
  change: number;
  volume: number;
  rsi: number;
}

const marketData = ref<MarketData[]>([
  { symbol: 'NIFTY50', change: 1.2, volume: 125000000, rsi: 62 },
  { symbol: 'BANKNIFTY', change: -0.8, volume: 85000000, rsi: 45 },
  { symbol: 'FINNIFTY', change: 0.5, volume: 45000000, rsi: 55 },
]);

const getChangeColor = (change: number) => {
  return change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-500';
};

const getRSIIndicator = (rsi: number) => {
  if (rsi >= 70) return 'Overbought';
  if (rsi <= 30) return 'Oversold';
  return 'Neutral';
};

const getRSIColor = (rsi: number) => {
  if (rsi >= 70) return 'text-red-500';
  if (rsi <= 30) return 'text-green-500';
  return 'text-gray-400';
};
</script>

<template>
  <div class="market-screener">
    <div class="screener-header">
      <h3>Market Screener</h3>
      <span class="broker-tag">{{ broker }}</span>
    </div>
    <div class="screener-grid">
      <div v-for="data in marketData" :key="data.symbol" class="screener-card">
        <div class="card-header">
          <span class="symbol">{{ data.symbol }}</span>
          <span :class="['change', getChangeColor(data.change)]">
            {{ data.change > 0 ? '+' : '' }}{{ data.change }}%
          </span>
        </div>
        <div class="card-content">
          <div class="metric">
            <span class="label">Volume</span>
            <span class="value">{{ (data.volume / 1000000).toFixed(1) }}M</span>
          </div>
          <div class="metric">
            <span class="label">RSI</span>
            <span :class="['value', getRSIColor(data.rsi)]">
              {{ data.rsi }} ({{ getRSIIndicator(data.rsi) }})
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.market-screener {
  background-color: #0C0C0C;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.screener-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.screener-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #E2DFD0;
}

.broker-tag {
  background-color: #F97300;
  color: #0C0C0C;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.screener-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.screener-card {
  background-color: #0C0C0C;
  border-radius: 6px;
  padding: 1rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(226, 223, 208, 0.1);
}

.screener-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.symbol {
  font-size: 1rem;
  font-weight: 500;
  color: #E2DFD0;
}

.change {
  font-size: 0.9rem;
  font-weight: 500;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric .label {
  font-size: 0.8rem;
  color: #E2DFD0;
  opacity: 0.7;
}

.metric .value {
  font-size: 0.9rem;
  font-weight: 500;
}

.text-green-500 {
  color: #10B981;
}

.text-red-500 {
  color: #EF4444;
}

.text-gray-400 {
  color: #9CA3AF;
}

.text-gray-500 {
  color: #6B7280;
}
</style>