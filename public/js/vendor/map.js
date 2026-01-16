document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("mapid").setView([19.222076, -70.529688], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.marker([19.222076, -70.529688])
    .addTo(map)
    .bindPopup("<b>Ubicación</b><br />Calle Libertad, La Vega 41000.")
    .openPopup();

  map.scrollWheelZoom.disable();
  map.touchZoom.disable();

  setTimeout(() => {
    map.invalidateSize();
  }, 500);
});