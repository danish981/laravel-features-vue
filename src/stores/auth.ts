import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

const TOKEN_KEY = 'auth.token'
const USER_KEY = 'auth.user'

function readToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function writeToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

function writeUser(user: any | null) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  else localStorage.removeItem(USER_KEY)
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(readToken())
  const user = ref<any | null>(
    localStorage.getItem(USER_KEY) ? JSON.parse(localStorage.getItem(USER_KEY) as string) : null,
  )
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(payload: { email: string; password: string }) {
    loading.value = true
    error.value = null

    try {
      // default Laravel-like login endpoint
      const res = await api.post('/api/login', payload)

      // support both common shapes: { token } or { access_token } or {token:..., user:...}
      const newToken = res?.token || res?.access_token || res?.data?.token
      const resUser = res?.user || res?.data?.user || res?.data || null

      if (!newToken && !resUser) throw new Error('Unexpected login response shape')

      if (newToken) {
        token.value = newToken
        writeToken(newToken)
      }

      if (resUser) {
        user.value = resUser
        writeUser(resUser)
      }

      return { token: newToken, user: resUser }
    } catch (err: any) {
      error.value = err?.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(payload: { name?: string; email: string; password: string }) {
    loading.value = true
    error.value = null
    try {
      const res = await api.post('/api/register', payload)

      // some APIs return user + token
      const newToken = res?.token || res?.access_token || res?.data?.token
      const resUser = res?.user || res?.data?.user || res?.data || null

      if (newToken) {
        token.value = newToken
        writeToken(newToken)
      }
      if (resUser) {
        user.value = resUser
        writeUser(resUser)
      }

      return { token: newToken, user: resUser }
    } catch (err: any) {
      error.value = err?.message || 'Register failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    if (!token.value) return null

    loading.value = true
    error.value = null
    try {
      const res = await api.get('/api/user', {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      user.value = res
      writeUser(res)
      return res
    } catch (err: any) {
      error.value = err?.message || 'Failed to fetch user'
      // if unauthorized, clear token
      if (err?.status === 401 || err?.status === 403) {
        logout()
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    // attempt server logout but always clear local state
    try {
      if (token.value)
        await api.post('/api/logout', null, { headers: { Authorization: `Bearer ${token.value}` } })
    } catch (e) {
      // ignore
    }

    token.value = null
    user.value = null
    writeToken(null)
    writeUser(null)
  }

  function setToken(t: string | null) {
    token.value = t
    writeToken(t)
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    fetchUser,
    logout,
    setToken,
  }
})

export default useAuthStore
