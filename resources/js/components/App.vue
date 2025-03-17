<template>
  <div>
    <nav class="bg-green-600">
      <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <p class="ml-3 font-medium text-white truncate">
              <span class="md:hidden">Sample Vue Js + Laravel!</span>
              <span class="hidden md:inline">Implementation of login, get data, vuex with laravel and vuejs</span>
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <router-link 
              :to="{ name: 'login' }" 
              class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50"
            >
              Login
            </router-link>
            <router-link 
              :to="{ name: 'dashboard' }" 
              class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50"
            >
              Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <main class="content max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  }
}
</script>