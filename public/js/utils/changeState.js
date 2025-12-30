import { showToast } from './toastify.js';

export async function changeEntityStatus({
  endpoint,
  id,
  currentStatus,
  collection,
  render,
  errorMessage = "No se pudo cambiar el estado."
}) {
  try {
    const newState = currentStatus ? 0 : 1;

    const res = await fetch(`${endpoint}/${id}/estado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activo: newState })
    });

    if (!res.ok) throw new Error();

    const data = await res.json();
    if (data.success === false) throw new Error();

    const index = collection.findIndex(e => e.id === id);
    if (index !== -1) {
      collection[index].activo = newState;
    }

    render();
  } catch (err) {
    showToast(errorMessage, "#e74c3c", "alert-circle");
  }
}