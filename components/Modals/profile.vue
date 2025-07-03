<template>
    <div v-if="store.profileData" @click="showModal = !showModal" class="relative cursor-pointer w-fit">
                  <!-- Heart icon container -->
    <UAvatar v-if="data.image?.localImagePath"
                    :src="data.image?.localImagePath ? `https://albaraka.uz/${data.image.localImagePath}` : '/assets/user-avatar.jpg'"
      alt="Benjamin Canac"
    />

      <UAvatar v-else :alt="data.name" size="md" />
                </div>
     <n-modal v-if="store.profileData" v-model:show="showModal" transform-origin="center">
      <div
        class="bg-white rounded-2xl flex flex-col justify-between shadow-lg w-full max-w-6xl mx-auto p-6 sm:p-10 md:p-12 h-auto md:h-[666px] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl sm:text-2xl font-bold">Mening profilim</h2>
          <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div class="flex flex-col md:flex-row gap-8">
          <!-- Profile Image -->
          <div class="flex flex-col items-center md:items-start">
            <img class="w-24 h-24 rounded-full object-cover"
              :src="data.image?.localImagePath ? `https://albaraka.uz/${data.image.localImagePath}` : '/assets/user-avatar.jpg'"
              alt="Error">

            <n-upload class="mt-4" :on-change="handleFileChange" accept="image/*">
              <n-button> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg> Edit</n-button>
            </n-upload>
          </div>

          <!-- Profile Inputs -->
          <div v-if="data" class="flex-1">
            <div class="flex flex-col md:flex-row gap-4 mb-4">
              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input v-model="data.name" type="text" placeholder="Enter your name"
                  class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-brand-green"
                  required />
              </div>
              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                <input v-model="data.surname" type="text" placeholder="Enter your surname"
                  class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-brand-green"
                  required />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div class="relative">
                <input v-model="data.email" type="email" placeholder="Enter your email"
                  class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-brand-green"
                  required />
                <div class="absolute right-3 top-3">
                  <template v-if="data.isEmailVerified">
                    <span class="text-green-500 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      Verified
                    </span>
                  </template>
                  <template v-else>
                    <n-button @click="openVerifyModal" size="small" type="error" class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="mr-1">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <path d="m22 6-10 7L2 6" />
                      </svg>
                      Verify
                    </n-button>
                  </template>
                </div>
              </div>
            </div>


            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input v-model="data.phone" type="tel" placeholder="Enter your phone number"
                class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-brand-green"
                required />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input v-model="password" type="password" disabled
                class="w-full px-4 py-3 opacity-60 cursor-not-allowed rounded-lg bg-gray-50 border border-gray-200 outline-none" />
            </div>

            <div class="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-2">
                            <!-- <h3 @click="resetHandler" class="text-blue-600 cursor-pointer hover:underline">
                Parolni tiklamoqchimisiz?
              </h3>
              yoki
              <h3 @click="changePasswordModal = !changePasswordModal , showModal = !showModal" class="text-blue-600 cursor-pointer hover:underline">
                o‘zgartirmoqchimisiz?
              </h3> -->
            </div>

          </div>
        </div>

        <!-- Buttons -->

        <div class="flex flex-col sm:flex-row justify-between gap-2 mt-8">
          <!-- <n-button @click="logoutHandler" type="error" class="w-full sm:w-auto">
           <LogOutIcon size="17" class="mr-2" />  Logout
          </n-button> -->
          <div class='flex gap-3'>
            <!-- <n-button @click="showModal = false" class="w-[48%] sm:w-auto">
              Close
            </n-button>
            <n-button @click="submitHandler" type="success" class="w-[49%] sm:w-auto">
              Save
              <div
              v-if="putProfileLoader"
                class="ml-2 w-5 h-5 border-4 border-t-white border-gray-300 rounded-full animate-spin"
              ></div>
              <UIcon v-else name="bx:save" class="ml-2" />

            </n-button> -->
          </div>
        </div>
      </div>
    </n-modal>
</template>


<script setup>
import { NModal , NButton , NUpload } from '#components';
import { useAuthStore } from '#imports';
import { ref , onMounted , watch } from 'vue';

const store = useAuthStore();
const data = ref(null)
const password = ref('******')
const showModal = ref(false)


// onMounted(() => {
//   store.getProfileData()
// })

watch(
  () => store.profileData,
  (newValue) => {
    if (newValue) {
      data.value = newValue.data
      console.log('Data yangilandi:', data.value)
    }
  },
  { immediate: true }
)

</script>