function generatePDF() {
  const elementsToHide = document.querySelectorAll(".no-in-pdf");
  const originalDisplays = [];

  elementsToHide.forEach((el, i) => {
    originalDisplays[i] = el.style.display;
    el.style.display = "none";
  });

  const element = document.querySelector(".container-details");

  const opt = {
    margin: 0.5,
    filename: "mi-orden.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save().then(() => {
    elementsToHide.forEach((el, i) => {
      el.style.display = originalDisplays[i];
    });
  });
}