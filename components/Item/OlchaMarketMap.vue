<template>
  <LMap
    style="height: 350px"
    :zoom="15"
    :center="[getParsedProductModel(store.product.productModel).store.lat, getParsedProductModel(store.product.productModel).store.lng]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
      layer-type="base"
      name="OpenStreetMap"
    />
    
    <!-- Marker qo'shildi -->
    <LMarker :lat-lng="[getParsedProductModel(store.product.productModel).store.lat, getParsedProductModel(store.product.productModel).store.lng]">
      <LPopup>{{getParsedProductModel(store.product.productModel).store.name_ru}}</LPopup>
    </LMarker>
  </LMap>
</template>

<script setup>
import { useProductSeoStore } from '#imports';

definePageMeta({
  ssr: false
})

const store = useProductSeoStore()

const getParsedProductModel = (productModel) => {
  try {
    return JSON.parse(productModel) || "Noma'lum"
  } catch (error) {
    return "Xato"
  }
}
</script>