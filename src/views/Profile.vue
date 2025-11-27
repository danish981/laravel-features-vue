<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

onMounted(async () => {
  // try to fetch the freshest user info if token exists
  if (auth.token && !auth.user) {
    try {
      await auth.fetchUser()
    } catch (e) {
      /* ignore */
    }
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto my-8">
    <h2 class="text-2xl font-semibold mb-4">Your profile</h2>

    <p v-if="!auth.isAuthenticated" class="text-sm text-slate-600">You are not signed in.</p>

    <div v-else class="bg-white p-6 rounded-lg border border-slate-100">
      <p>
        <strong class="text-slate-700">Name:</strong>
        <span class="ml-2 text-slate-800">{{ auth.user?.name }}</span>
      </p>
      <p class="mt-2">
        <strong class="text-slate-700">Email:</strong>
        <span class="ml-2 text-slate-800">{{ auth.user?.email }}</span>
      </p>
      <pre class="mt-4 bg-slate-50 p-4 rounded text-sm text-slate-700">{{ auth.user }}</pre>
    </div>
  </div>
</template>
