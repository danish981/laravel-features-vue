const getBaseUrl = () => {
  // default to Vite env var; fallback to empty string for relative paths
  return (import.meta.env.VITE_API_BASE_URL as string) || ''
}

async function request(path: string, options: RequestInit = {}) {
  const base = getBaseUrl()
  const url = path.startsWith('http') ? path : `${base}${path}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  }

  const res = await fetch(url, { ...options, headers, credentials: 'include' })

  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')

  if (!res.ok) {
    const payload = isJson ? await res.json().catch(() => null) : null
    const err: any = new Error(payload?.message || res.statusText || 'Request failed')
    err.status = res.status
    err.payload = payload
    throw err
  }

  if (isJson) return res.json()
  return res.text()
}

export async function apiGet(path: string, init?: RequestInit) {
  return request(path, { ...init, method: 'GET' })
}

export async function apiPost(path: string, body?: any, init?: RequestInit) {
  return request(path, { ...init, method: 'POST', body: body ? JSON.stringify(body) : undefined })
}

export async function apiPut(path: string, body?: any, init?: RequestInit) {
  return request(path, { ...init, method: 'PUT', body: body ? JSON.stringify(body) : undefined })
}

export async function apiDelete(path: string, init?: RequestInit) {
  return request(path, { ...init, method: 'DELETE' })
}

export default { get: apiGet, post: apiPost, put: apiPut, delete: apiDelete }
