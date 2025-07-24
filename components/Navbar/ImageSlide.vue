  <template>
      <div class="container" v-if="categoryStore.categoryData">
          <br>
    <UCarousel
    v-if="categoryStore.categoryData.length > 0"
    arrows
    prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
    v-slot="{ item }"
    :items="categoryStore.categoryData"
    :ui="{ 
      item: 'basis-auto shrink-0',  // itemlarni avtomatik o'lchamda va siqilmasdan olish
      wrapper: 'gap-0',            // oraliq bo'shliqni yo'q qilish
      container: 'gap-0'           // konteyner ichidagi bo'shliqni yo'q qilish
    }"
  >
    <img
  class="rounded-full w-28 cursor-pointer"
  v-if="item.image"
  :src="`https://api.albaraka.uz/${item.image.localImagePath}`"
  alt="Error"
/>


  </UCarousel>
  <br v-if="categoryStore.categoryData.length > 0"><br v-if="categoryStore.categoryData.length > 0">


      </div>
  </template>

  <script setup>
  import { useRouter } from 'vue-router';
  import { useCategoryAllStore } from '#imports';

  const categoryStore = useCategoryAllStore()
  const router = useRouter()
  const navigateToCategory = (id) => {
    // Kategoriyaga o'tish
    router.push(`/category/${id}`);
  }

  definePageMeta({
    ssr: false
  })
  </script>

  <style scoped>


  </style>