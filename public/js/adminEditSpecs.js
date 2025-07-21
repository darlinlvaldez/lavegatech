import { showToast } from './toastify.js';

document.querySelectorAll('.save-button').forEach(button => {
  button.addEventListener('click', async () => {
    const tabContent = button.closest('.tab-content');
    if (!tabContent) return;

    const inputs = tabContent.querySelectorAll('input, select, textarea');
    const data = {};
    inputs.forEach(input => {
      if (input.name) {
        data[input.name] = input.type === 'checkbox' ? input.checked : input.value;
      }
    });

    const deviceNameInput = document.getElementById('device-name');
    if (deviceNameInput) {
      data['nombre'] = deviceNameInput.value;
    }

    try {
      const res = await fetch(`/api/specs/movil/${movilId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error();

      showToast('Cambios guardados con éxito', '#27ae60', 'check-circle');
    } catch (err) {
      showToast('Error al guardar cambios', '#e74c3c', 'alert-circle');
    }
  });
});