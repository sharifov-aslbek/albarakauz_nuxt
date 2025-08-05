  <template>
      <div class="container" v-if="categoryStore.categoryData">
          <br>
    <UCarousel
    class="flex items-center justify-between sm:hidden"
    v-if="categoryStore.categoryData.length > 0"
    prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
    v-slot="{ item }"
    :items="images"
    :ui="{ 
      item: 'basis-auto shrink-0',  // itemlarni avtomatik o'lchamda va siqilmasdan olish
      wrapper: 'gap-0',            // oraliq bo'shliqni yo'q qilish
      container: 'sm:gap-8.5'           // konteyner ichidagi bo'shliqni yo'q qilish
    }"
  >
    <img
  class="rounded-full w-[70px] h-[70px] sm:w-[112px] sm:h-[112px] cursor-pointer"
  v-if="item"
  :src="item"
  alt="Error"
/>
  </UCarousel>


  <UCarousel
    class="sm:flex items-center justify-between hidden"
    v-if="categoryStore.categoryData.length > 0"
    arrows
    prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
    v-slot="{ item }"
    :items="images"
    :ui="{ 
      item: 'basis-auto shrink-0',  // itemlarni avtomatik o'lchamda va siqilmasdan olish
      wrapper: 'gap-0',            // oraliq bo'shliqni yo'q qilish
      container: 'sm:gap-8.5'           // konteyner ichidagi bo'shliqni yo'q qilish
    }"
  >
    <img
  class="rounded-full w-[70px] h-[70px] sm:w-[112px] sm:h-[112px] cursor-pointer"
  v-if="item"
  :src="item"
  alt="Error"
/>
  </UCarousel>

  <br v-if="categoryStore.categoryData.length > 0"><br v-if="categoryStore.categoryData.length > 0">

      </div>

      <div v-else class="container">
        <div class="flex items-center justify-between mb-10">
          <USkeleton
          v-for="i in 9"
            class="rounded-full bg-[#D9D9D9] w-[120px] h-[120px]"
          />
        </div>
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

  const images = [
    '/Ellipse1.png',
    '/Ellipse2.png',
    '/Ellipse3.png',
    '/Ellipse4.png',
    '/Ellipse5.png',
    '/Ellipse6.png',
    '/Ellipse7.png',
    '/Ellipse8.png',
    '/Ellipse9.png',

  ]

  definePageMeta({
    ssr: false
  })
  </script>

  <style scoped>


  </style>