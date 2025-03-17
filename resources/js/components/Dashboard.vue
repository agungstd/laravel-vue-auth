<template>
  <div>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Dashboard Information.</p>
        </div>
        <button @click.prevent="logout" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
          Logout
        </button>
      </div>
      <div class="border-t border-gray-200">
        <dl v-if="loading">
          <div class="bg-gray-50 px-4 py-5 sm:px-6 text-center">
            <p class="text-gray-500">Loading user data...</p>
          </div>
        </dl>
        <dl v-else-if="error">
          <div class="bg-gray-50 px-4 py-5 sm:px-6 text-center">
            <p class="text-red-500">{{ error }}</p>
          </div>
        </dl>
        <dl v-else-if="user">
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.name }}</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.email }}</dd>
          </div>
        </dl>
      </div>
    </div>
    
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Subject List</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">All available subjects.</p>
      </div>
      <div class="border-t border-gray-200">
        <div v-if="!getAllSubjects.length" class="bg-gray-50 px-4 py-5 sm:px-6 text-center">
          <p class="text-gray-500">No subjects available.</p>
        </div>
        <ul v-else class="divide-y divide-gray-200">
          <li v-for="(item, index) in getAllSubjects" :key="item.id" class="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div class="flex items-center">
              <div class="min-w-6 mr-4 text-gray-500">{{ index + 1 }}.</div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      user: null,
      loading: true,
      error: null
    }
  },
  mounted() {
    this.fetchSubjects()
  },
  created() {
    this.fetchUserData()
  },
  methods: {
    fetchSubjects() {
      this.$store.dispatch('subject/allsubjectFromDatabase')
        .catch(error => {
          console.error('Error fetching subjects:', error)
        })
    },
    fetchUserData() {
      this.loading = true
      this.error = null
      
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
      
      axios.get('api/user')
        .then(response => {
          this.user = response.data
          this.loading = false
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
          this.error = 'Failed to load user data'
          this.loading = false
        })
    },
    logout() {
      // Option to add API logout request here
      // axios.post('api/logout')
      //   .then(() => {
      //     this.handleLogout()
      //   })
      //   .catch(error => {
      //     console.error('Error logging out:', error)
      //     this.handleLogout()
      //   })
      
      this.handleLogout()
    },
    handleLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters({
      getAllSubjects: 'subject/getSubject'
    })
  }
}
</script>