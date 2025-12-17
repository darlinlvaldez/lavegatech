export function formatDateForExcel(fechaString) {
  if (!fechaString) return '';
  try {
    const [year, month, day] = fechaString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-DO', { year: 'numeric', month: '2-digit', day: '2-digit' });
  } catch (error) {
    console.error('Error formateando fecha:', fechaString, error);
    return fechaString;
  }
}