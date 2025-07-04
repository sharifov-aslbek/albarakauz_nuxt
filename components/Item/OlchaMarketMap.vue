<template>
  <div v-if="store.product" class="container">
    <div style="height:100vh; width:500px">
      <LMap
        ref="map"
        v-if="mapReady"
        :zoom="zoom"
        :center="center"
        :use-global-leaflet="false"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker
          v-if="markerPosition"
          :lat-lng="markerPosition"
        />
      </LMap>
    </div>
  </div>
</template>

<script setup>
import { useProductSeoStore } from '#imports';
import { ref, watch, onMounted } from 'vue';

const store = useProductSeoStore();
const map = ref(null);
const mapReady = ref(false);
const zoom = ref(15); // Increased zoom for better marker visibility
const center = ref([47.21322, -1.559482]); // Default center
const markerPosition = ref(null);

// Fix marker icons (add this at the top of your script if needed)
if (process.client) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
}

const getParsedProductModel = (productModel) => {
  try {
    return JSON.parse(productModel) || null;
  } catch (error) {
    return null;
  }
};

const updateMapPosition = (lat, lng) => {
  if (lat && lng) {
    center.value = [lat, lng];
    markerPosition.value = [lat, lng];
  } else {
    markerPosition.value = null;
  }
};

watch(
  () => store.product,
  (newVal) => {
    if (!newVal) return;
    const parsed = getParsedProductModel(newVal.productModel);
    updateMapPosition(parsed?.store?.lat, parsed?.store?.lng);
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  mapReady.value = true;
});
</script>