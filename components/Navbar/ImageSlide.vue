  <template>
      <div class="container" v-if="categoryStore.categoryData">
          <br>
    <UCarousel
    class="flex items-center justify-between"
    v-if="categoryStore.categoryData.length > 0"
    arrows
    prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
    v-slot="{ item }"
    :items="images"
    :ui="{ 
      item: 'basis-auto shrink-0',  // itemlarni avtomatik o'lchamda va siqilmasdan olish
      wrapper: 'gap-0',            // oraliq bo'shliqni yo'q qilish
      container: 'gap-8.5'           // konteyner ichidagi bo'shliqni yo'q qilish
    }"
  >
    <img
  class="rounded-full w-[112px] h-[112px] cursor-pointer"
  v-if="item"
  :src="item"
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