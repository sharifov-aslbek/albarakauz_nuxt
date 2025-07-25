<template>
    <div class="container flex justify-between">
        <div class="w-[47%] h-[460px] bg-white py-6 px-2.5">
            <h3 class="text-[30px] mb-5">Xarid qilish uchun ko'proq sabablar</h3>

            <div class="flex gap-3">
                   <USkeleton v-for="i in 3" class="h-[350px] w-[250px] bg-[#D9D9D9]" />
            </div>
        </div>


        <div class="w-[47%] h-[460px] bg-white py-6 px-2.5">
            <h3 class="text-[30px] mb-5">Mega Takliflar</h3>

            <div class="flex gap-3">
                   <USkeleton v-for="i in 3" class="h-[350px] w-[250px] bg-[#D9D9D9]" />
            </div>
        </div>
    </div>


</template>


<script setup >

</script>