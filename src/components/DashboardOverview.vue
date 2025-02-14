<script setup lang="ts">
const todayBalance = {
  value: 1250000,
  change: 1.2
};

const stats = [
  {
    label: 'Total Value',
    value: '₹12,50,000',
    icon: 'pi pi-wallet'
  },
  {
    label: "Today's P&L",
    value: '₹15,000',
    change: 1.2,
    icon: 'pi pi-chart-line'
  },
  {
    label: 'Available Funds',
    value: '₹2,70,000',
    icon: 'pi pi-money-bill'
  }
];
</script>

<template>
  <div class="overview">
    <div class="balance-card">
      <div class="balance-header">Today's Balance</div>
      <div class="balance-amount">
        ₹{{ todayBalance.value.toLocaleString('en-IN') }}
        <span class="change">+{{ todayBalance.change }}%</span>
      </div>
    </div>
    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-icon">
          <i :class="stat.icon"></i>
        </div>
        <div class="stat-info">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">
            {{ stat.value }}
            <span v-if="stat.change" class="change">+{{ stat.change }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.balance-card {
  background: #F97300;
  padding: 1.5rem;
  border-radius: 8px;
  color: #0C0C0C;
}

.balance-header {
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  color:white;
  font-weight:bold;
}

.balance-amount {
  font-size: 2rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 1rem;
  color:white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-card {
  background: #0C0C0C;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(226, 223, 208, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 40px;
  height: 40px;
  background: rgba(249, 115, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F97300;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #E2DFD0;
  opacity: 0.7;
  margin-bottom: 0.25rem;
  font-weight: 300;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 400;
  color: #E2DFD0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.change {
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}
</style>