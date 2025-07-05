export async function showConfirmDialog(options = {}) {
  const {
    title = '¿Estás seguro?',
    text = 'Esta acción no se puede deshacer.',
    icon = 'warning',
    confirmButtonText = 'Sí',
    cancelButtonText = 'Cancelar'
} = options;

  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText
  });

  return result.isConfirmed;
}