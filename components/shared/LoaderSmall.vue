<template>
    <div v-if="store.productLoader" class="w-full flex items-center justify-center my-5">
        <n-spin size="medium" />
    </div>
</template>

<script setup>
    import { useProductSeoStore } from '#imports';

    const store = useProductSeoStore();
</script>

<style scoped>

</style>