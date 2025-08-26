<template>
  <div class="container" v-if="categoryStore.categoryData">
    <br />
    <!-- Mobile carousel -->
    <UCarousel
      class="flex items-center justify-between sm:hidden"
      v-if="categoryStore.categoryData.length > 0"
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      v-slot="{ item }"
      :items="images"
      :ui="{
        item: 'basis-auto shrink-0',
        wrapper: 'gap-0',
        container: 'sm:gap-8.5'
      }"
    >
      <img
        @click="onClickFunction"
        class="rounded-full w-[70px] h-[70px] sm:w-[112px] sm:h-[112px] cursor-pointer img-3d"
        v-if="item"
        :src="item"
        alt="Error"
      />
    </UCarousel>

    <!-- Desktop carousel -->
    <UCarousel
      class="sm:flex items-center justify-between  hidden"
      v-if="categoryStore.categoryData.length > 0"
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      v-slot="{ item }"
      :items="images"
      :ui="{
        item: 'basis-auto shrink-0',
        wrapper: 'gap-0',
        container: 'sm:gap-9'
      }"
    >
      <img
      @click="onClickFunction"
        class="rounded-full w-[70px] h-[70px] sm:w-[112px] sm:h-[112px] mb-6 cursor-pointer img-3d"
        v-if="item"
        :src="item"
        alt="Error"
      />
    </UCarousel>

    <br v-if="categoryStore.categoryData.length > 0" />
    <br v-if="categoryStore.categoryData.length > 0" />
  </div>

  <div v-else class="container">
    <div class="flex items-center justify-between mb-10">
      <USkeleton
        v-for="i in 9"
        :key="'desktop-'+i"
        class="rounded-full hidden md:block bg-[#D9D9D9] w-[120px] h-[120px]"
      />

      <USkeleton
        v-for="i in 4"
        :key="'mobile-'+i"
        class="rounded-full block md:hidden bg-[#D9D9D9] w-[70px] h-[70px]"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCategoryAllStore } from '#imports';

const categoryStore = useCategoryAllStore();
const router = useRouter();

const navigateToCategory = (id) => {
  router.push(`/category/${id}`);
};

const images = [
  '/Ellipse1.png',
  '/Ellipse2.png',
  '/Ellipse3.png',
  '/Ellipse4.png',
  '/Ellipse5.png',
  '/Ellipse6.png',
  '/Ellipse7.png',
  '/Ellipse8.png',
  '/Ellipse9.png'
];

definePageMeta({
  ssr: false
});

const onClickFunction = (e) => {
  const targetSrc = e.target.src;
  console.log(e.target.src);
  if (targetSrc.includes('Ellipse1.png')) {
    router.push('/category/1');
  } else if (targetSrc.includes('Ellipse2.png')) {
    router.push('/category/409');
  } else if (targetSrc.includes('Ellipse3.png')) {
    router.push('/category/177');
  } else if (targetSrc.includes('Ellipse4.png')) {
    router.push('/category/147');
  } else if (targetSrc.includes('Ellipse5.png')) {
    router.push('/category/101');
  } else if (targetSrc.includes('Ellipse6.png')) {
    router.push('/category/329');
  } else if (targetSrc.includes('Ellipse7.png')) {
    router.push('/category/241');
  } else if (targetSrc.includes('Ellipse8.png')) {
    router.push('/category/345');
  } else if (targetSrc.includes('Ellipse9.png')) {
    router.push('/category/999');
  }
};
</script>

<style scoped>
.img-3d {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  animation: float 4s ease-in-out infinite;
}

.img-3d:hover {
  transform: perspective(600px) rotateY(15deg) rotateX(5deg) scale(1.08);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
}

/* Doimiy qimirlash effekti */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotateY(0deg);
  }
  50% {
    transform: translateY(-1px) rotateY(5deg);
  }
}
</style>
