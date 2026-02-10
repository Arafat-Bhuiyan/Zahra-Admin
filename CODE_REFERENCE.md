# Certificate Generation - Code Reference Guide

## Quick Code Examples

### Example 1: Generate Single Certificate

```jsx
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generateSingleCertificate = async (student, courseInfo) => {
  try {
    // Create temporary container
    const tempContainer = document.createElement("div");
    tempContainer.id = `cert-${student.id}`;
    tempContainer.style.position = "fixed";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "-9999px";
    document.body.appendChild(tempContainer);

    // Render certificate component
    const root = ReactDOM.createRoot(tempContainer);
    root.render(
      <CertificateTemplate2HTML
        studentName={student.name}
        courseTitle={courseInfo.title}
        instructorName={courseInfo.instructor}
        directorName="Dr. Abdul Rahman"
        date={new Date().toLocaleDateString()}
      />,
    );

    // Wait for render
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Capture as canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/png");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);

    // Save
    pdf.save(`${student.name}_Certificate.pdf`);

    // Cleanup
    root.unmount();
    document.body.removeChild(tempContainer);

    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
```

### Example 2: Batch Certificate Generation

```jsx
const generateBatchCertificates = async (students, courseInfo) => {
  let successCount = 0;

  for (const student of students) {
    try {
      const success = await generateSingleCertificate(student, courseInfo);
      if (success) successCount++;
    } catch (error) {
      console.error(`Failed for ${student.name}:`, error);
    }
  }

  return successCount;
};
```

### Example 3: Certificate Template Structure

```jsx
// CertificateTemplate2HTML.jsx
const CertificateTemplate2HTML = ({
  studentName,
  courseTitle,
  date,
  instructorName,
  directorName,
}) => {
  return (
    <div
      style={{
        width: "297mm",
        height: "210mm",
        padding: 0,
        position: "relative",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Background */}
      <img
        src={bgImage}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Watermark */}
      <img
        src={logoImage}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.15,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <h2 style={{ fontSize: "48px", color: "#7AA4A5" }}>{studentName}</h2>
        <p style={{ fontSize: "16px", marginTop: "30px" }}>
          has successfully completed the course <strong>{courseTitle}</strong>
        </p>
      </div>
    </div>
  );
};
```

### Example 4: React Hook Pattern

```jsx
// useCertificateDownload.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const useCertificateDownload = () => {
  const generatePDF = async (elementId, fileName) => {
    try {
      const element = document.getElementById(elementId);
      if (!element) throw new Error("Element not found");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(fileName);

      return true;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return { generatePDF };
};

// Usage
const MyComponent = () => {
  const { generatePDF } = useCertificateDownload();

  const handleDownload = async () => {
    await generatePDF("certificate-container", "certificate.pdf");
  };

  return <button onClick={handleDownload}>Download</button>;
};
```

### Example 5: Configuration Options

```jsx
// html2canvas options
const canvasOptions = {
  scale: 2, // 1-3: Higher = better quality but slower
  useCORS: true, // Allow cross-origin images
  logging: false, // Disable console logs
  backgroundColor: "#ffffff", // Background color
  allowTaint: true, // Allow tainted canvas
  proxy: null, // CORS proxy (if needed)
  timeout: 30000, // Timeout in ms
  windowHeight: null, // Specific height
  windowWidth: null, // Specific width
};

// jsPDF options
const pdfOptions = {
  orientation: "landscape", // or "portrait"
  unit: "mm", // mm, px, in, cm
  format: "a4", // a4, letter, a3, etc.
  compress: true, // Compress PDF
  precision: 16, // Number precision
  filters: ["FlateDecode"], // Compression filters
};
```

### Example 6: Error Handling

```jsx
const generateWithErrorHandling = async (student) => {
  try {
    // Validate input
    if (!student?.name) {
      throw new Error("Student name is required");
    }

    // Create temporary element
    const tempDiv = document.createElement("div");
    if (!tempDiv) {
      throw new Error("Failed to create temporary element");
    }

    document.body.appendChild(tempDiv);

    // Render component
    const root = ReactDOM.createRoot(tempDiv);
    if (!root) {
      throw new Error("Failed to create React root");
    }

    // ... rest of generation code ...

    return {
      success: true,
      message: `Certificate generated for ${student.name}`,
    };
  } catch (error) {
    console.error("Certificate generation failed:", error);
    return {
      success: false,
      error: error.message,
    };
  } finally {
    // Always cleanup
    if (tempDiv && tempDiv.parentNode) {
      tempDiv.parentNode.removeChild(tempDiv);
    }
  }
};
```

### Example 7: Progress Tracking

```jsx
const generateWithProgress = async (students, callback) => {
  const total = students.length;
  let completed = 0;

  for (const student of students) {
    try {
      // Generate certificate...
      completed++;

      // Call progress callback
      if (callback) {
        callback({
          current: completed,
          total: total,
          percentage: (completed / total) * 100,
          studentName: student.name,
        });
      }
    } catch (error) {
      console.error(`Failed: ${student.name}`);
    }
  }

  return completed;
};

// Usage
generateWithProgress(students, (progress) => {
  console.log(`Progress: ${progress.percentage.toFixed(0)}%`);
  setProgressBar(progress.percentage);
});
```

### Example 8: Custom CSS in Certificate

```jsx
const CertificateWithStyles = ({ studentName }) => {
  const styles = {
    container: {
      width: "297mm",
      height: "210mm",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      fontSize: "42px",
      fontWeight: "bold",
      color: "#1a1a1a",
      textTransform: "uppercase",
      marginBottom: "20px",
    },
    studentName: {
      fontSize: "48px",
      fontWeight: "bold",
      color: "#7AA4A5",
      borderBottom: "2px solid #7AA4A5",
      paddingBottom: "10px",
    },
    footer: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "50px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>CERTIFICATE</h1>
      <h2 style={styles.studentName}>{studentName}</h2>
      <div style={styles.footer}>{/* Footer content */}</div>
    </div>
  );
};
```

### Example 9: Image Handling

```jsx
const addImageToCertificate = async () => {
  // Method 1: Imported image (local)
  import certificateImage from "./assets/cert.jpg";
  <img src={certificateImage} />;

  // Method 2: External image (requires CORS)
  <img src="https://example.com/image.jpg" />;

  // Method 3: Base64 data URL
  const base64Image = "data:image/png;base64,iVBORw0KG...";
  <img src={base64Image} />;

  // Method 4: Blob to data URL
  const blob = await fetch(url).then((r) => r.blob());
  const blobUrl = URL.createObjectURL(blob);
  <img src={blobUrl} />;
};

// CORS handling in html2canvas
const canvasWithCORS = await html2canvas(element, {
  useCORS: true, // Enable CORS
  allowTaint: true, // Allow tainted canvas
  proxy: null, // Use CORS proxy if needed
});
```

### Example 10: Download with Custom Filename

```jsx
const generateCustomFilename = (student, course, template) => {
  // Format: StudentName_CourseTitle_Date.pdf
  const date = new Date().toISOString().split("T")[0];
  const sanitized = (str) => str.replace(/[^a-z0-9]/gi, "_").toLowerCase();

  return `${sanitized(student.name)}_${sanitized(course.title)}_${date}.pdf`;
};

// Usage
const fileName = generateCustomFilename(student, course, template);
pdf.save(fileName);
// Output: john_doe_advanced_react_2026-02-10.pdf
```

---

## API Reference

### html2canvas(element, options)

```javascript
html2canvas(element, {
  scale: 2, // Output scale
  useCORS: true, // CORS support
  logging: false, // Debug logging
  backgroundColor: "#ffffff", // Background
  allowTaint: true, // Tainted canvas
  proxy: null, // CORS proxy
  timeout: 30000, // Timeout (ms)
  windowHeight: null, // Canvas height
  windowWidth: null, // Canvas width
  ignoreElements: () => false, // Skip elements
  onclone: (cloned) => {}, // Clone callback
}).then((canvas) => {
  // Canvas ready for use
});
```

### jsPDF(options)

```javascript
const pdf = new jsPDF({
  orientation: "landscape", // "portrait" or "landscape"
  unit: "mm", // "mm", "cm", "in", "px"
  format: "a4", // "a4", "letter", "a3", etc.
  compress: true, // Enable compression
  hotfixes: [], // Hotfixes array
  precision: 16, // Decimal places
});

// Methods
pdf.addImage(imageData, format, x, y, width, height);
pdf.addPage();
pdf.setFontSize(12);
pdf.text(text, x, y);
pdf.save(filename);
pdf.output("dataurlstring"); // Get as data URL
```

---

## Debugging Tips

### Enable Console Logs

```jsx
const canvas = await html2canvas(element, {
  logging: true, // Shows detailed logs
});
```

### Check Canvas Output

```jsx
const canvas = await html2canvas(element);
// Show canvas in browser
const img = document.createElement("img");
img.src = canvas.toDataURL();
document.body.appendChild(img);
```

### Timing Debug

```jsx
console.time("pdf-generation");
// ... generation code ...
console.timeEnd("pdf-generation");
// Output: pdf-generation: 2534.123ms
```

### Size Debug

```jsx
const canvas = await html2canvas(element);
console.log(`Canvas size: ${canvas.width}x${canvas.height}`);
console.log(`File size: ${(imgData.length / 1024).toFixed(2)}KB`);
```

---

## Performance Optimization

### Reduce Quality for Speed

```jsx
// Fast (lower quality)
scale: 1,
backgroundColor: "#fff",

// Balanced
scale: 2,
backgroundColor: "#fff",

// High Quality (slower)
scale: 3,
backgroundColor: "#fff",
```

### Reduce Wait Time

```jsx
// Less wait (may be incomplete)
await new Promise((resolve) => setTimeout(resolve, 500));

// Standard
await new Promise((resolve) => setTimeout(resolve, 1000));

// More wait (safer)
await new Promise((resolve) => setTimeout(resolve, 2000));
```

---

## Browser Support Matrix

| Feature       | Chrome | Firefox | Safari | Edge |
| ------------- | ------ | ------- | ------ | ---- |
| html2canvas   | ✅     | ✅      | ✅     | ✅   |
| jsPDF         | ✅     | ✅      | ✅     | ✅   |
| Canvas API    | ✅     | ✅      | ✅     | ✅   |
| CORS          | ✅     | ✅      | ✅     | ✅   |
| File Download | ✅     | ✅      | ✅     | ✅   |
| Blob URLs     | ✅     | ✅      | ✅     | ✅   |

---

## Useful Resources

- **html2canvas Docs**: https://html2canvas.hertzen.com/
- **jsPDF Docs**: https://github.com/parallax/jsPDF
- **React Docs**: https://react.dev/
- **MDN Canvas**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **MDN FileReader**: https://developer.mozilla.org/en-US/docs/Web/API/FileReader

---

**Last Updated**: February 10, 2026
