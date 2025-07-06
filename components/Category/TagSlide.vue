<template>
    <div class="container" v-if="categoryStore.onecategoryData">
        <br>
  <UCarousel
  v-if="categoryStore.onecategoryData.childCategories.length > 0"
  arrows
  v-slot="{ item }"
  :items="categoryStore.onecategoryData.childCategories"
  :ui="{ 
    item: 'basis-auto shrink-0',  // itemlarni avtomatik o'lchamda va siqilmasdan olish
    wrapper: 'gap-0',            // oraliq bo'shliqni yo'q qilish
    container: 'gap-0'           // konteyner ichidagi bo'shliqni yo'q qilish
  }"
>
  <NTag @click="navigateToCategory(item.id)" :bordered="false" class="mr-0 cursor-pointer">{{ item.name }}</NTag>


</UCarousel>
<br v-if="categoryStore.onecategoryData.childCategories.length > 0"><br v-if="categoryStore.onecategoryData.childCategories.length > 0">


    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCategoryStore } from '#imports';

const categoryStore = useCategoryStore()
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