<template>
  <span class="pulse"></span>
</template>

<style lang="scss" scoped>
.pulse {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgb(34, 197, 94);
  box-shadow: 0 0 0 rgba(44, 204, 52, 0.4);
  animation: pulse 1s infinite;
}
.pulse:hover {
  animation: none;
}

@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(71, 204, 44, 0.4);
    box-shadow: 0 0 0 0 rgba(44, 204, 65, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(52, 204, 44, 0);
    box-shadow: 0 0 0 10px rgba(44, 204, 44, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}
</style>
