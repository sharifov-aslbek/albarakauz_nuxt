<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-back-top :right="20" />
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NBackTop } from 'naive-ui'

const themeOverrides = {
  BackTop: {
    iconColor: '#000000',    // oddiy holat
    iconColorHover: '#feee00',
    iconColorPressed: '#000000'
  }
}
</script>
