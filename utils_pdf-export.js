
// utils/pdf-export.js

export function exportToPDF(htmlContent, fileName = 'output.pdf') {
  const element = document.createElement('a');
  const blob = new Blob([htmlContent], { type: 'application/pdf' });
  element.href = URL.createObjectURL(blob);
  element.download = fileName;
  element.click();
}
