  <template>
    <section class="bg-[#F7F7FA]">
      <div class="container h-[45.5px]" v-if="categoryStore.categoryData">
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
    <NTag @click="navigateToCategory(item.id)" checkable class="mr-0 cursor-pointer">{{ item.name }}</NTag>


  </UCarousel>
  <br v-if="categoryStore.categoryData.length > 0"><br v-if="categoryStore.categoryData.length > 0">
  
</div>
<div v-else class="container">
  <div class="flex justify-between gap-4 pb-4">
     <n-skeleton width="100px" height="25px"  v-for="i in 15" />
  </div>
</div>
    </section>
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