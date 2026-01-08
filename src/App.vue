<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const userLabel = computed(() => auth.user?.name || auth.user?.email || 'You')

async function onLogout() {
  try {
    await auth.logout()
  } finally {
    router.push({ name: 'Home' })
  }
}
</script>
<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="bg-white border-b border-slate-100">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <h1 class="text-xl font-semibold">Laravel + Vue</h1>

        <nav class="ml-auto flex items-center gap-4 text-sm">
          <router-link
            to="/"
            class="text-slate-700 hover:text-slate-900"
            active-class="font-medium text-slate-900"
            >Home</router-link
          >

          <template v-if="auth.isAuthenticated">
            <router-link
              to="/profile"
              class="text-slate-700 hover:text-slate-900"
              active-class="font-medium text-slate-900"
              >Profile</router-link
            >
            <span class="text-slate-600 ml-4">{{ userLabel }}</span>
            <button
              @click="onLogout"
              class="ml-3 inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <router-link
              to="/login"
              class="text-slate-700 hover:text-slate-900"
              active-class="font-medium text-slate-900"
              >Login</router-link
            >
            <router-link
              to="/register"
              class="ml-3 inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
              >Register</router-link
            >
          </template>
        </nav>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-10">
      <router-view />
    </main>

    <footer class="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-slate-500">
      Keep going. Small steps turn into real skill ✨
    </footer>
  </div>
</template>

<!-- App-level component now uses Tailwind utilities; styles handled globally in src/styles/tailwind.css -->
