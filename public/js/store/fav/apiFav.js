export async function apiFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API error → ${url}`, error);
    throw error;
  }
}

export async function getAuthStatus() {
  try {
    return await apiFetch('/api/auth/status');
  } catch {
    return { authenticated: false };
  }
}