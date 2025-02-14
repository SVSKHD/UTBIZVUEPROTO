<template>
  <MainLayout>
    <div class="dashboard">
      <div class="content-container">
        <div class="content-wrapper">
          <div class="tabs-header">
            <div class="tabs-container">
              <TabView class="broker-tabs">
                <TabPanel header="Zerodha">
                  <div class="tab-content">
                    <DashboardOverview />
                    <div class="broker-content">
                      <MarketScreener broker="Zerodha" />
                      <PositionGraphs />
                      <PortfolioTable :portfolioData="zerodhaData" />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel header="Fyers">
                  <div class="tab-content">
                    <DashboardOverview />
                    <div class="broker-content">
                      <MarketScreener broker="Fyers" />
                      <PositionGraphs />
                      <PortfolioTable :portfolioData="fyersData" />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel header="Dhan">
                  <div class="tab-content">
                    <DashboardOverview />
                    <div class="broker-content">
                      <MarketScreener broker="Dhan" />
                      <PositionGraphs />
                      <PortfolioTable :portfolioData="dhanData" />
                    </div>
                  </div>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import DashboardOverview from '../components/DashboardOverview.vue'
import MarketScreener from '../components/MarketScreener.vue'
import PositionGraphs from '../components/PositionGraphs.vue'
import PortfolioTable from '../components/PortfolioTable.vue'

// Sample data for each broker
const zerodhaData = [
  { symbol: 'RELIANCE', quantity: 100, price: 2457.85, value: 245785 },
  { symbol: 'TCS', quantity: 50, price: 3890.25, value: 194512.50 },
  { symbol: 'HDFCBANK', quantity: 75, price: 1680.75, value: 126056.25 },
  { symbol: 'INFY', quantity: 120, price: 1475.30, value: 177036 },
  { symbol: 'ICICIBANK', quantity: 150, price: 1025.80, value: 153870 },
];

const fyersData = [
  { symbol: 'BAJFINANCE', quantity: 30, price: 7285.20, value: 218556 },
  { symbol: 'BHARTIARTL', quantity: 45, price: 890.50, value: 40072.50 },
  { symbol: 'WIPRO', quantity: 60, price: 485.25, value: 29115 },
  { symbol: 'ASIANPAINT', quantity: 25, price: 3250.75, value: 81268.75 },
  { symbol: 'TATASTEEL', quantity: 80, price: 125.30, value: 10024 },
];

const dhanData = [
  { symbol: 'LT', quantity: 25, price: 3150.75, value: 78768.75 },
  { symbol: 'MARUTI', quantity: 20, price: 9875.30, value: 197506 },
  { symbol: 'SUNPHARMA', quantity: 150, price: 1142.80, value: 171420 },
  { symbol: 'TITAN', quantity: 40, value: 3275.45, value: 131018 },
  { symbol: 'ULTRACEMCO', quantity: 15, price: 8890.25, value: 133353.75 },
];
</script>

<style scoped>
.dashboard {
  width: 100%;
  max-width: 1400px;
}

.content-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-wrapper {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 223, 208, 0.05);
}

.tabs-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.tabs-container {
  width: 100%;
  display: flex;
  margin:2rem;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
}

.broker-tabs {
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
  flex: 1;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1rem;
}

.broker-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>