import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const useCertificateDownload = () => {
  const generatePDF = async (
    elementId,
    fileName = "certificate.pdf",
    orientation = "landscape",
  ) => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error("Certificate element not found");
      }

      // Capture the element as a canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
      });

      // Create PDF with A4 landscape dimensions
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate aspect ratio to fit the image properly
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add image to PDF page(s)
      while (heightLeft >= 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        if (heightLeft > 0) {
          pdf.addPage();
          position = heightLeft - imgHeight;
        }
      }

      // Download the PDF
      pdf.save(fileName);
      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  };

  const generateMultiplePDFs = async (
    certificatesData,
    template,
    onProgress,
  ) => {
    try {
      for (let i = 0; i < certificatesData.length; i++) {
        const cert = certificatesData[i];
        const fileName = `${cert.studentName?.replace(/\s+/g, "_")}_certificate.pdf`;

        // Create a temporary container
        const tempContainer = document.createElement("div");
        tempContainer.id = `temp-cert-${i}`;
        tempContainer.style.position = "fixed";
        tempContainer.style.left = "-9999px";
        tempContainer.style.top = "-9999px";
        document.body.appendChild(tempContainer);

        // Render the template
        const root = ReactDOM.createRoot(tempContainer);
        root.render(template(cert));

        // Wait for render
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Generate PDF
        await generatePDF(`temp-cert-${i}`, fileName, "landscape");

        // Clean up
        root.unmount();
        document.body.removeChild(tempContainer);

        if (onProgress) {
          onProgress((i + 1) / certificatesData.length);
        }
      }
      return true;
    } catch (error) {
      console.error("Error generating multiple PDFs:", error);
      throw error;
    }
  };

  return { generatePDF, generateMultiplePDFs };
};
