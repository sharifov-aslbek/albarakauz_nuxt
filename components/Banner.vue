<template>
  <div class="wave-container">
    <div class="wave"></div>
  </div>
</template>

<style scoped>
.wave-container {
  position: relative;
  width: 100%;
  height: 40px; /* Adjust height for your needs */
  overflow: hidden;
  transform: rotate(180deg); /* Rotates the wave */
  background: #FFFDDD;
}

.wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  transform: rotate(180deg);
  height: 100%;
  background: linear-gradient(to right, #feee00, #feee00); /* brand-green colors */
  clip-path: polygon(0% 50%, 25% 60%, 50% 50%, 75% 60%, 100% 50%, 100% 100%, 0% 100%);
  animation: wave-motion 2s ease-in-out infinite;
}

@keyframes wave-motion {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>