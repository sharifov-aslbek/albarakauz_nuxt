<template>
    <div class="container flex flex-col gap-20 sm:gap-0 sm:flex-row justify-between">
        <div class="w-full sm:w-[47%] h-[460px] bg-white py-6 px-2.5">
            <h3 class="text-[20px] sm:text-[30px] mb-5">Xarid qilish uchun ko'proq sabablar</h3>

            <div class="flex gap-3">
                   <USkeleton v-for="i in 3" class="h-[300px] sm:h-[350px] w-[250px] bg-[#D9D9D9]" />
            </div>
        </div>


        <div class="w-full sm:w-[47%] sm:h-[460px] bg-white py-6 px-2.5">
            <h3 class="text-[20px] sm:text-[30px] mb-5">Mega Takliflar</h3>

            <div class="flex gap-3">
                   <USkeleton v-for="i in 3" class="h-[300px] sm:h-[350px] w-[250px] bg-[#D9D9D9]" />
            </div>
        </div>
    </div>


</template>


<script setup >

</script>