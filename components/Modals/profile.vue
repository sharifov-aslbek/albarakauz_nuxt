<template>

    <div v-if="store.showLogout || showModal" class="glass-overlay"></div>


    <div v-if="store.profileData" @click="showModal = !showModal" class="relative cursor-pointer w-fit">
                  <!-- Heart icon container -->
    <UAvatar v-if="data.image?.localImagePath"
                    :src="data.image?.localImagePath ? `https://api.albaraka.uz/${data.image.localImagePath}` : '/assets/user-avatar.jpg'"
      :alt="data.name"
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
            <!-- <img class="w-24 h-24 rounded-full object-cover"
              :src="data.image?.localImagePath ? `https://api.albaraka.uz/${data.image.localImagePath}` : '/assets/user-avatar.jpg'"
              alt="Error"> -->

              <UAvatar
              class="w-24 h-24 text-3xl rounded-full object-cover" 
               v-if="data.image?.localImagePath"
                    :src="data.image?.localImagePath ? `https://api.albaraka.uz/${data.image.localImagePath}` : '/assets/user-avatar.jpg'"
      :alt="data.name"
    />

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
                  class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-[#06D6A0]"
                  required />
              </div>
              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                <input v-model="data.surname" type="text" placeholder="Enter your surname"
                  class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-[#06D6A0]"
                  required />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div class="relative">
                <input v-model="data.email" type="email" placeholder="Enter your email"
                  class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-[#06D6A0]"
                  required />
                <div class="absolute right-3 top-3">
                  <template v-if="data.isEmailVerified">
                    <span class="text-green-500 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      Tasdiqlangan
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
                      Tasdiqlash
                    </n-button>
                  </template>
                </div>
              </div>
            </div>


            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input v-model="data.phone" type="tel" placeholder="Enter your phone number"
                class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-[#06D6A0]"
                required />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input v-model="password" type="password" disabled
                class="w-full px-4 py-3 opacity-60 cursor-not-allowed rounded-lg bg-gray-50 border border-gray-200 outline-none" />
            </div>

            <div class="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-2">
                            <h3 @click="resetHandler" class="text-blue-600 cursor-pointer hover:underline">
                Parolni tiklamoqchimisiz?
              </h3>
              yoki
              <h3 @click="store.changePasswordModal = !store.changePasswordModal , showModal = !showModal" class="text-blue-600 cursor-pointer hover:underline">
                o‘zgartirmoqchimisiz?
              </h3>
            </div>

          </div>
        </div>

        <!-- Buttons -->

        <div class="flex flex-row sm:flex-row justify-between gap-2 mt-8">
          <n-button @click="logoutHandler" type="error" class="w-full sm:w-auto">
           <UIcon name="garden:exit-fill-16" size="16" class="mr-2" />  Tizimdan chiqish
          </n-button>

          <div class="block sm:hidden">
            <n-button @click="submitHandler" type="success" class="w-full">
              Saqlash
                <div
                v-if="putProfileLoader"
                  class="ml-2 w-5 h-5 border-4 border-t-white border-gray-300 rounded-full animate-spin"
                ></div>
                <UIcon v-else name="bx:save" class="ml-2" />
  
              </n-button>
          </div>

          <div class='hidden md:flex gap-3'>
            <n-button @click="showModal = false" class="w-full sm:w-auto">
              Yopish
            </n-button>
            <n-button @click="submitHandler" type="success" class="w-full sm:w-auto">
              Saqlash
              <div
              v-if="putProfileLoader"
                class="ml-2 w-5 h-5 border-4 border-t-white border-gray-300 rounded-full animate-spin"
              ></div>
              <UIcon v-else name="bx:save" class="ml-2" />

            </n-button>
          </div>
        </div>
      </div>
    </n-modal>


    <ClientOnly>
      <n-modal v-model:show="store.showLogout" transform-origin="center">
        <div class="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl">
          <div @click="store.showLogout = !store.showLogout" class="group absolute right-3 top-5 p-3 cursor-pointer">
            <!-- Background circle with scale animation -->
            <div
              class="absolute inset-0 bg-[#feee00] rounded-lg opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out" />
            <X class="w-6 h-6 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
          </div>
          <!-- Left Side - Orange Section -->
          <div class="relative bg-[#feee00] p-12">
            <div class="max-w-md text-white">
              <h1 class="text-4xl font-bold mb-4">
                Iltimos, tizimdan chiqmoqchi ekanligingizni tasdiqlang.
              </h1>
            </div>
            <img src="/assets/logout.png" alt="Dashboard illustration" class="my-6 w-96 hidden md:block" />
          </div>
  
          <!-- Right Side - Login Form -->
          <div class="p-12">
            <div class="flex flex-col justify-between h-full max-w-md mx-auto">
              <!-- Logo -->
              <div>
                <div class="flex items-center gap-2 mb-8">
                  <div class="w-10 h-10 bg-[#feee00] rounded-full flex items-center justify-center">
                    <span class="text-black">A</span>
                  </div>
                  <span class="font-bold text-xl">Albaraka.uz</span>
                </div>
  
              </div>
  
              <div class="flex gap-4">
                <button @click="store.showLogout = false" type="submit"
                  class="w-full py-3 px-4 bg-white hover:bg-[#feee00]/70 hover:border-white hover:text-white text-[#feee00] border border-[#feee00] rounded-lg transition-colors">
                  Cancel
                </button>
  
                <button @click="logout" type="submit"
                  class="w-full py-3 px-4 bg-[#feee00] border border-white hover:bg-white hover:border-[#feee00] hover:text-[#feee00] text-white rounded-lg transition-colors">
                  Confirm
                </button>
              </div>
  
  
            </div>
          </div>
        </div>
      </n-modal>

       <n-modal v-model:show="store.verifyEmailModal">
      <div
        class="bg-white rounded-2xl flex flex-col justify-evenly shadow-lg w-full max-w-6xl mx-auto p-6 sm:p-10 md:p-12 h-auto md:h-[666px] overflow-y-auto">
        <div class="group absolute right-3 top-5 p-3 cursor-pointer">
          <!-- Background circle with scale animation -->
          <div
            class="absolute inset-0 bg-[#feee00] rounded-lg opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out" />
          <X class="w-6 h-6 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
        </div>
        <div class="flex flex-col items-center justify-center w-full gap-4">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit code sent to your email
          </p>

          <n-button class="mt-3">
            <a class="flex items-center justify-center" target="_blank" href="https://mail.google.com/">
              Open gmail <img class="w-8 ml-1" src="/assets/gmail.webp" alt="Error">
            </a>
          </n-button>
        </div>
        <form class="mm:w-[50%] mt-7 mm:mt-0 mx-auto space-y-6" @submit.prevent="handleSubmitVerify">

          <UPinInput
          length="6"
  otp
  v-model="verificationCode"
  class="
    [&>input]:h-16 [&>input]:w-16 
    md:[&>input]:h-[70px] md:[&>input]:w-[70px]
  "
/>


          <div v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
          </div>
          <div>
            <button type="submit" :disabled="!verificationCode"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#feee00] hover:bg-[#feee00]/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:opacity-50 disabled:cursor-not-allowed">
              Verify
            </button>

            <div v-if="resendChecker" class="flex justify-center items-center gap-3">
              <span class="flex items-center justify-center py-5">
                Try again with {{ count }} seconds
              </span>
  
                <span @click="count <= 10 && resendSubmit()" :class="{'cursor-not-allowed opacity-50': count > 10, 'cursor-pointer': count <= 10}"
                  class="bg-[#feee00] py-1 px-2 rounded-lg text-white">
                  Resend
                </span>
            </div>
          </div>
        </form>
      </div>
    </n-modal>

    <changepass />
    <reset />
    </ClientOnly>

</template>


<script setup>
// import { NModal , NButton , NUpload } from 'naive-ui';
import { useAuthStore } from '#imports';
import changepass from './changepass.vue';
import reset from './reset.vue';
import { useMessage } from '#imports';
import { ref , onMounted , watch } from 'vue';
import successAudio from '@/assets/audio.mp3'
import errorAudio from '@/assets/not-success.m4a'


const store = useAuthStore();
const data = ref(null)
const message = useMessage()
const password = ref('******')
const showModal = ref(false)
const toast = useToast()
const putProfileLoader = ref(false)
const selectedFile = ref(null)
const count = ref(300);
const resendChecker = ref(false);
const verificationCode = ref(null);
const error = ref('')
const loader = ref(false)

const resendSubmit = () => {
  sendVerificationCode();
  count.value = 300
  // store.startCountdown(300);
}

const startCountdown = (num) => {
  count.value = num; // Berilgan raqamdan boshlash
  const interval = setInterval(() => {
    if (count.value > 0) {
      count.value--; // Har soniyada kamaytirish
    } else {
      clearInterval(interval); // 0 ga yetganda to‘xtatish
    }
  }, 1000);
};

function resetHandler() {
  store.resetPasswordModal = true;
  if(store.resetPasswordModal && store.profileData.data) {
    forgotPassword(store.profileData.data?.email);
  }
  showModal.value = !showModal.value;
  // store.profileData = !store.profileData;
  console.log(store.resetPasswordModal, 'status');

  // bu yerda kerakli logic yoziladi
}

definePageMeta({
  ssr: false
})

const logoutHandler = () => {
  store.showLogout = true
}

const handleFileChange = (info) => {
  const file = info.file.file;
  selectedFile.value = file;
};


const logout = () => {
  localStorage.removeItem('accessToken')
  store.showLogout = false
  store.profileData = null

        message.success("Logout amalga oshirildi")

        new Audio(successAudio).play();

}

const handleSubmitVerify = () => {
  const code = verificationCode.value.join('')

  if (verificationCode.value && verificationCode.value.length === 6) {
    verifyEmailCode(code)
  }
  else {
    error.value = 'Please enter all 6 digits'
  }
}

async function verifyEmailCode(code) {
  try {
    const token = localStorage.getItem('accessToken')

    const res = await fetch(
      `https://api.albaraka.uz/api/user/verify-email-code?code=${code}`,
      {
        method: 'POST',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
        body: null
      }
    )

    if (!res.ok) {
      const errorData = await res.json()
      const msg = errorData?.message || 'Nomaʼlum xatolik yuz berdi'

      if (res.status === 409) {
        message.error(msg)
      } else {
        message.error('Serverda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.')
      }

      throw new Error(msg)
    }

    const data = await res.json()

    message.success('Emailingiz muvaffaqiyatli tasdiqlandi!')

    store.verifyEmailModal = false
    store.getProfileData()

    console.log(data)
    return data

  } catch (error) {
    console.error('Emailni tasdiqlashda xatolik:', error.message)
    message.error(error.message || 'Tarmoq xatosi yuz berdi.')
    throw error
  }
}

const openVerifyModal = () => {
  store.verifyEmailModal = true;
  showModal.value = !showModal.value;
  sendVerificationCode();
  startCountdown(300);
}

const forgotPassword = async (email) => {

  try {
    const token = localStorage.getItem('accessToken') // Token olish

    const res = await fetch(`https://api.albaraka.uz/api/user/forgot-password?email=${email}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({})
    })

    const data = await res.json()

    if (res.ok) {
      toast.add({
        title: 'Muvaffaqiyatli',
        description: 'A 6-digit reset code has been sent to your email.',
        color: 'success'
      })
      // store.startCountdown(10)
      // resendChecker.value = true
      store.currentStep = 2
    } else {
      toast.add({
        title: 'Xatolik',
        description: data?.message || 'Serverda xatolik yuz berdi',
        color: 'error'
      })
    }

    console.log(data, 'forgot password')

  } catch (error) {
    toast.add({
      title: 'Xatolik',
      description: error.message || 'Tarmoq xatoligi',
      color: 'error'
    })
  } finally {
    loader.value = false
    forgotloader.value = false
  }
}


async function sendVerificationCode() {
  try {
    const token = localStorage.getItem('accessToken')

    const response = await fetch('https://api.albaraka.uz/api/user/send-verification', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const responseData = await response.json()

    if (response.ok) {
      message.success('6ta raqamli kodingiz email manzilingizga yuborildi.')
      new Audio(successAudio).play()

      resendChecker.value = true
      console.log(responseData)
    } else {
      const msg = responseData?.message || 'Nomaʼlum xatolik yuz berdi.'

      if (response.status === 409) {
        message.error(msg)
      } else {
        message.error('Serverda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.')
      }

      console.error('Kod yuborishda xatolik:', msg)
      throw new Error(msg)
    }
  } catch (error) {
    message.error(error.message || 'Tarmoq xatosi yuz berdi.')
    console.error('Kod yuborishda xatolik:', error.message)
    throw error
  }
}

const submitHandler = () => {
  const fields = [
    { key: 'name', label: "Ism" },
    { key: 'surname', label: "Familiya" },
    { key: 'email', label: "Email" },
    { key: 'phone', label: "Telefon" },
  ];

  // Bo'sh maydonlarni topish
  const emptyFields = fields.filter(field => {
    const value = data.value[field.key];
    return !value || value.trim() === '';
  });

  if (emptyFields.length > 0) {
    const fieldNames = emptyFields.map(field => field.label).join(', ');
    toast.add({
          title: 'Xatolik!',
          description: `Quyidagi maydon(lar) to'ldirilmagan: ${fieldNames}`,
          icon: 'mynaui:check',
          color: 'error'
        });
    return;
  }

  console.log('Submitting form with data:', data.value);
  putProfileData(data.value.name, data.value.surname, data.value.email, data.value.phone);
};

async function putProfileData(name, surname, email, phone, password) {
  const toast = useToast()
  putProfileLoader.value = true

  try {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("Token mavjud emas!")
    }

    const formData = new FormData()
    formData.append("Name", name)
    formData.append("Surname", surname)
    formData.append("Email", email)
    formData.append("Phone", phone)
    // formData.append("Password", password)
    formData.append("Image", selectedFile.value)

    const response = await fetch("https://api.albaraka.uz/api/user/modify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
        // fetch bilan ishlaganda, FormData yuborsak, 
        // Content-Type ni yozmaslik kerak. Brauzer uni o‘zi to‘g‘ri qo‘shadi.
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData?.message || 'Nomaʼlum xatolik yuz berdi.'

      if (response.status === 400) {
        toast.add({
          title: 'Xatolik!',
          description: errorMessage,
          color: 'warning',
          timeout: 4000
        })
        showModal.value = false
      } else {
        toast.add({
          title: 'Server xatosi!',
          description: errorMessage,
          color: 'error',
          timeout: 4000
        })
        showModal.value = false
      }
      return
    }

    // Muvaffaqiyatli bo‘lsa
    store.getProfileData()
    showModal.value = false
    toast.add({
      title: 'Muvaffaqiyatli!',
      description: 'Profil maʼlumotlari muvaffaqiyatli yangilandi.',
      color: 'success',
    })

  } catch (error) {
    toast.add({
      title: 'Tarmoq xatosi!',
      description: error.message,
      color: 'error',
      timeout: 4000
    })
  } finally {
    putProfileLoader.value = false
    file.value = null
  }
}


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

<style scoped>

.glass-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  background-color: rgba(255, 255, 255, 0.2);
}

</style>