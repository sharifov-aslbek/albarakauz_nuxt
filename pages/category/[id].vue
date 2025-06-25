<template>
    <div class="container" v-if="store.oneCategoryProducts">
        <div class="grid grid-cols-5 gap-4 justify-between">
            <Card :data="store.oneCategoryProducts" />
        </div>
    </div>
</template>


<script setup>
import { watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '#imports';
import { useProductSeoStore, useCategoryStore } from '#imports';

const store = useProductSeoStore();
const categoryStore = useCategoryStore();
const route = useRoute();

// ID bo‘yicha category ni topish (asosiy yoki child ichidan)
const currentCategory = computed(() => {
  const id = Number(route.params.id);
  const main = categoryStore.onecategoryData;

  if (!main) return null;

  if (main.id === id) return main;

  return main.childCategories?.find((child) => child.id === id) || null;
});

// Har safar route ID o‘zgarganda product va category fetch qilinadi
watch(
  () => route.params.id,
  (id) => {
    if (id) {
      store.getOneCategoryProducts(id, 'uz');
      categoryStore.getOneCategory(id);
    }
  },
  { immediate: true }
);

// Har safar currentCategory tayyor bo‘lsa, SEO head qo‘shiladi
watch(
  currentCategory,
  (category) => {
    if (category) {
      const title = category.name;
      const description = `Eng yaxshi ${category.name} mahsulotlar`;
      const url = `https://albarakauzz.netlify.app/category/${category.id}`; // shu yerga to‘liq URL kiriting

      useHead({
        title,
        meta: [
          // Standart meta
          { name: 'description', content: description },
          // Open Graph (Facebook, Telegram)
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: url },

          // Twitter Cards
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
        ]
      });
    }
  },
  { immediate: true }
);

</script>

