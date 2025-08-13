  <template>
    <section class="bg-[#F7F7FA] hidden sm:block">
      <div class="container h-[45.5px]" v-if="categoryStore.categoryData">
    <UCarousel
    class="w-full max-w-[95%] mx-auto"
    arrows="true"
    v-if="categoryStore.categoryData.length > 0"
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

    <n-tag class="cursor-pointer" round :bordered="false">
      {{ item.name }}
      <template #avatar>
        <n-avatar
          :src="item.image && item.image.localImagePath
                          ? `https://api.albaraka.uz/${item.image.localImagePath}`
                          : 'https://cdn-icons-png.flaticon.com/512/8634/8634546.png'"
        />
      </template>
    </n-tag>

  </UCarousel>  
  <br v-if="categoryStore.categoryData.length > 0"><br v-if="categoryStore.categoryData.length > 0">
  
</div>
<div v-else class="container">
  <div class="flex justify-between gap-4 pb-4">
     <n-skeleton round width="100px" height="25px"  v-for="i in 15" />
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