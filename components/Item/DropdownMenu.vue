<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const copied = ref(false)

const fullUrl = computed(() => process.client ? `${window.location.origin}${route.fullPath}` : '')

const copyLink = async () => {
  if (!fullUrl.value) return
  try {
    await navigator.clipboard.writeText(fullUrl.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

const items = computed<DropdownMenuItem[]>(() => [
  {
    id: 'telegram',
    label: 'Telegram',
    icon: 'stash:telegram',
    to: `https://t.me/share/url?url=${encodeURIComponent(fullUrl.value)}`,
    target: '_blank'
  },
  {
    id: 'copy',
    label: copied.value ? 'Copied!' : 'Copy link',
    icon: copied.value ? 'mdi:check' : 'solar:copy-bold'
  },
])

const handleSelect = (id: string) => {
  if (id === 'copy') {
    copyLink()
  }
}
</script>

<template>
  <UDropdownMenu
    :items="items"
    @select="handleSelect"
    :content="{ align: 'start', side: 'bottom', sideOffset: 8 }"
    :ui="{ content: 'w-48' }"
  >
    <UButton
      label="Ulashish"
      icon="mingcute:share-forward-line"
      color="neutral"
      variant="outline"
    />
  </UDropdownMenu>
</template>
