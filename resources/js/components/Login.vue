<template>
  <div class="flex flex-wrap w-full justify-center items-center pt-10">
    <div class="flex flex-wrap max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <div class="p-2 text-2xl text-gray-800 font-semibold w-full text-center mb-4">
        <h1>Login to your account</h1>
      </div>
      
      <div v-if="errorMessage" class="p-2 w-full mb-4">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>
      </div>
      
      <div class="p-2 w-full">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Your e-mail</label>
        <input 
          id="email"
          class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" 
          placeholder="Email" 
          type="email" 
          v-model="form.email"
        >
      </div>
      
      <div class="p-2 w-full mt-3">
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          id="password"
          class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" 
          placeholder="Password" 
          type="password" 
          v-model="form.password" 
          name="password"
          @keyup.enter="login"
        >
      </div>
      
      <div class="p-2 w-full mt-6">
        <button 
          @click.prevent="login" 
          type="submit" 
          class="w-full flex justify-center text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errorMessage: '',
      isLoading: false
    }
  },
  methods: {
    login() {
      if (!this.validateForm()) return
      
      this.isLoading = true
      this.errorMessage = ''
      
      axios.post('api/login', this.form)
        .then(response => { 
          let data = response.data.data
          localStorage.setItem('token', data.token)
          this.$emit('setData')
          
          this.$router.push({ name: "dashboard" })
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            this.errorMessage = error.response.data.error
          } else {
            this.errorMessage = 'Login failed. Please check your credentials and try again.'
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    validateForm() {
      this.errorMessage = ''
      
      if (!this.form.email) {
        this.errorMessage = 'Email is required'
        return false
      }
      
      if (!this.form.password) {
        this.errorMessage = 'Password is required'
        return false
      }
      
      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(this.form.email)) {
        this.errorMessage = 'Please enter a valid email address'
        return false
      }
      
      return true
    }
  }
}
</script>