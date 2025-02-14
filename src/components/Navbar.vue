<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = new Date().toLocaleTimeString();
const showBrokerDialog = ref(false);
const showProfileDialog = ref(false);
const showAIDialog = ref(false);

const selectedTimeZone = ref('IST');
const selectedBroker = ref('Zerodha');

const newBroker = ref({
  name: '',
  apiKey: '',
  secretKey: ''
});

const addBroker = () => {
  // Handle broker addition logic here
  showBrokerDialog.value = false;
  newBroker.value = { name: '', apiKey: '', secretKey: '' };
};

const navigateTo = (route: string) => {
  router.push(route);
};
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="nav-top">
        <div class="brand" @click="navigateTo('/')">
          <span class="brand-text">
            <span class="ut">UT</span><span class="biz">BIZ</span>
          </span>
        </div>
        <div class="nav-time">
          {{ currentTime }}
        </div>
      </div>
      <div class="nav-bottom">
        <div class="nav-items">
          <Button class="premium-btn" label="Dashboard" icon="pi pi-chart-line" @click="navigateTo('/')" />
          <Button class="premium-btn" label="Calendar" icon="pi pi-calendar" @click="navigateTo('/calendar')" />
          <Button class="premium-btn" label="Markets" icon="pi pi-chart-bar" @click="navigateTo('/markets')" />
          <Button class="premium-btn" @click="showBrokerDialog = true" label="Add Broker" icon="pi pi-plus" />
          <Button class="premium-btn" @click="showAIDialog = true" label="AI Assistant" icon="pi pi-bolt" />
          <Button class="premium-btn" @click="showProfileDialog = true" label="Profile" icon="pi pi-user" />
        </div>
      </div>
    </div>

    <!-- Broker Dialog -->
    <Dialog v-model:visible="showBrokerDialog" header="Add New Broker" modal class="broker-dialog">
      <div class="dialog-content">
        <div class="input-group">
          <label>Broker Name</label>
          <InputText v-model="newBroker.name" placeholder="Enter broker name" />
        </div>
        <div class="input-group">
          <label>API Key</label>
          <InputText v-model="newBroker.apiKey" type="password" placeholder="Enter API key" />
        </div>
        <div class="input-group">
          <label>Secret Key</label>
          <InputText v-model="newBroker.secretKey" type="password" placeholder="Enter secret key" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" @click="showBrokerDialog = false" class="p-button-text" />
        <Button label="Add Broker" @click="addBroker" class="p-button-primary" />
      </template>
    </Dialog>

    <!-- Profile Dialog -->
    <Dialog v-model:visible="showProfileDialog" header="Profile Settings" modal class="profile-dialog">
      <div class="dialog-content">
        <div class="profile-section">
          <div class="profile-header">
            <i class="pi pi-user profile-avatar"></i>
            <div class="profile-info">
              <h3>John Doe</h3>
              <p>Premium Member</p>
            </div>
          </div>
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-label">Total Trades</span>
              <span class="stat-value">1,234</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Win Rate</span>
              <span class="stat-value">68.5%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Net P&L</span>
              <span class="stat-value positive">₹2,45,000</span>
            </div>
          </div>
          <div class="profile-settings">
            <h4>Account Settings</h4>
            <div class="input-group">
              <label>Email</label>
              <InputText value="john.doe@example.com" disabled />
            </div>
            <div class="input-group">
              <label>Time Zone</label>
              <Dropdown v-model="selectedTimeZone" :options="['IST', 'UTC', 'EST', 'PST']" placeholder="Select Time Zone" />
            </div>
            <div class="input-group">
              <label>Default Broker</label>
              <Dropdown v-model="selectedBroker" :options="['Zerodha', 'Fyers', 'Dhan']" placeholder="Select Default Broker" />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="Close" @click="showProfileDialog = false" class="p-button-text" />
        <Button label="Save Changes" class="p-button-primary" />
      </template>
    </Dialog>

    <!-- AI Assistant Dialog -->
    <Dialog v-model:visible="showAIDialog" header="AI Trading Assistant" modal class="ai-dialog">
      <div class="dialog-content">
        <div class="ai-section">
          <div class="ai-header">
            <i class="pi pi-bolt ai-avatar"></i>
            <div class="ai-info">
              <h3>UTBIZ AI</h3>
              <p>Your Personal Trading Assistant</p>
            </div>
          </div>
          <div class="ai-features">
            <div class="feature-card">
              <i class="pi pi-chart-line"></i>
              <h4>Market Analysis</h4>
              <p>Real-time market insights and trend analysis</p>
            </div>
            <div class="feature-card">
              <i class="pi pi-cog"></i>
              <h4>Strategy Optimization</h4>
              <p>Personalized trading strategy recommendations</p>
            </div>
            <div class="feature-card">
              <i class="pi pi-clock"></i>
              <h4>Trade Timing</h4>
              <p>Optimal entry and exit point suggestions</p>
            </div>
            <div class="feature-card">
              <i class="pi pi-shield"></i>
              <h4>Risk Management</h4>
              <p>Advanced risk assessment and position sizing</p>
            </div>
          </div>
          <div class="ai-chat">
            <div class="chat-messages">
              <div class="message ai">
                Hello! I'm your AI trading assistant. How can I help you today?
              </div>
            </div>
            <div class="chat-input">
              <InputText placeholder="Type your question..." />
              <Button icon="pi pi-send" class="p-button-rounded" />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #0C0C0C;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(226, 223, 208, 0.1);
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.nav-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
}

.brand {
  cursor: pointer;
  transition: transform 0.3s ease;
  margin: 0 auto;
}

.brand:hover {
  transform: translateY(-2px);
}

.brand-text {
  font-family: 'AntonSC', sans-serif;
  letter-spacing: 4px;
}

/* Make "UT" small and orange */
.ut {
  font-size: 3rem; /* Smaller font size */
  color: #F97300;    /* Orange color */
  font-weight: bold;
}

/* Make "BIZ" big and white */
.biz {
  font-size: 3rem;   /* Larger font size */
  color: #FFFFFF;    /* White color */
  font-weight: 900;
}


.nav-items {
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 0;
}

.nav-time {
  color: #E2DFD0;
  font-size: 0.9rem;
  opacity: 0.8;
  position: absolute;
  right: 2rem;
}

:deep(.premium-btn) {
  background-color: transparent !important;
  border: 1px solid #E2DFD0 !important;
  color: #E2DFD0 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
  padding: 0.6rem 1.2rem !important;
  font-weight: 300 !important;
  border-radius: 8px !important;
}

:deep(.premium-btn:hover) {
  background-color: #E2DFD0 !important;
  color: #0C0C0C !important;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(226, 223, 208, 0.2);
}

:deep(.premium-btn::before) {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #E2DFD0);
  transition: 0.5s;
}

:deep(.premium-btn:hover::before) {
  left: 100%;
}

/* Dialog Styles */
.dialog-content {
  padding: 1rem 0;
}

.input-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-family: 'Mulish', sans-serif;
  font-size: 0.9rem;
  color: #E2DFD0;
  font-weight: 300;
}

/* Profile Dialog Styles */
.profile-section {
  padding: 1rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.profile-avatar {
  font-size: 3rem;
  color: #F97300;
  background: rgba(249, 115, 0, 0.1);
  padding: 1rem;
  border-radius: 50%;
}

.profile-info h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #E2DFD0;
}

.profile-info p {
  margin: 0.5rem 0 0;
  color: #F97300;
  font-size: 0.9rem;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  background: rgba(226, 223, 208, 0.05);
  padding: 1rem;
  border-radius: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #E2DFD0;
  opacity: 0.7;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 500;
  color: #E2DFD0;
}

.stat-value.positive {
  color: #22C55E;
}

.profile-settings {
  background: rgba(226, 223, 208, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
}

.profile-settings h4 {
  margin: 0 0 1.5rem;
  color: #E2DFD0;
  font-size: 1.1rem;
}

/* AI Assistant Dialog Styles */
.ai-section {
  padding: 1rem;
}

.ai-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.ai-avatar {
  font-size: 3rem;
  color: #F97300;
  background: rgba(249, 115, 0, 0.1);
  padding: 1rem;
  border-radius: 50%;
}

.ai-info h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #E2DFD0;
}

.ai-info p {
  margin: 0.5rem 0 0;
  color: #F97300;
  font-size: 0.9rem;
}

.ai-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: rgba(226, 223, 208, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.feature-card i {
  font-size: 2rem;
  color: #F97300;
  margin-bottom: 1rem;
}

.feature-card h4 {
  color: #E2DFD0;
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.feature-card p {
  color: #E2DFD0;
  opacity: 0.7;
  font-size: 0.9rem;
  margin: 0;
}

.ai-chat {
  background: rgba(226, 223, 208, 0.05);
  border-radius: 8px;
  padding: 1rem;
}

.chat-messages {
  min-height: 200px;
  margin-bottom: 1rem;
}

.message {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.message.ai {
  background: rgba(249, 115, 0, 0.1);
  color: #E2DFD0;
  max-width: 80%;
}

.chat-input {
  display: flex;
  gap: 0.5rem;
}

.chat-input :deep(.p-inputtext) {
  flex: 1;
}

:deep(.p-dialog) {
  max-width: 90vw;
  width: 600px;
}

:deep(.p-dialog .p-dialog-header) {
  background: #0C0C0C;
  color: #E2DFD0;
  border-bottom: 1px solid rgba(226, 223, 208, 0.1);
}

:deep(.p-dialog .p-dialog-content) {
  background: #0C0C0C;
  color: #E2DFD0;
}

:deep(.p-dialog .p-dialog-footer) {
  background: #0C0C0C;
  border-top: 1px solid rgba(226, 223, 208, 0.1);
}

:deep(.p-dropdown) {
  width: 100%;
  background: rgba(226, 223, 208, 0.05);
}

:deep(.p-inputtext) {
  width: 100%;
  background: rgba(226, 223, 208, 0.05) !important;
  border: 1px solid rgba(226, 223, 208, 0.1) !important;
  color: #E2DFD0 !important;
}

:deep(.p-inputtext:enabled:focus) {
  box-shadow: 0 0 0 2px rgba(249, 115, 0, 0.2) !important;
  border-color: #F97300 !important;
}
</style>