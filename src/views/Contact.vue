<template>
  <MainLayout>
    <div class="contact-view">
      <div class="hawk-background">
        <div class="contact-container">
          <div class="contact-content">
            <div class="contact-header">
              <h1>Contact Us</h1>
              <p class="forex-description">
                Experience the power of professional Forex Trading with UTBIZ.
                Our advanced platform provides real-time market data,
                sophisticated technical analysis tools, and seamless execution
                for currency pairs trading. Join thousands of successful traders
                who trust our robust infrastructure and expert support for their
                Forex trading journey.
              </p>
              <div class="features-grid">
                <div class="feature-item">
                  <i class="pi pi-chart-line"></i>
                  <span>Real-time Forex Charts</span>
                </div>
                <div class="feature-item">
                  <i class="pi pi-clock"></i>
                  <span>24/7 Market Access</span>
                </div>
                <div class="feature-item">
                  <i class="pi pi-shield"></i>
                  <span>Secure Trading</span>
                </div>
                <div class="feature-item">
                  <i class="pi pi-users"></i>
                  <span>Expert Support</span>
                </div>
              </div>
            </div>
            <div class="contact-form">
              <h2>Get in Touch</h2>
              <div class="form-group">
                <label>Name</label>
                <InputText
                  v-model="formData.name"
                  placeholder="Enter your name"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <InputText
                  v-model="formData.email"
                  placeholder="Enter your email"
                />
              </div>
              <div class="form-group">
                <label>Phone</label>
                <InputText
                  v-model="formData.phone"
                  placeholder="Enter your phone number"
                />
              </div>
              <div class="form-group">
                <label>Message</label>
                <Textarea
                  v-model="formData.message"
                  rows="5"
                  placeholder="How can we help you?"
                />
              </div>
              <AnimatedButton
                label="Send Message"
                icon="pi pi-send"
                @click="submitForm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import AnimatedButton from "../components/AnimatedButton.vue";

const formData = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const submitForm = () => {
  // Handle form submission
  console.log("Form submitted:", formData.value);
};
</script>

<style scoped>
.contact-view {
  width: 100%;
  min-height: calc(100vh - 200px);
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  margin: 0 2rem;
}

.hawk-background {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 200px);
  background:
    linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)),
    url("https://images.unsplash.com/photo-1611689342806-0863700ce1e4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
      center/cover no-repeat;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.contact-container {
  width: 100%;
  max-width: 1400px;
  position: relative;
  z-index: 2;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  background: rgba(10, 10, 10, 0.4);
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(226, 223, 208, 0.1);
}

.contact-header {
  padding: 2rem;
  background: rgba(226, 223, 208, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.contact-header h1 {
  font-size: 3rem;
  color: #e2dfd0;
  margin: 0 0 2rem;
  font-weight: 600;
  position: relative;
}

.contact-header h1::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 60px;
  height: 4px;
  background: #f97300;
  border-radius: 4px;
}

.forex-description {
  color: #e2dfd0;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #e2dfd0;
  background: rgba(249, 115, 0, 0.1);
  padding: 1rem;
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-4px);
}

.feature-item i {
  font-size: 1.5rem;
  color: #f97300;
  background: rgba(249, 115, 0, 0.2);
  padding: 1rem;
  border-radius: 12px;
}

.feature-item span {
  font-size: 1rem;
  font-weight: 500;
}

.contact-form {
  background: rgba(226, 223, 208, 0.05);
  padding: 3rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 223, 208, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.contact-form h2 {
  color: #e2dfd0;
  font-size: 2rem;
  margin: 0 0 2rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #e2dfd0;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

:deep(.p-inputtext) {
  width: 100%;
  background: rgba(10, 10, 10, 0.6) !important;
  border: 1px solid rgba(226, 223, 208, 0.2) !important;
  color: #e2dfd0 !important;
  padding: 1rem !important;
  font-size: 1rem !important;
  transition: all 0.3s ease;
  border-radius: 12px !important;
}

:deep(.p-inputtext:focus) {
  border-color: #f97300 !important;
  box-shadow: 0 0 0 2px rgba(249, 115, 0, 0.2) !important;
}

:deep(.p-inputtext:hover) {
  border-color: #f97300 !important;
}

:deep(.animated-btn) {
  width: 100%;
  margin-top: 1rem;
  height: 3.5rem;
  font-size: 1.1rem;
  border-radius: 12px !important;
}

@media (max-width: 1024px) {
  .contact-view {
    margin: 0 1rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-header {
    text-align: center;
    padding: 1rem;
  }

  .contact-header h1::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
