function generatePDF({
  container = ".container-report-pdf",
  filename = "Reporte.pdf",
  orientation = "portrait",
  margin = 0.2
} = {}) {
  const elementsToHide = document.querySelectorAll(".no-in-pdf");
  const originalDisplays = [];

  elementsToHide.forEach((el, i) => {
    originalDisplays[i] = el.style.display;
    el.style.display = "none";
  });

  const element =
    document.querySelector(".container-report-pdf") ||
    document.querySelector(".container-details");

  if (!element) {
    console.error("No se encontró el contenedor para el PDF");
    return;
  }

  const opt = {
    margin,
    filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      elementsToHide.forEach((el, i) => {
        el.style.display = originalDisplays[i];
      });
    });
}