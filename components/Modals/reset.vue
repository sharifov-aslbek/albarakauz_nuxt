<template>

     <n-modal v-model:show="store.resetPasswordModal" transform-origin="center">
    <div class="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl">
      <div @click="store.resetPasswordModal = !store.resetPasswordModal" class="group absolute right-3 top-5 p-3 cursor-pointer">
              <!-- Background circle with scale animation -->
              <div
                class="absolute inset-0 bg-[#06D6A0] rounded-lg opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out" />
              <X class="w-6 h-6 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
            </div>
      <!-- Left Side - Orange Section -->
      <div class="relative bg-[#06D6A0] p-12 hidden md:block">
        <div class="max-w-md text-white">
          <h1 class="text-4xl font-bold mb-4">
            Reset password on your account
          </h1>
          <p class="text-white/90">
            Simplify your e-commerce management with our user-friendly admin dashboard.
          </p>
        </div>
        <img 
          src="/assets/shop-icon.png" 
          alt="Dashboard illustration" 
          class="my-6 w-96"
        />
      </div>

      <!-- Right Side - Login Form -->
      <div class="p-12">
        <div class="flex flex-col justify-around h-full max-w-md mx-auto">
          <!-- Logo -->
          <div class="flex items-center gap-2 mb-8">
            <div class="w-10 h-10 bg-[#06D6A0] rounded-full flex items-center justify-center">
              <span class="text-white font-bold">A</span>
            </div>
            <span class="font-bold text-xl">Albaraka.uz</span>
          </div>

            <n-space v-if="!store.profileData.data" vertical :size="30">
                <n-steps :current="currentStep" size="small">
                  <n-step title="Email" />
                  <n-step title="Verify & Reset Password" />
                </n-steps>


    <!-- Step 1: Email input -->
    <div v-if="currentStep === 1">
      <n-input
                type="email"
                placeholder="Email address"
                class="w-full px-1 py-2 rounded-lg bg-gray-50 border outline-none mb-10  focus:border-[#06D6A0] border-gray-200"
                v-model:value="emailStep"
              />

        <!-- <n-button @click="emailStep = store.profileData?.email" type="success" class="flex items-center" :bordered="false">
      {{ store.profileData?.email }} <Copy class="ml-2" />
    </n-button> -->
    <br>

      <n-button @click="goToNextStep"    type="quaternary"
  class="!bg-[#06D6A0] !text-white !hover:bg-[#06D6A0] !hover:text-white !border-none flex items-center justify-center mt-10">
        <div
                v-if="loader"
                class="w-5 h-5 border-4 border-t-white border-gray-300 rounded-full animate-spin"
              ></div>
        <span v-else>
          Next
        </span>

      </n-button>
    </div>

    <!-- Step 2: Verification Code & New Password -->
    <div v-else-if="currentStep === 2">
     <!-- <n-config-provider :theme-overrides="themeOverrides"> -->
        <n-input
      v-model:value="sixCodeStep"
      class="w-full py-2 px-1 rounded-lg bg-gray-50 outline-none border-gray-200"
      type="password"
      show-password-on="click"
      placeholder="Enter 6 code"
      @keypress="onlyNumber"
    />

     <n-input
      v-model:value="newPasswordStep"
      class="w-full py-2 px-1 rounded-lg bg-gray-50 outline-none my-5 border-gray-200"
      type="password"
      show-password-on="click"
      placeholder="New password"
    />

      <n-input
      v-model:value="confirmPasswordStep"
      class="w-full py-2 px-1 rounded-lg bg-gray-50 mb-5 outline-none border-gray-200"
      type="password"
      show-password-on="click"
      placeholder="Confirm new password"
    />
     <!-- </n-config-provider> -->
     <div class="flex gap-5 items-center">

      <n-button   type="quaternary"
  class="!bg-[#06D6A0] !text-white !hover:bg-[#06D6A0] !hover:text-white !border-none" @click="submitForm">Submit</n-button>
      <n-button @click="goToPreviousStep">Back</n-button>
      </div>
    </div>
  </n-space>

  <div v-else>
    <span v-if="forgotloader" class="flex items-center gap-2 py-5">
      <p>A 6-digit code is being sent to your email</p>
      <div
                class="w-5 h-5 border-4 border-t-white border-gray-300 rounded-full animate-spin"
              ></div>
    </span>
     <!-- <n-config-provider :theme-overrides="themeOverrides"> -->
       <n-input
 v-model:value="sixCodeReset"
 class="w-full py-2 px-1 rounded-lg bg-gray-50 outline-none border-gray-200"
 type="password"
 show-password-on="click"
 placeholder="Enter 6 code"
 @keypress="onlyNumber"
/>


    <n-input
     v-model:value="newPasswordReset"
     class="w-full py-2 px-1 rounded-lg bg-gray-50 outline-none my-5 border-gray-200"
     type="password"
     show-password-on="click"
     placeholder="New password"
   />

     <n-input
     v-model:value="confirmPasswordReset"
     class="w-full py-2 px-1 rounded-lg bg-gray-50 mb-8 outline-none border-gray-200"
     type="password"
     show-password-on="click"
     placeholder="Confirm new password"
   />
     <!-- </n-config-provider> -->

     <div class="flex gap-5 items-center">
         <n-button
           type="quaternary"
           class="!bg-[#06D6A0] !text-white !hover:bg-[#06D6A0] !hover:text-white !border-none"
           @click="resetSubmitHandler"
         >
           Submit
         </n-button>
               <n-button class="" @click="store.changePasswordModal = !store.changePasswordModal">Back</n-button>
     </div>
    </div>



          <!-- Login Form -->
          <!-- <h2 class="text-2xl font-bold text-gray-900 mb-2">Enter your passwords</h2>
          <p class="text-gray-500 mb-8">Please enter passwords</p>

          <form @submit.prevent="handleResetPasswordSubmit" class="space-y-6">
            

            <div class="relative">
              <input
                :type="showChangePassword ? 'text' : 'password'"
                placeholder="Enter 6 code"
                class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-[#06D6A0]"
                required
                v-model="oldpassword"
              />
              <button 
                @click="showChangePassword = !showChangePassword"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <EyeIcon v-if="!showChangePassword" class="w-5 h-5" />
                <EyeOffIcon v-else class="w-5 h-5" />
              </button>
            </div>

          
            
            <div class="relative">
              <input
                :type="showChangePassword2 ? 'text' : 'password'"
                placeholder="New password"
                class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-[#06D6A0]"
                required
                v-model="newpassword"
              />
              <button 
                @click="showChangePassword2 = !showChangePassword2"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <EyeIcon v-if="!showChangePassword2" class="w-5 h-5" />
                <EyeOffIcon v-else class="w-5 h-5" />
              </button>
            </div>

            
            <div class="relative">
              <input
                :type="showChangePassword3 ? 'text' : 'password'"
                placeholder="Confirm new password"
                class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-[#06D6A0]"
                required
                v-model="confirmPassword"
              />
              <button 
                @click="showChangePassword3 = !showChangePassword3"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <EyeIcon v-if="!showChangePassword3" class="w-5 h-5" />
                <EyeOffIcon v-else class="w-5 h-5" />
              </button>
            </div>

            <h3 v-if="resendChecker" class="text-xs flex gap-1 items-center">
              Try again <span v-if="store.count > 0">with {{ store.count }} seconds</span>
  
  <button type="button" @click="store.count <= 10 && resendSubmitReset()" :disabled="store.count < 10 && store.count != 0" class="bg-[#06D6A0] py-1 px-2 rounded-lg text-white" >
              Send
              </button>

            </h3>

            <button
              type="submit"
              class="w-full py-3 px-4 bg-[#06D6A0] hover:bg-[#06D6A0]/70 text-white rounded-lg transition-colors"
            >
              Change password
            </button>
          </form> -->

          <p class="flex gap-3 mt-8 text-center text-gray-500">
            Don't have an account?
            <h3 @click="store.registerModal = !store.registerModal , store.changePasswordModal = !store.changePasswordModal" class="cursor-pointer text-[#06D6A0] hover:text-[#06D6A0]/70">Signup</h3>
          </p>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import { NStep , NSteps } from '#components';
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'    

const store = useAuthStore()
const toast = useToast();
const emailStep = ref('')
const sixCodeReset = ref('')
const newPasswordReset = ref('')
const confirmPasswordReset = ref('')
const forgotloader = ref(false)
const currentStep = ref(1)
const newPasswordStep = ref('')
const confirmPasswordStep = ref('')
const sixCodeStep = ref('')
const loader = ref(false)

function submitForm() {
  if (
    sixCodeStep.value.length !== 6 ||
    !newPasswordStep.value ||
    newPasswordStep.value !== confirmPasswordStep.value
  ) {
    window.alert('Please fill all fields correctly')
    return
  }

  resetPassword(sixCodeStep.value, newPasswordStep.value, confirmPasswordStep.value, emailStep.value)
}

const resetSubmitHandler = () => {
  if (
    sixCodeReset.value.length !== 6 ||
    !newPasswordReset.value ||
    newPasswordReset.value !== confirmPasswordReset.value
  ) {
    toast.add({
      title: 'Xatolik',
      description: 'Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring',
      color: 'error'
    })
    return
  }

  resetPassword(sixCodeReset.value, newPasswordReset.value, confirmPasswordReset.value, store.profileData.email)
}

const resetPassword = async (sixCode, newPassword, confirmPassword, email) => {
  try {
    const token = localStorage.getItem('accessToken');

    const res = await fetch(`https://albaraka.uz/api/user/reset-password?code=${sixCode}&newPassword=${newPassword}&confirmPassword=${confirmPassword}&email=${email}`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({})
    });

    const data = await res.json();

    if (res.ok) {
      toast.add({
        title: 'Success',
        description: 'Your password has been successfully changed',
        color: 'success'
      });
      store.resetPasswordModal = false;
      sixCodeReset.value = '';
      newPasswordReset.value = '';
      confirmPasswordReset.value = '';

      return data;
    } else {
      toast.add({
        title: 'Xatolik',
        description: data?.message || 'Serverda xatolik yuz berdi',
        color: 'error'
      });
    }
  } catch (error) {
    toast.add({
      title: 'Xatolik',
      description: error.message || 'Tarmoq xatoligi',
      color: 'error'
    });
  }
}


function goToNextStep() {
  if (!emailStep.value) {
    toast.add({
      title: 'Xatolik',
      description: 'Please enter your email',
      color: 'error',
    })
    return
  }
  forgotPassword(emailStep.value);
}


function goToPreviousStep() {
  currentStep.value = 1
}
</script>