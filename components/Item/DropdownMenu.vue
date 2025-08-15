<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useRoute } from 'vue-router'

const route = useRoute()

const fullUrl = `${window.location.origin}${route.fullPath}`

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Telegram',
    icon: 'stash:telegram',
    to: `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}`,
    target: '_blank'
  },
  {
    label: 'Copy link',
    icon: 'solar:copy-bold'
  },
  {
    label: 'Instagram',
    icon: 'tdesign:logo-instagram'
  }
])
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{
      align: 'start',
      side: 'bottom',
      sideOffset: 8
    }"
    :ui="{
      content: 'w-48'
    }"
  >
    <UButton label="Ulashish" icon="mingcute:share-forward-line" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
