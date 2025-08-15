<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const copied = ref(false)

// Faqat clientda to‘liq URL yaratamiz
const fullUrl = computed(() => {
  if (process.client) {
    return `${window.location.origin}${route.fullPath}`
  }
  return ''
})

// Linkni clipboardga nusxalash funksiyasi
const copyLink = async () => {
  if (!fullUrl.value) return
  try {
    await navigator.clipboard.writeText(fullUrl.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500) // 1.5s dan keyin xabar yo‘qoladi
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

const items = computed<DropdownMenuItem[]>(() => [
  {
    label: 'Telegram',
    icon: 'stash:telegram',
    to: `https://t.me/share/url?url=${encodeURIComponent(fullUrl.value)}`,
    target: '_blank'
  },
  {
    label: copied.value ? 'Copied!' : 'Copy link',
    icon: copied.value ? 'mdi:check' : 'solar:copy-bold',
    click: copyLink // Bu joyda click event ishlaydi
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
    <UButton
      label="Ulashish"
      icon="mingcute:share-forward-line"
      color="neutral"
      variant="outline"
    />
  </UDropdownMenu>
</template>
