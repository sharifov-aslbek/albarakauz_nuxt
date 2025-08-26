<template>
  <section class="bg-[#F7F7FA] hidden sm:block">
    <div class="container h-[45.5px]" v-if="categoryStore.categoryData">
      <UCarousel
        class="w-full max-w-[95%] mx-auto"
        autoplay="true"
        v-if="categoryStore.categoryData.length > 0"
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
        v-slot="{ item }"
        :items="categoryStore.categoryData"
        :ui="{ 
          item: 'basis-auto shrink-0',
          wrapper: 'gap-0',
          container: 'gap-0'
        }"
      >
        <div
          @click="navigateToCategory(item.id)"
          class="custom-tag cursor-pointer flex items-center mb-2 gap-2 px-3 py-1 rounded-full bg-white shadow-sm hover:shadow-md transition"
        >
          <img
            class="w-5 h-5 rounded-full object-cover"
            :src="item.image && item.image.localImagePath
              ? `https://api.albaraka.uz/${item.image.localImagePath}`
              : 'https://cdn-icons-png.flaticon.com/512/8634/8634546.png'"
            alt="category avatar"
          />
          <span class="text-gray-800 text-sm whitespace-nowrap">
            {{ item.name }}
          </span>
        </div>
      </UCarousel>
      <br v-if="categoryStore.categoryData.length > 0" />
      <br v-if="categoryStore.categoryData.length > 0" />
    </div>

    <div v-else class="container">
      <div class="flex justify-between gap-4 pb-4">
        <n-skeleton round width="100px" height="25px" v-for="i in 15" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCategoryAllStore } from '#imports';

const categoryStore = useCategoryAllStore();
const router = useRouter();
const navigateToCategory = (id) => {
  router.push(`/category/${id}`);
};

definePageMeta({
  ssr: false,
});
</script>

<style scoped>
.custom-tag {
  border: none;
}
</style>
