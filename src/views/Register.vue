<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const auth = useAuthStore()
const router = useRouter()

async function submit() {
  loading.value = true
  error.value = null
  try {
    await auth.register({ name: name.value, email: email.value, password: password.value })
    await router.push({ name: 'Profile' })
  } catch (err: any) {
    error.value = err?.payload?.message || err?.message || 'Register failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-4">Create an account</h2>
    <form @submit.prevent="submit" class="flex flex-col gap-4">
      <label class="block">
        <span class="text-sm font-medium text-slate-700">Name</span>
        <input
          v-model="name"
          type="text"
          required
          class="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </label>

      <label class="block">
        <span class="text-sm font-medium text-slate-700">Email</span>
        <input
          v-model="email"
          type="email"
          required
          class="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </label>

      <label class="block">
        <span class="text-sm font-medium text-slate-700">Password</span>
        <input
          v-model="password"
          type="password"
          required
          minlength="6"
          class="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </label>

      <div class="flex items-center justify-between mt-2">
        <button
          class="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
          :disabled="loading"
        >
          {{ loading ? 'Creating…' : 'Create account' }}
        </button>
      </div>

      <p v-if="error" class="text-sm text-red-600 mt-2">{{ error }}</p>
    </form>
  </div>
</template>
