<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label?: string;
  icon?: string;
  color?: string;
  tooltip?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const defaultColor = '#F97300';
const buttonColor = computed(() => props.color || defaultColor);

const buttonClasses = computed(() => ({
  'animated-btn': true,
  'disabled': props.disabled
}));

const buttonStyles = computed(() => ({
  '--button-color': buttonColor.value
}));
</script>

<template>
  <button
    :class="buttonClasses"
    :style="buttonStyles"
    @click="(e) => !disabled && emit('click', e)"
    v-tooltip="tooltip"
  >
    <i v-if="icon" :class="icon" class="button-icon"></i>
    <span v-if="label" class="button-label">{{ label }}</span>
    <div class="button-border"></div>
    <div class="button-glow"></div>
    <div class="fire-effect"></div>
  </button>
</template>

<style scoped>
.animated-btn {
  position: relative;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 3px solid var(--button-color);
  color: var(--button-color);
  border-radius: 2rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Mulish', sans-serif;
  font-size: 1rem;
  isolation: isolate;
  min-width: 120px;
  justify-content: center;
}

.animated-btn:hover {
  box-shadow: 0 0 30px rgba(var(--button-color), 0.4);
  transform: translateY(-2px);
}

.button-border {
  position: absolute;
  inset: -4px;
  border: 4px solid var(--button-color);
  border-radius: 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.button-glow {
  position: absolute;
  inset: -4px;
  border-radius: 2rem;
  background: conic-gradient(
    from 0deg at 50% 50%,
    transparent 0%,
    var(--button-color) 25%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: rotate 1s linear infinite;
  z-index: -1;
  filter: blur(3px);
}

.fire-effect {
  position: absolute;
  inset: -6px;
  border-radius: 2rem;
  background: repeating-conic-gradient(
    from 0deg at 50% 50%,
    var(--button-color) 0deg,
    transparent 10deg,
    var(--button-color) 20deg
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: fireRotate 0.5s linear infinite;
  z-index: -2;
  filter: blur(4px);
}

.animated-btn:hover .button-border {
  opacity: 1;
  animation: borderRotate 1s linear infinite;
}

.animated-btn:hover .button-glow {
  opacity: 0.4;
}

.animated-btn:hover .fire-effect {
  opacity: 0.2;
}

.button-icon {
  font-size: 1.2rem;
  position: relative;
  z-index: 1;
}

.button-label {
  position: relative;
  z-index: 1;
  font-weight: 500;
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.disabled:hover {
  transform: none;
  box-shadow: none;
}

.disabled .button-border,
.disabled .button-glow,
.disabled .fire-effect {
  display: none;
}

@keyframes borderRotate {
  0% {
    clip-path: inset(0 0 97% 0);
  }
  25% {
    clip-path: inset(0 97% 0 0);
  }
  50% {
    clip-path: inset(97% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 97%);
  }
  100% {
    clip-path: inset(0 0 97% 0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fireRotate {
  from {
    transform: rotate(0deg) scale(1.15);
  }
  to {
    transform: rotate(360deg) scale(1.15);
  }
}
</style>