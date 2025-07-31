  <template>
      <h3
  class="flex flex-col md:flex-row md:items-center my-4 gap-2 text-sm text-[#feee00] font-medium"
>
  <div class="flex items-center flex-wrap gap-2">
    <!-- Bosh sahifa link -->
    <RouterLink
      to="/"
      class="flex items-center gap-1 text-gray-600 hover:text-[#feee00] transition-colors duration-300"
    >
      <span>Bosh sahifa</span>
    </RouterLink>

    <!-- Separator -->
    <span class="text-gray-400">/</span>

    <!-- Dynamic Breadcrumbs -->
    <span
      v-for="(item, index) in breadcrumb"
      :key="item.id"
      class="flex items-center gap-1"
    >
      <RouterLink
        :to="`/category/${item.id}`"
        class="flex items-center gap-1 text-gray-600 hover:text-[#feee00] hover:underline transition-all duration-300"
      >
        <span>{{ item.name }}</span>
      </RouterLink>

      <!-- Separator - only if not last -->
      <span
        v-if="index < breadcrumb.length - 1"
        class="text-gray-400"
      >/</span>
    </span>
  </div>
</h3>


  </template>

  <script setup>
  import { useRoute } from 'vue-router';
  import { onMounted } from '#imports';
  import { useCategoryAllStore } from '#imports';
  import { useCategoryStore } from '#imports';
  import { useProductSeoStore } from '#imports';
  const categoryStore = useCategoryStore()
  const store = useProductSeoStore()
  const allCategoryStore = useCategoryAllStore()
  const route = useRoute()

  import { computed } from 'vue'

  definePageMeta({
    ssr: false
  })


  const breadcrumb = computed(() => {
    const categories = allCategoryStore.categoryData || []

    // pathni tekshir
    let categoryModel

    if (route.path.startsWith('/category/')) {
      // category page uchun
      categoryModel = categoryStore.onecategoryData
    } else if (route.path.startsWith('/product/')) {
      // product page uchun
      categoryModel = store.product?.categoryResultModel
    } else {
      // fallback (boshqa sahifalar)
      categoryModel = null
    }

    if (!categories.length || !categoryModel?.name) return []

    try {
      const path = findCategoryPath(categories, categoryModel.name)
      return path && path.length > 1 ? path : [categoryModel]
    } catch (e) {
      console.error('Kategoriya path topilmadi:', e)
      return [categoryModel]
    }
  })

  function findCategoryPath(categories, targetName, path = []) {
    if (!Array.isArray(categories)) return []

    for (const category of categories) {
      const newPath = [...path, { id: category.id, name: category.name }]

      if (category.name === targetName) {
        return newPath
      }

      if (Array.isArray(category.childCategories) && category.childCategories.length) {
        const found = findCategoryPath(category.childCategories, targetName, newPath)
        if (found.length) return found
      }
    }

    return []
  }



  </script>