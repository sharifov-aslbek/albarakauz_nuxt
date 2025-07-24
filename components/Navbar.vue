<template>
  <header class="bg-[#FEEE00] flex items-center h-[100px]">
    <div class="container">
      <div class="flex items-center sm:hidden">
        <a href="/" class="flex items-center space-x-2">
          <img class="w-12" src="/assets/logo.png" alt="">
          <div>
            <span class="text-xl font-bold block text-brand-green">Albaraka.uz</span>
            <span class="text-brand-green text-sm font-bold">Tovarlarni solishtiring</span>
          </div>
        </a>
      </div>
      <div class="flex justify-between gap-4 sm:gap-0 my-8 sm:my-0">
        <div class="hidden sm:flex flex items-center justify-center">
          <a href="/" class="flex items-center space-x-2 mr-[8px]">
            <img src="/assets/logo.png" alt="" width="80" height="69">
            <div>
              <p class="text-[40px]">albaraka.uz</p>
              <p class="text-[10px] font-medium">Tovarlarni solishtiring</p>
            </div>
          </a>
        </div>

        <div class="flex items-center w-full max-w-[850px] mx-auto">
          <!-- Category + Search -->
          <div class="flex items-center w-full gap-2">

            <!-- Kategoriya tugmasi -->
            <button @click="categoryStore.showCategory = !categoryStore.showCategory"
              class="flex items-center justify-center w-[120px] h-[40px] sm:gap-1 px-4 py-1 rounded-l bg-[#ffffff] transition-all duration-300 cursor-pointer flex-none">
              <!-- icons -->
              <div class="relative w-6 h-6"><img src="@/assets/catalog.png" alt=""></div>
              <span class="text-black hidden md:block font-large">Katalog</span>
            </button>

            <!-- Search input + button -->
            <div class="flex items-center bg-white rounded-l w-full h-[40px]">
              <n-auto-complete v-model:value="search" :options="filteredOptions" @keydown.enter="navigateSearch"
                placeholder="Tovar va kategoriyalarni qidiring ..." class="w-full" bordered="false" />
              <UButton @click="navigateSearch()" icon="material-symbols:search" size="md" variant="solid"
                class="bg-white text-black w-[33px] h-[33px] text-[33px] rounded-l flex justify-center" />
            </div>

          </div>

        </div>

        <div class="actions flex items-center gap-3">
          <ModalsProfile v-if="authStore.profileData != null && authStore.profileData !== ''" />
          <ModalsNmodal v-else />
          <RouterLink to="/favorites" class="relative hidden sm:block w-fit">
            <div class="relative w-fit">
              <!-- Heart icon container -->
              <div class="group relative p-2 flex justify-center items-center cursor-pointer">
                <!-- Background circle with scale animation -->
                <div
                  class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out" />
                <!-- <UIcon class="size-7 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300"  name="line-md:heart" /> -->
                <svg class="size-7 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300"
                  xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                  viewBox="0 0 24 24"><!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt -->
                  <path fill="none" stroke="currentColor" stroke-dasharray="32" stroke-dashoffset="32"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c0 0 0 0 -0.76 -1c-0.88 -1.16 -2.18 -2 -3.74 -2c-2.49 0 -4.5 2.01 -4.5 4.5c0 0.93 0.28 1.79 0.76 2.5c0.81 1.21 8.24 9 8.24 9M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.7s" values="32;0" />
                  </path>
                </svg>
              </div>
            </div>
          </RouterLink>
          <!-- <LanguageSwitcher /> -->
        </div>
      </div>

      <div class="container">
        <Transition enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 -translate-y-8 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100" leave-to-class="opacity-0 -translate-y-8 scale-95">
          <div v-if="categoryStore.showCategory" class="relative">
            <!-- Sizning category kodingiz aynan shu yerda -->
            <div class="hidden sm:flex flex-col md:flex-row min-h-screen bg-white">
              <aside class="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto">
                <nav class="space-y-1 p-4">
                  <div v-if="!allCategoryStore.categoryData">
                    <div v-for="i in 7" :key="i" class="flex items-center gap-3 animate-pulse py-3">
                      <div class="h-10 w-10 rounded-md bg-gray-300"></div>
                      <div class="flex-1 h-4 bg-gray-300 rounded-md"></div>
                    </div>
                  </div>

                  <div v-else>
                    <button v-for="category in allCategoryStore.categoryData" :key="category.id"
                      @mouseenter="activeCategory = category.id"
                      class="flex items-center w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
                      :class="{ 'bg-gray-100 text-blue-600': activeCategory === category.id }">
                      <div class="w-8 h-8 mr-3 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                        <img :src="category.image && category.image.localImagePath
                          ? `https://api.albaraka.uz/${category.image.localImagePath}`
                          : 'https://cdn-icons-png.flaticon.com/512/8634/8634546.png'"
                          class="w-full h-full object-cover" />
                      </div>
                      <span class="truncate">{{ category.name }}</span>
                      <UIcon name="material-symbols:chevron-right-rounded" class="ml-auto h-6 w-6 text-gray-400" />
                    </button>
                  </div>
                </nav>
              </aside>

              <!-- Main Content -->
              <main class="flex-1 p-4 md:p-8 overflow-y-auto">
                <template v-if="allCategoryStore.categoryData">
                  <template v-for="category in allCategoryStore.categoryData" :key="category.id">
                    <div v-show="activeCategory === category.id">
                      <h2 class="text-xl font-semibold mb-6 flex items-center cursor-pointer hover:text-blue-600">
                        {{ category.name }}
                        <UIcon name="material-symbols:chevron-right-rounded" class="ml-auto h-4 w-4 text-gray-400" />

                      </h2>

                      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <div v-for="childCategory in category.childCategories" :key="childCategory.id"
                          class="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition">
                          <h3 @click="navigateCategory(childCategory.id)"
                            class="text-lg font-medium text-gray-800 hover:text-blue-600 cursor-pointer mb-3">
                            {{ childCategory.name }}
                          </h3>

                          <ul v-if="childCategory.childCategories?.length" class="space-y-2">
                            <li v-for="nestedCategory in childCategory.childCategories" :key="nestedCategory.id">
                              <a @click="navigateCategory(nestedCategory.id)"
                                class="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                                {{ nestedCategory.name }}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>

                <template v-else>
                  <!-- Loader for main content -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div v-for="i in 8" :key="i"
                      class="flex flex-col h-64 animate-pulse p-4 gap-4 rounded-lg bg-gray-100">
                      <div class="h-24 bg-gray-300 rounded-md"></div>
                      <div class="space-y-2">
                        <div class="h-4 bg-gray-300 rounded-md w-3/4"></div>
                        <div class="h-4 bg-gray-300 rounded-md w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </template>
              </main>
            </div>
          </div>


        </Transition>
        <CategoryMenu class="sm:hidden block" v-if="categoryStore.showCategory" @navigateCategory="navigateCategory" />

      </div>

    </div>
  </header>
</template>


<script setup>
import { NAutoComplete } from '#components';
import { useAuthStore } from "@/stores/auth"
import { useCategoryAllStore } from '#imports';
import { useCategoryStore } from '@/stores/categoryStore'
import { useRouter } from 'vue-router';

const categoryStore = useCategoryStore();
const authStore = useAuthStore();
const router = useRouter();
const allCategoryStore = useCategoryAllStore();
// Category div parametrs
const activeCategory = ref(1);
const search = ref('')

definePageMeta({
  ssr: false
})



function searchCategories(categories, searchText) {
  const result = []

  for (const category of categories) {
    if (
      category.name &&
      category.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      result.push({
        label: category.name,
        value: category.name
      })
    }

    if (category.childCategories?.length) {
      result.push(...searchCategories(category.childCategories, searchText))
    }
  }

  return result
}

const filteredOptions = computed(() => {
  if (!search.value) return []

  const results = searchCategories(allCategoryStore.categoryData, search.value)

  // search.value ni birinchi option sifatida qo‘shish
  return [
    {
      label: search.value,
      value: search.value
    },
    ...results
  ]
})


// Navigates

const navigateCategory = (id) => {
  categoryStore.showCategory = false;
  router.push(`/category/${id}`);
}

const navigateSearch = () => {
  const encodedQuery = encodeURIComponent(search.value.trim());
  router.push(`/search/${encodedQuery}`);
}

</script>

<style scoped>
.n-input input {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
</style>
