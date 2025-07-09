<template>
  <NotFoundSearch v-if="!seoStore.product" />
  <template v-else-if="seoStore.product && seoStore.product.marketResultmodel">
    <UzumItem 
      v-if="seoStore.product.marketResultmodel.url.includes('uzum.uz')"
    />
    <OlchaItem
      v-else-if="seoStore.product.marketResultmodel.url.includes('olcha.uz')"
    />

    <TexnomartItem
    v-else-if="seoStore.product.marketResultmodel.url.includes('texnomart.uz')"
    />

    <!-- {{ seoStore.linkedProducts }} -->
    
    <!-- <ProductSkeleton v-else /> -->

    <!-- {{ seoStore.product }} -->
    <SimilarProducts :data="seoStore.oneCategoryProducts" />
    <!-- <UCarousel v-slot="{ item }" :items="seoStore.oneCategoryProducts" :ui="{ item: 'basic-1/3' }">
      <Card :data="seoStore.oneCategoryProducts" />
    </UCarousel> -->

    <!-- <div class="" v-for="category in seoStore.productCategoryList" :key="category.categoryInfo.id">
    
                <h2 class="text-2xl text-category cursor-pointer flex items-center gap-3">{{ category.categoryInfo.name }} <UIcon name="ic:outline-chevron-right" class="size-10 flex justify-center" />
</h2>
                <div class="grid grid-cols-5 gap-3">
                  <Card :data="category.products" />
                </div>
               </div>   -->

  </template>
  <!-- <div v-if="seoStore.product">
    <h1 class="text-xl font-bold">{{ seoStore.title }}</h1>
    <img :src="seoStore.image" alt="Product Image" class="max-w-sm my-4" />
    <p>{{ seoStore.description }}</p>
  </div> -->

</template>

<script setup lang="ts">
import { onMounted } from '#imports'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useProductSeoStore } from '@/stores/productSeo'
import { useHead } from '#imports'
import { watch  } from 'vue'
import ProductSkeleton from '~/components/Item/ProductSkeleton.vue'

// SimilarProductRelation interfeys
interface SimilarProductRelation {
  productId1: number
  productId2: number
  product1: any | null
  product2: any | null
  id: number
  createdOn: string
  updatedOn: string | null
  deletedOn: string | null
  updatedById: number | null
  deletedById: number | null
  isDeleted: boolean
}

const route = useRoute()
const seoStore = useProductSeoStore()

// watch(
//   () => route.params.id,
//   (newId) => {
//     if (newId !== undefined && newId !== null) {
//       const currentId = Number(newId)

//       const similarRelations: SimilarProductRelation[] = Array.isArray(seoStore.similarsId)
//         ? seoStore.similarsId
//         : []

//       if (similarRelations.length === 0) {
//         console.log('similarsId bo‘sh yoki undefined')
//         return
//       }

//       const relatedIds = similarRelations
//         .filter(item =>
//           item.productId1 === currentId || item.productId2 === currentId
//         )
//         .flatMap(item => {
//           const ids: number[] = []
//           if (item.productId1 !== currentId) {
//             ids.push(item.productId1)
//           }
//           if (item.productId2 !== currentId) {
//             ids.push(item.productId2)
//           }
//           return ids
//         })

//       const uniqueIds: number[] = [...new Set(relatedIds)]

//       uniqueIds.forEach((id) => {
//         seoStore.getOneProductSimilar(id)
//       })

//       console.log('Similar product ids:', uniqueIds)
//     }
//   },
//   { immediate: true }
// )



// Mahsulotni yuklab olish
// await seoStore.getProductSeo(route.params.id as string)
// await seoStore.getProductSimilars(route.params.id as string)

// const loadProductAndSimilars = async (id: string , slug: string) => {
//   await seoStore.getProductSeo(id , slug)
//   await seoStore.getProductSimilars(id)

//   const similarRelations = seoStore.similarsId || []
//   if (similarRelations.length === 0) {
//     console.log('similarsId bo‘sh yoki undefined')
//     return
//   }

//   const currentId = Number(id)

//   const relatedIds = similarRelations
//     .filter(item =>
//       item.productId1 === currentId || item.productId2 === currentId
//     )
//     .flatMap(item => {
//       const ids: number[] = []
//       if (item.productId1 !== currentId) ids.push(item.productId1)
//       if (item.productId2 !== currentId) ids.push(item.productId2)
//       return ids
//     })

//   const uniqueIds = [...new Set(relatedIds)]

//     seoStore.similarProductData = []


//   for (const relId of uniqueIds) {
//     await seoStore.getOneProductSimilar(relId)
//   }

//   console.log('Similar product ids:', uniqueIds)
// }

// onMounted(async () => {
//   await loadProductAndSimilars(route.params.id as string , route.params.slug as string)
// })

// watch(
//   () => route.params.id,
//   async (newId) => {
//     if (newId != null) {
//       await loadProductAndSimilars(newId as string)
//     }
//   }
// )

onMounted(() => {
  seoStore.getProductSeo(route.params.slugAndId as string)
})


watch(
  () => seoStore.product,
  (newVal) => {
    if (newVal && newVal.categoryResultModel?.id) {
      seoStore.getOneCategoryProducts(newVal.categoryResultModel.id as number, 'uz')
    }
  },
  { immediate: true }
)


// Head ni yuklash
useHead(() => {
  const url = `https://albaraka.uz/product/${route.params.slugAndId}`

  return {
    title: seoStore.title,
    meta: [
      { name: 'description', content: seoStore.description },
      { name: 'keywords', content: seoStore.keywords || 'Mahsulot, online do‘kon, albaraka, texnika' },
      { name: 'author', content: 'Albaraka.uz' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph
      { property: 'og:title', content: seoStore.title },
      { property: 'og:description', content: seoStore.description },
      { property: 'og:image', content: seoStore.image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'Albaraka.uz' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoStore.title },
      { name: 'twitter:description', content: seoStore.description },
      { name: 'twitter:image', content: seoStore.image },

      // Viewport
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

      // Charset
      { charset: 'utf-8' }
    ],
    link: [
      { rel: 'canonical', href: url }
    ]
  }
})



// Router param o'zgarsa
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.slugAndId !== from.params.slugAndId) {
    await seoStore.getProductSeo(to.params.slugAndId as string)

    // route o'zgarganda headni yangilash
    useHead(() => {
  const url = `https://albaraka.uz/product/${route.params.slugAndId}`

  return {
    title: seoStore.title,
    meta: [
      { name: 'description', content: seoStore.description },
      { name: 'keywords', content: seoStore.keywords || 'Mahsulot, online do‘kon, albaraka, texnika' },
      { name: 'author', content: 'Albaraka.uz' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph
      { property: 'og:title', content: seoStore.title },
      { property: 'og:description', content: seoStore.description },
      { property: 'og:image', content: seoStore.image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'Albaraka.uz' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoStore.title },
      { name: 'twitter:description', content: seoStore.description },
      { name: 'twitter:image', content: seoStore.image },

      // Viewport
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

      // Charset
      { charset: 'utf-8' }
    ],
    link: [
      { rel: 'canonical', href: url }
    ]
  }
}) // ✅ bu — useHead yopilishi
  } // ✅ bu — if yopilishi
}) // ✅ bu — onBeforeRouteUpdate yopilishi

</script>

