<template>
  <div class="w-full">
    <n-menu
      :options="menuOptions"
      @update:value="handleUpdateValue"
    />
  </div>
</template>

<script setup>
import { NIcon } from "naive-ui";
import { h, computed } from "vue";
import { useRouter } from "vue-router";
import { useCategoryAllStore } from "#imports";

// Icons uchun wrapper
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const store = useCategoryAllStore();
const router = useRouter();

// store.categoryData dan menuOptions yasaymiz
const menuOptions = computed(() => {
  if (!store.categoryData) return [];

  return store.categoryData.map(category => {
    return {
      label: category.name,
      key: category.id,
      icon: () => h('img', {
        src: category.image && category.image.localImagePath
          ? `https://albaraka.uz/${category.image.localImagePath}`
          : 'https://cdn-icons-png.flaticon.com/512/8634/8634546.png',
        class: 'w-full h-full object-cover',
        style: 'width: 24px; height: 24px;'  // icon o'lchamini moslashing mumkin
      }),
      children: category.childCategories?.map(child => ({
        label: child.name,
        key: child.id,
        children: child.childCategories?.map(nested => ({
          label: nested.name,
          key: nested.id
        })) || []
      })) || []
    };
  });
});

// Menu ichidagi item bosilganda ishlovchi funksiya
function handleUpdateValue(key) {
  if (typeof key === 'number' || typeof key === 'string') {
    router.push(`/category/${key}`);
  }
}
</script>
