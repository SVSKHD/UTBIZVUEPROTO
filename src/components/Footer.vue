<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <span class="brand-text">
          <span class="ut">UT</span><span class="biz">BIZ</span>
        </span>
        <p class="brand-tagline">Premium Trading Solutions</p>
      </div>
      <div class="footer-links">
        <Button class="premium-btn-sm" label="Terms" />
        <Button class="premium-btn-sm" label="Privacy" />
        <Button class="premium-btn-sm" label="Support" />
      </div>
      <div class="footer-copyright">
        © {{ new Date().getFullYear() }} UTBIZ. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #0c0c0c;
  padding: 2rem;
  border-top: 1px solid rgba(226, 223, 208, 0.1);
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.brand-text {
  font-family: "Mulish", sans-serif;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.ut {
  color: #0c0c0c;
  -webkit-text-stroke: 1.5px #f97300;
  text-shadow: 0 0 15px rgba(249, 115, 0, 0.3);
}

.biz {
  color: #e2dfd0;
  text-shadow: 0 0 15px rgba(226, 223, 208, 0.3);
}

.brand-tagline {
  font-size: 0.8rem;
  color: #e2dfd0;
  opacity: 0.8;
  letter-spacing: 1px;
}

.footer-links {
  display: flex;
  gap: 1rem;
}

.footer-copyright {
  font-size: 0.8rem;
  color: #e2dfd0;
  opacity: 0.6;
}

:deep(.premium-btn-sm) {
  background-color: transparent !important;
  border: 1px solid #e2dfd0 !important;
  color: #e2dfd0 !important;
  transition: all 0.3s ease !important;
  font-size: 0.8rem !important;
  padding: 0.3rem 0.8rem !important;
  position: relative;
  overflow: hidden;
}

:deep(.premium-btn-sm:hover) {
  background-color: #e2dfd0 !important;
  color: #0c0c0c !important;
  transform: translateY(-2px);
}

:deep(.premium-btn-sm::before) {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 1px;
  background-color: #fff;
  transition: all 0.5s ease;
}

:deep(.premium-btn-sm:hover::before) {
  left: 100%;
}
</style>
