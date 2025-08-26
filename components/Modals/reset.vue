<template>
  <n-modal v-model:show="store.resetPasswordModal" transform-origin="center">
    <div class="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl">
      <div @click="store.resetPasswordModal = !store.resetPasswordModal" class="group absolute right-3 top-5 p-3 cursor-pointer">
        <div class="absolute inset-0 bg-[#feee00] rounded-lg opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out" />
        <X class="w-6 h-6 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
      </div>
      <div class="relative bg-[#feee00] p-12 hidden md:block">
        <div class="max-w-md text-white">
          <h1 class="text-4xl font-bold mb-4">
            Reset password on your account
          </h1>
          <p class="text-white/90">
            Simplify your e-commerce management with our user-friendly admin dashboard.
          </p>
        </div>
        <img 
          src="/register.png" 
          alt="Dashboard illustration" 
          class="my-6 w-96"
        />
      </div>

      <div class="p-12">
        <div class="flex flex-col justify-around h-full max-w-md mx-auto">
          <div class="flex items-center gap-2 mb-8">
            <div class="w-10 h-10 bg-[#feee00] rounded-full flex items-center justify-center">
              <span class="text-white font-bold">A</span>
            </div>
            <span class="font-bold text-xl">Albaraka.uz</span>
          </div>

          <n-space v-if="!store.profileData.data" vertical :size="30">
            <n-steps :current="currentStep" size="small">
              <n-step title="Email" />
              <n-step title="Verify & Reset Password" />
            </n-steps>

            <div v-if="currentStep === 1">
              <UInput
                color="warning"
                v-model="emailStep"
                placeholder="Email address"
                type="email"
                :ui="{
                  base: 'rounded-lg border-gray-200 focus:border-[#feee00] focus:ring-[#feee00]',
                  input: 'py-2 px-3',
                }"
                class="w-full mb-10"
              />

              <n-button @click="goToNextStep" type="quaternary" class="!bg-[#feee00] !text-white !hover:bg-[#feee00] !hover:text-white !border-none flex items-center justify-center mt-10">
                <div
                  v-if="loader"
                  class="w-5 h-5 border-4 border-t-white border-gray-300 rounded-full animate-spin"
                ></div>
                <span v-else>
                  Next
                </span>
              </n-button>
            </div>

            <div v-else-if="currentStep === 2">
              <UInput
                size="xs"
                color="warning"
                v-model="sixCodeStep"
                placeholder="Enter 6 code"
                :type="showSixCodeStep ? 'text' : 'password'"
                :ui="{
                  base: 'rounded-lg border-gray-200 focus:border-[#feee00] focus:ring-[#feee00]',
                  input: 'py-2 px-3',
                }"
                class="w-full"
                @keypress="onlyNumber"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="showSixCodeStep ? 'i-heroicons-eye-slash-solid' : 'i-heroicons-eye-solid'"
                    :aria-label="showSixCodeStep ? 'Hide code' : 'Show code'"
                    :aria-pressed="showSixCodeStep"
                    aria-controls="sixCodeStep"
                    @click="showSixCodeStep = !showSixCodeStep"
                  />
                </template>
              </UInput>
              <UInput
                color="warning"
                v-model="newPasswordStep"
                placeholder="New password"
                :type="showNewPasswordStep ? 'text' : 'password'"
                :ui="{
                  base: 'rounded-lg border-gray-200 focus:border-[#feee00] focus:ring-[#feee00]',
                  input: 'py-2 px-3',
                }"
                class="w-full my-5"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="showNewPasswordStep ? 'i-heroicons-eye-slash-solid' : 'i-heroicons-eye-solid'"
                    :aria-label="showNewPasswordStep ? 'Hide password' : 'Show password'"
                    :aria-pressed="showNewPasswordStep"
                    aria-controls="newPasswordStep"
                    @click="showNewPasswordStep = !showNewPasswordStep"
                  />
                </template>
              </UInput>
              <UInput
                color="warning"
                v-model="confirmPasswordStep"
                placeholder="Confirm new password"
                :type="showConfirmPasswordStep ? 'text' : 'password'"
                :ui="{
                  base: 'rounded-lg border-gray-200 focus:border-[#feee00] focus:ring-[#feee00]',
                  input: 'py-2 px-3',
                }"
                class="w-full mb-5"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="showConfirmPasswordStep ? 'i-heroicons-eye-slash-solid' : 'i-heroicons-eye-solid'"
                    :aria-label="showConfirmPasswordStep ? 'Hide password' : 'Show password'"
                    :aria-pressed="showConfirmPasswordStep"
                    aria-controls="confirmPasswordStep"
                    @click="showConfirmPasswordStep = !showConfirmPasswordStep"
                  />
                </template>
              </UInput>
              <div class="flex gap-5 items-center">
                <n-button type="quaternary" class="!bg-[#feee00] !text-white !hover:bg-[#feee00] !hover:text-white !border-none" @click="submitForm">Submit</n-button>
                <n-button @click="goToPreviousStep">Back</n-button>
              </div>
            </div>
          </n-space>

          <div v-else>
            <span v-if="forgotloader" class="flex items-center gap-2 py-5">
              <p>A 6-digit code is being sent to your email</p>
              <div class="w-5 h-5 border-4 border-t-white border-gray-300 rounded-full animate-spin"></div>
            </span>
            <UInput
              color="warning"
              v-model="sixCodeReset"
              placeholder="Enter 6 code"
              :type="showSixCodeReset ? 'text' : 'password'"
              :ui="{
                base: 'rounded-lg border-gray-200 focus:border-[#feee00] focus:ring-[#feee00]',
                input: 'py-2 px-3',
              }"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showSixCodeReset ? 'i-heroicons-eye-slash-solid' : 'i-heroicons-eye-solid'"
                  :aria-label="showSixCodeReset ? 'Hide code' : 'Show code'"
                  :aria-pressed="showSixCodeReset"
                  aria-controls="sixCodeReset"
                  @click="showSixCodeReset = !showSixCodeReset"
                />
              </template>
            </UInput>
            <UInput
              color="warning"
              v-model="newPasswordReset"
              placeholder="New password"
              :type="showNewPasswordReset ? 'text' : 'password'"
              :ui="{
                base: 'rounded-lg border-gray-200 focus:border-[#feee00] focus:ring-[#feee00]',
                input: 'py-2 px-3',
              }"
              class="w-full my-5"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showNewPasswordReset ? 'i-heroicons-eye-slash-solid' : 'i-heroicons-eye-solid'"
                  :aria-label="showNewPasswordReset ? 'Hide password' : 'Show password'"
                  :aria-pressed="showNewPasswordReset"
                  aria-controls="newPasswordReset"
                  @click="showNewPasswordReset = !showNewPasswordReset"
                />
              </template>
            </UInput>
            <UInput
              color="warning"
              v-model="confirmPasswordReset"
              placeholder="Confirm new password"
              :type="showConfirmPasswordReset ? 'text' : 'password'"
              :ui="{
                base: 'rounded-lg border-gray-200 focus:border-[#feee00] focus:ring-[#feee00]',
                input: 'py-2 px-3',
              }"
              class="w-full mb-8"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showConfirmPasswordReset ? 'i-heroicons-eye-slash-solid' : 'i-heroicons-eye-solid'"
                  :aria-label="showConfirmPasswordReset ? 'Hide password' : 'Show password'"
                  :aria-pressed="showConfirmPasswordReset"
                  aria-controls="confirmPasswordReset"
                  @click="showConfirmPasswordReset = !showConfirmPasswordReset"
                />
              </template>
            </UInput>
            <div class="flex gap-5 items-center">
              <n-button type="quaternary" class="!bg-[#feee00] !text-white !hover:bg-[#feee00] !hover:text-white !border-none" @click="resetSubmitHandler">
                Submit
              </n-button>
              <n-button class="" @click="store.changePasswordModal = !store.changePasswordModal">Back</n-button>
            </div>
          </div>
          <p class="flex gap-3 mt-8 text-center text-gray-500">
            Akkauntingiz yo'qmi?
            <h3 @click="store.registerModal = !store.registerModal , store.changePasswordModal = !store.changePasswordModal" class="cursor-pointer text-[#feee00] hover:text-[#feee00]/60">Ro'yxatdan o'tish</h3>
          </p>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import { NStep , NSteps, useMessage } from 'naive-ui';
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
const message = useMessage();
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

const showSixCodeStep = ref(false)
const showNewPasswordStep = ref(false)
const showConfirmPasswordStep = ref(false)
const showSixCodeReset = ref(false)
const showNewPasswordReset = ref(false)
const showConfirmPasswordReset = ref(false)

function submitForm() {
  if (
    sixCodeStep.value.length !== 6 ||
    !newPasswordStep.value ||
    newPasswordStep.value !== confirmPasswordStep.value
  ) {
    message.error('Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring');
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
    message.error('Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring');
    return
  }

  resetPassword(sixCodeReset.value, newPasswordReset.value, confirmPasswordReset.value, store.profileData.value.email)
}

const resetPassword = async (sixCode, newPassword, confirmPassword, email) => {
  try {
    const token = localStorage.getItem('accessToken');

    const res = await fetch(`https://api.albaraka.uz/api/user/reset-password?code=${sixCode}&newPassword=${newPassword}&confirmPassword=${confirmPassword}&email=${email}`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({})
    });

    const data = await res.json();

    if (res.ok) {
      message.success('Parolingiz muvaffaqiyatli o\'zgartirildi');
      store.resetPasswordModal = false;
      sixCodeReset.value = '';
      newPasswordReset.value = '';
      confirmPasswordReset.value = '';

      return data;
    } else {
      message.error(data?.message || 'Serverda xatolik yuz berdi');
    }
  } catch (error) {
    message.error(error.message || 'Tarmoq xatoligi');
  }
}

const forgotPassword = async (email) => {
  loader.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Sending password reset code to ${email}`);
    currentStep.value = 2;
    message.success('6 xonali kod emailingizga yuborildi');
  } catch (error) {
    message.error(error.message || 'Parolni tiklash kodi yuborishda xatolik yuz berdi');
  } finally {
    loader.value = false;
  }
};


function goToNextStep() {
  if (!emailStep.value) {
    message.error('Iltimos, emailingizni kiriting');
    return
  }
  forgotPassword(emailStep.value);
}


function goToPreviousStep() {
  currentStep.value = 1
}

function onlyNumber(e) {
  const charCode = (e.which) ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
  }
}
</script>