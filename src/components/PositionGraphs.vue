<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const openPositionsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'P&L',
      data: [12500, 15000, 13800, 16200, 14500],
      borderColor: '#22C55E',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
};

const closedPositionsData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Realized P&L',
      data: [45000, 52000, 48000, 55000],
      borderColor: '#F97300',
      backgroundColor: 'rgba(249, 115, 0, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        color: '#E2DFD0'
      }
    }
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(226, 223, 208, 0.1)'
      },
      ticks: {
        color: '#E2DFD0'
      }
    },
    x: {
      grid: {
        color: 'rgba(226, 223, 208, 0.1)'
      },
      ticks: {
        color: '#E2DFD0'
      }
    }
  }
};
</script>

<template>
  <div class="graphs-container">
    <div class="graph-card">
      <h3>Open Positions P&L</h3>
      <div class="chart-wrapper">
        <Line :data="openPositionsData" :options="chartOptions" />
      </div>
    </div>
    <div class="graph-card">
      <h3>Closed Positions P&L</h3>
      <div class="chart-wrapper">
        <Line :data="closedPositionsData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.graphs-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
}

.graph-card {
  background: #0C0C0C;
  border: 1px solid rgba(226, 223, 208, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
}

.graph-card h3 {
  color: #E2DFD0;
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.chart-wrapper {
  height: 300px;
}
</style>