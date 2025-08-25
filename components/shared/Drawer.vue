<template>

  <h3 class="text-xl font-bold mb-4">Mahsulot tavsifi</h3>

  <UButton class="w-full" @click="activate('bottom')" color="neutral" variant="outline">
    <UIcon name="fluent:text-description-16-filled" />
    Mahsulot tavsifi
  </UButton>

  <n-drawer
    v-model:show="active"
    :height="550"
    :default-width="502"
    :placement="placement"
    resizable
  >
    <n-drawer-content title="Mahsulot tavsifi" :native-scrollbar="false" :width="996">
      <!-- Store dan description olish -->
       <div v-if="!store.product.marketResultmodel.url.includes('olcha.uz') && store.product.description">
         <div v-html="store.product.description"></div>
       </div>

       <div v-else-if="store.product.marketResultmodel.url.includes('olcha.uz')">
         <p v-if="getParsedProductModel(store.product.productModel).description_ru"
            class="w-full max-w-full text-sm md:text-base"
            v-html="getParsedProductModel(store.product.productModel).description_ru"></p>

          <p v-else class="w-full max-w-full text-sm md:text-base">
            {{ getParsedProductModel(store.product.productModel).description_uz }}
          </p>
       </div>



       <div v-else>
        Mahsulotning tavsifi mavjud emas.
       </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useProductSeoStore } from "#imports";

const store = useProductSeoStore();

const active = ref(false);
const placement = ref("right");

const activate = (place) => {
  active.value = true;
  placement.value = place;
};

const getParsedProductModel = (productModel) => {
  try {
    return JSON.parse(productModel) || "Noma'lum"
  } catch (error) {
    return "Xato"
  }
}
</script>
