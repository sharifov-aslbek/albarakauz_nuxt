<template>
    <h1>This is search</h1>
    <p>{{ $t('welcome') }}</p>
    {{ route.params.id }}
</template>


<script setup>
import { useRoute } from 'vue-router';

definePageMeta({
  ssr: false
})


    const route = useRoute();
</script>

<style scoped>


</style>