<template>
  <n-modal v-model:show="store.registerModal" transform-origin="center">
    <div class="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl">
      <!-- Left Side - Orange Section -->
      <div class="relative bg-[#06D6A0] p-12 hidden md:block">
        <div class="max-w-md text-white">
          <h1 class="text-4xl font-bold mt-6 mb-4">
            Xush Kelibsiz , ma'lumotlaringizni kiriting
          </h1>
          <p class="text-white/90">
            Simplify your e-commerce management with our user-friendly admin dashboard.
          </p>
        </div>
        <img src="/assets/shop-icon.png" alt="Dashboard illustration" class="mt-2 w-96" />
      </div>

      <!-- Right Side - Login Form -->
      <div class="p-12">
        <div class="max-w-md mx-auto">
            <div @click="store.registerModal = !store.registerModal" class="group absolute right-3 top-5 p-3 cursor-pointer">
                <!-- Background circle with scale animation -->
                <div
                  class="absolute inset-0 bg-[#06D6A0] rounded-lg opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out" />
                <UIcon class="w-6 h-6 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300" name="meteor-icons:xmark" />
              </div>
          <div class="flex items-center gap-2 mb-8">
            <div class="w-10 h-10 bg-[#06D6A0] rounded-full flex items-center justify-center">
              <span class="text-white font-bold">A</span>
            </div>
            <span class="font-bold text-xl">api.albaraka.uz</span>
          </div>

         

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <n-input
                type="text"
                placeholder="Name"
                class="w-full px-1 py-2 rounded-lg bg-gray-50 border outline-none  focus:border-brand-green border-gray-200"
                v-model:value="name"
              />
              <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
            </div>

            <div>
              <n-input
                type="text"
                placeholder="Surname"
                class="w-full px-1 py-2 rounded-lg bg-gray-50 border outline-none  focus:border-brand-green border-gray-200"
                v-model:value="surname"
              />
              <p v-if="errors.surname" class="text-red-500 text-sm mt-1">{{ errors.surname }}</p>
            </div>

            <div>
              <n-input
                type="email"
                placeholder="Email address"
                class="w-full px-1 py-2 rounded-lg bg-gray-50 border outline-none  focus:border-brand-green border-gray-200"
                v-model:value="email"
              />
              <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
            </div>

            <div>

              <n-input
  type="text"
  placeholder="Phone number"
  class="w-full px-1 py-2 rounded-lg bg-gray-50 border outline-none focus:border-brand-green border-gray-200"
  v-model:value="phone"
  maxlength="17"
  @input="formatPhoneNumber"
/>

              <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
            </div>

             <div>
    <n-input
      v-model:value="password"
      class="w-full py-2 px-1 rounded-lg bg-gray-50 outline-none border-gray-200"
      type="password"
      show-password-on="click"
      placeholder="Password"
    />
    <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
  </div>

            <div>
              <n-upload 
              :on-change="handleFileChange"  accept="image/*" >
    <n-button>Upload File</n-button>
  </n-upload>
            </div>

            <div class="text-right">
              <a href="#" class="text-sm text-gray-500 hover:text-brand-green">
                Forgot password?
              </a>
            </div>

            <button type="submit"
              class="w-full h-[50px] py-3 px-4 bg-[#06D6A0] hover:bg-[#06D6A0]/70 text-white rounded-lg transition-colors">
              <span v-if="loader">
                <n-spin size="small" />
              </span>
              <span v-else class="text-[16px]">
                Register
              </span>

            </button>
          </form>

          <!-- <p class="mt-8 text-center text-gray-500">
            Don't have an account?
            <a href="#" class="text-brand-green hover:text-brand-green/70">Signup</a>
          </p> -->
        </div>
      </div>
    </div>
  </n-modal>  

</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { NModal , NSpin , NInput } from 'naive-ui';
import { ref, reactive } from 'vue'

const store = useAuthStore()

let name = ref('')
let surname = ref('')
let email = ref('')
let phone = ref('+998')
let password = ref('')
const showPassword = ref(false)
const loader = ref(false);

const errors = reactive({
  name: '',
  surname: '',
  email: '',
  phone: '',
  password: '',
})

const formatPhoneNumber = () => {
  let digits = phone.value.replace(/\D/g, '') // faqat raqamlar qolsin

  // "998" boshida bo'lmasa, qo'shish
  if (!digits.startsWith('998')) {
    digits = '998' + digits
  }

  // faqat 12 ta raqam: 998 + 9ta
  digits = digits.slice(0, 12)

  // Formatlash: +998 90 123 45 67
  let formatted = '+998'
  if (digits.length > 3) {
    formatted += ' ' + digits.slice(3, 5)
  }
  if (digits.length > 5) {
    formatted += ' ' + digits.slice(5, 8)
  }
  if (digits.length > 8) {
    formatted += ' ' + digits.slice(8, 10)
  }
  if (digits.length > 10) {
    formatted += ' ' + digits.slice(10, 12)
  }

  phone.value = formatted
}


const selectedFile = ref(null);

const handleFileChange = (info) => {
  const file = info.file.file;  // info.file faylni o'z ichiga oladi
  // console.log(info.file.file , 'file info on register vue');
  
  selectedFile.value = file;
  console.log(file, 'file on Naive UI upload');
};

const validateForm = () => {
  errors.name = name.value.trim() ? '' : 'Name is required'
  errors.surname = surname.value.trim() ? '' : 'Surname is required'
  errors.email = email.value.trim() ? '' : 'Email is required'
  errors.phone = phone.value.trim() ? '' : 'Phone number is required'
  errors.password = password.value.trim() ? '' : 'Password is required'

  return !errors.name && !errors.surname && !errors.email && !errors.phone && !errors.password
}

const handleSubmit = () => {
  if (validateForm()) {
    register();
  }
}


const register = async () => {
  const toast = useToast()
  loader.value = true

  const encodedPassword = encodeURIComponent(password.value)
  const formData = new FormData()

  formData.append('Name', name.value)
  formData.append('Surname', surname.value)
  formData.append('Email', email.value)
  formData.append('Phone', '+998' + phone.value.replace(/\D/g, '').slice(3))
  formData.append('Password', encodedPassword)
  formData.append('Image', selectedFile.value)

  try {
    const response = await fetch('https://api.albaraka.uz/api/user/register', {
      method: 'POST',
      body: formData
    })

    const responseData = await response.json()

    if (response.ok) {
      // ✅ Register muvaffaqiyatli bo‘ldi
      // 🔥 Endi authenticate chaqiramiz

      const authResponse = await fetch('https://api.albaraka.uz/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Email: email.value,
          Password: encodedPassword
        })
      })

      const authData = await authResponse.json()

      if (authResponse.ok) {
        // Agar authenticate ham muvaffaqiyatli bo‘lsa token saqlash mumkin
        if (authData?.data?.accessToken) {
          localStorage.setItem('accessToken', authData.data.accessToken)
        }

        console.log(authData.data.accessToken , 'access token');
        
        await store.getProfileData()

        toast.add({
          title: 'Success',
          description: 'Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi!',
          color: 'success',
          timeout: 2500
        })

        store.registerModal = false
      } else {
        const authError = authData?.message || 'Avtorizatsiyada xatolik yuz berdi.'
        toast.add({
          title: 'Xatolik!',
          description: authError,
          color: 'error',
          timeout: 2500
        })
      }

    } else {
      const message = responseData?.message || 'Nomaʼlum xatolik yuz berdi.'
      toast.add({
        title: 'Xatolik!',
        description: message,
        color: 'error',
        timeout: 2500
      })
    }
  } catch (error) {
    toast.add({
      title: 'Tarmoq xatosi!',
      description: error.message,
      color: 'error',
      timeout: 2500
    })
  } finally {
    loader.value = false
  }
}
</script>
