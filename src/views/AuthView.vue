<template>
  <div
    v-if="pageLoading"
    class="d-flex align-items-center justify-content-center text-center min-vh-100"
  >
    <p>Loading</p>
    <q-spinner-dots name="dots" size="3rem" />
  </div>
  <section v-else class="d-flex align-items-center justify-content-center min-vh-100">
    <div>
      <div v-if="user">
        <h2 class="text-center font-weight-bold h2">:+1:Login Success</h2>
      </div>
      <div v-else class="w-80 d-flex flex-column gap-4 rounded-lg p-4">
        <h1 class="text-center font-weight-bold h2 mb-4">
          Welcome to <br />
          Book Store App
        </h1>
        <template v-if="showOTP">
          <div class="rounded-circle mx-auto p-4 w-fit">
            <q-icon name="lock" size="2rem" />
          </div>
          <p class="text-center text-bold">{{ phone }}</p>
          <label for="otp" class="font-weight-bold h4 text-center"> Enter your OTP </label>
          <div style="display: flex; flex-direction: row">
            <v-otp-input
              ref="otpInput"
              v-model:value="bindModal"
              input-classes="otp-input"
              separator="-"
              :num-inputs="6"
              :should-auto-focus="true"
              input-type="letter-numeric"
              :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
              :placeholder="['*', '*', '*', '*', '*', '*']"
              @on-change="handleOnChange"
              @on-complete="handleOnComplete"
            />
          </div>
          <button class="btn btn-warning" @click="clearInput()">Clear Input</button>

          <button
            @click="onOTPVerify"
            class="btn btn-primary w-100 d-flex gap-1 align-items-center justify-content-center py-2.5 rounded"
            :disabled="!bindModal || bindModal.length != 6"
          >
            <span v-if="loading">
              <q-spinner-dots name="dots" />
            </span>
            <span>Verify OTP</span>
          </button>
        </template>
        <template v-else>
          <div class="rounded-circle mx-auto p-4 w-fit">
            <q-icon name="phone" size="2rem" />
          </div>
          <label for="" class="font-weight-bold h4 text-center"> Verify your phone number </label>
          <VueTelInput
            v-model="phone"
            :default-country="'PK'"
            v-on:country-changed="countryChanged"
          />

          <button
            @click="onCaptchVerify"
            :disabled="!phone || !phoneNumberCountry || loading"
            class="btn btn-primary w-100 d-flex gap-1 align-items-center justify-content-center py-2.5 rounded"
          >
            <span v-if="loading">
              <q-spinner-dots name="dots" />
            </span>
            <span>Send code via SMS</span>
          </button>
          <div id="recaptcha-container"></div>
          <p class="text-center text-bold">or</p>
          <button class="btn btn-primary" @click="guestUser">Guest User</button>
        </template>
      </div>
    </div>
  </section>
</template>
<script setup>
import VOtpInput from 'vue3-otp-input'
import { ref, onMounted } from 'vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { auth } from '../firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getUserInfo, storeUserInfo } from '../services/user.js'

const router = useRouter()
const store = useStore()

onMounted(() => {
  const userData = getUserInfo()
  if (userData) {
    updateUserData(userData)
  }
  pageLoading.value = false
})

const updateUserData = (data) => {
  store.commit('setUserData', data)
  setTimeout(() => {
    router.push({ name: 'books' })
  }, 500)
}

const phone = ref('')

const $toast = useToast()

const phoneNumberCountry = ref('') // The selected country code
const pageLoading = ref(true)
const loading = ref(false)
const showOTP = ref(false)
const user = ref(null)
const countryChanged = (country) => {
  phoneNumberCountry.value = country
}

const guestUser = () => {
  storeUserInfo({ id: 'guest', phone: 'guest' })
  updateUserData({ id: 'guest', phone: 'guest' })
}

//OTP Input
const otpInput = ref(null)
const bindModal = ref('')

const handleOnComplete = (value) => {
  console.log('OTP completed: ', value)
}

const handleOnChange = (value) => {
  console.log('OTP changed: ', value)
}

const clearInput = () => {
  otpInput.value?.clearInput()
}

const onCaptchVerify = () => {
  try {
    loading.value = true
    const phoneNumber = formatAndValidatePhoneNumberForFirebase(phone.value)

    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'normal',
      callback: (response) => {
        console.log(response, 'success')
        signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult
            loading.value = false
            showOTP.value = true
            $toast.success('OTP sent successfully!')
          })
          .catch((error) => {
            window.recaptchaVerifier?.clear()
            if (error.code === 'auth/quota-exceeded') {
              $toast.error("Today's OTP send limit reached. Please try again later.")
            } else if (error.message) {
              $toast.error(error.message)
            } else {
              $toast.error('Error in sending OTP!')
              console.error('Error: ', error)
            }
            loading.value = false
          })
      },
      'expired-callback': () => {
        console.log('expired')
        $toast.error('Timed out')
      }
    })

    window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId
    })
  } catch (error) {
    loading.value = false
    window.recaptchaVerifier?.clear()
    $toast.error(error.message || 'Error in sending OTP!')
    console.log(error)
  }
}

const formatAndValidatePhoneNumberForFirebase = (phoneNumber) => {
  if (!phoneNumber) {
    throw $toast.error('Please enter a phone number')
  }
  let cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, '') // Remove all non-numeric characters
  // remove leading zeroes (not needed for firebase phone auth)
  cleanedPhoneNumber = cleanedPhoneNumber.replace(/^0+/, '')
  cleanedPhoneNumber = '+' + cleanedPhoneNumber

  // Ensure the phone number contains at least 10 digits (adjust as needed)
  if (cleanedPhoneNumber.length < 10) {
    throw $toast.error('Phone number is too short')
  }

  return cleanedPhoneNumber
}

const onOTPVerify = () => {
  console.log(bindModal.value)
  loading.value = true
  window.confirmationResult
    .confirm(bindModal.value)
    .then((res) => {
      user.value = res.user

      loading.value = false
      storeUserInfo({ id: res.user.uid, phone: res.user.phoneNumber })
      updateUserData({ id: res.user.uid, phone: res.user.phoneNumber })
    })
    .catch((err) => {
      $toast.error(err.message || 'Error in verifying OTP!')
      console.log(err)
      loading.value = false
    })
}
</script>
<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background color of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
