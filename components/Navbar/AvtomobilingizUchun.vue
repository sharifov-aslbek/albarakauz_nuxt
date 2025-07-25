<template>
    <div class="container">
        <div class="w-full">
            <h3 class="text-[30px] mb-5">Avtomobilingiz uchun</h3>

            <div class="flex justify-between gap-3">
                   <USkeleton v-for="i in 5" class="h-[450px] w-[240px] bg-[#D9D9D9]" />
                   <Card />
            </div>
        </div>

    </div>


</template>


<script setup >

</script>