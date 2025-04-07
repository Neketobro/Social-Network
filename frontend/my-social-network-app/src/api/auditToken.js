const baseUrl = import.meta.env.VITE_BASE_DB_URL;

export async function fetchProtectedData() {
  const token = sessionStorage.getItem('token');

  const response = await fetch(`${baseUrl}protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await response.json();
}
