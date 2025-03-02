<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const props = defineProps<{
  broker: string;
}>();

interface Trade {
  title: string;
  date: string;
  pnl: number;
  details: string;
}

// Function to generate random trades for a specific date
const generateTradesForDate = (date: string): Trade => {
  const symbols = [
    "NIFTY",
    "BANKNIFTY",
    "RELIANCE",
    "TCS",
    "INFY",
    "HDFC",
    "ICICI",
    "SBIN",
  ];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const pnl = Math.floor(Math.random() * 20000) - 10000; // Random P&L between -10000 and +10000
  const percentChange = (Math.random() * 10 - 5).toFixed(1); // Random % between -5% and +5%

  return {
    title: `${symbol} ${Math.random() > 0.5 ? "CE" : "PE"}`,
    date,
    pnl,
    details: `${pnl >= 0 ? "+" : ""}₹${pnl.toLocaleString("en-IN")} (${Number(percentChange) >= 0 ? "+" : ""}${percentChange}%)`,
  };
};

// Generate trades for the current month
const generateMonthTrades = (): Trade[] => {
  const trades: Trade[] = [];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();

  // Generate trades for random days in the month
  for (let i = 0; i < 15; i++) {
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    trades.push(generateTradesForDate(dateStr));
  }

  return trades;
};

// Initialize trade data for each broker
const tradeData = ref<Record<string, Trade[]>>({
  zerodha: generateMonthTrades(),
  fyers: generateMonthTrades(),
  dhan: generateMonthTrades(),
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const currentBrokerTrades = computed(() => {
  const brokerKey = props.broker.toLowerCase();
  return (
    tradeData.value[brokerKey]?.map((trade) => ({
      title: trade.title,
      date: trade.date,
      backgroundColor:
        trade.pnl >= 0 ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
      borderColor: trade.pnl >= 0 ? "#22C55E" : "#EF4444",
      textColor: "#E2DFD0",
      extendedProps: {
        pnl: trade.pnl,
        details: trade.details,
        isProfit: trade.pnl >= 0,
      },
    })) || []
  );
});

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
  initialView: "dayGridMonth",
  events: currentBrokerTrades.value,
  themeSystem: "bootstrap5",
  headerToolbar: {
    left: "customPrev,customNext today",
    center: "title",
    right: "dayGridMonth",
  },
  customButtons: {
    customPrev: {
      text: "←", // You can also use an HTML string here if needed
      click: function () {
        calendarApi.value.prev();
      },
    },
    customNext: {
      text: "→",
      click: function () {
        calendarApi.value.next();
      },
    },
  },
  editable: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  eventDisplay: "block",
  height: "auto",
  contentHeight: 800,
  eventContent: (arg: any) => {
    const isProfit = arg.event.extendedProps.isProfit;
    const pnl = formatCurrency(arg.event.extendedProps.pnl);
    const arrowIcon = isProfit ? "↑" : "↓";

    return {
      html: `
        <div class="trade-event ${isProfit ? "profit" : "loss"}">
          <div class="trade-title">${arg.event.title}</div>
          <div class="trade-pnl">
            <span class="arrow-icon">${arrowIcon}</span>
            <span class="pnl-amount">${isProfit ? "+" : ""}${pnl}</span>
          </div>
        </div>
      `,
    };
  },
}));

// Statistics
const stats = computed(() => {
  const trades = tradeData.value[props.broker.toLowerCase()] || [];
  const totalTrades = trades.length;
  const profitableTrades = trades.filter((t) => t.pnl >= 0).length;
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);

  return {
    totalTrades,
    profitableTrades,
    winRate:
      totalTrades > 0
        ? ((profitableTrades / totalTrades) * 100).toFixed(1)
        : "0.0",
    totalPnL,
  };
});
</script>

<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <h2>Trade Calendar - {{ broker }}</h2>
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-label">Total Trades</div>
          <div class="stat-value">{{ stats.totalTrades }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Win Rate</div>
          <div class="stat-value">{{ stats.winRate }}%</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Net P&L</div>
          <div
            class="stat-value"
            :class="{
              'text-green': stats.totalPnL > 0,
              'text-red': stats.totalPnL < 0,
            }"
          >
            {{ formatCurrency(stats.totalPnL) }}
          </div>
        </div>
      </div>
    </div>
    <div class="calendar-wrapper">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  background: #0c0c0c;
  border: 1px solid rgba(226, 223, 208, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
}

.calendar-header {
  margin-bottom: 2rem;
}

.calendar-header h2 {
  color: #e2dfd0;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.stat-card {
  background: rgba(226, 223, 208, 0.05);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.stat-label {
  color: #e2dfd0;
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
}

.stat-value {
  color: #e2dfd0;
  font-size: 1.2rem;
  font-weight: 500;
}

.text-green {
  color: #22c55e;
}

.text-red {
  color: #ef4444;
}

.calendar-wrapper {
  min-height: 800px;
  margin-top: 1rem;
}

.trade-event {
  margin: 2px;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 0.85rem;
  border-width: 1px;
  border-style: solid;
  transition: transform 0.2s ease;
}

.trade-event:hover {
  transform: translateY(-2px);
}

.trade-event.profit {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
}

.trade-event.loss {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.trade-title {
  font-weight: 500;
  margin-bottom: 4px;
  color: #e2dfd0;
}

.trade-pnl {
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.arrow-icon {
  margin-right: 4px;
  font-size: 1.1rem;
  font-weight: bold;
}

.trade-event.profit .arrow-icon {
  color: #22c55e;
}

.trade-event.loss .arrow-icon {
  color: #ef4444;
}

.pnl-amount {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  color: #e2dfd0;
}

.profit .pnl-amount {
  background: rgba(34, 197, 94, 0.2);
}

.loss .pnl-amount {
  background: rgba(239, 68, 68, 0.2);
}
</style>
