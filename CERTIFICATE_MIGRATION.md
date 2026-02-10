# Certificate Generation Migration - React + html2canvas + jsPDF

## Overview

Successfully migrated the certificate generation system from `@react-pdf/renderer` to a stack using **React**, **html2canvas**, and **jsPDF**. This implementation provides better performance, easier customization, and more flexibility for certificate designs.

## Stack

- **Frontend Framework**: React 19.1.1
- **HTML to Canvas**: html2canvas (captures HTML as PNG)
- **PDF Generation**: jsPDF (generates PDF from canvas images)
- **Styling**: Tailwind CSS + inline styles
- **UI Components**: Lucide React icons + Custom components

## Key Changes

### 1. **Removed Dependencies**

- `@react-pdf/renderer` - No longer needed
- `PDFDownloadLink` and `PDFViewer` components removed

### 2. **Added Dependencies**

```bash
npm install html2canvas jspdf
```

### 3. **New Files Created**

#### `src/Admin/Certificate/Templates/CertificateTemplate2HTML.jsx`

- HTML/CSS-based certificate template (replaces react-pdf version)
- Uses inline styles for better html2canvas compatibility
- Dimensions: 297mm × 210mm (A4 landscape)
- Features:
  - Background image support
  - Logo watermark with adjustable opacity
  - Signature images for instructor and director
  - Award badge icon
  - Student name with custom styling
  - Course details
  - Date display

#### `src/hooks/useCertificateDownload.js`

- Utility hook for PDF generation
- Functions:
  - `generatePDF()` - Generate single PDF from HTML element
  - `generateMultiplePDFs()` - Batch certificate generation
- Handles canvas capture, PDF creation, and file download

### 4. **Updated Files**

#### `src/Admin/Certificate/CertificateDetails.jsx`

**Major Changes**:

- Replaced `PDFDownloadLink` and `PDFViewer` with custom HTML rendering
- Added `generateCertificates()` function that:
  1. Creates temporary DOM elements for each student
  2. Renders the certificate template with student data
  3. Captures the element as a canvas using html2canvas
  4. Converts canvas to PDF using jsPDF
  5. Saves PDF to user's device
  6. Cleans up temporary elements
- Updated preview modal to display HTML template at scaled resolution
- Single button "Generate Certificates" replaces complex PDF link logic

## How It Works

### Certificate Generation Flow

```
Student Selection
    ↓
User clicks "Generate Certificates"
    ↓
For each selected student:
    1. Create hidden div (off-screen)
    2. Render CertificateTemplate2HTML component with student data
    3. Wait for render to complete
    4. Use html2canvas to capture element as image
    5. Create jsPDF instance (A4 landscape orientation)
    6. Add image to PDF
    7. Download PDF with student name
    8. Cleanup DOM
    ↓
Show success toast notification
Clear selection
```

### File Structure

```
src/Admin/Certificate/
├── Certificate.jsx
├── CertificateDetails.jsx (UPDATED)
├── GenerateCertificateModal.jsx
├── Templates/
│   ├── CertificateTemplate1.jsx (react-pdf version - deprecated)
│   └── CertificateTemplate2HTML.jsx (NEW - HTML version)
├── EditBundleModal.jsx
└── ... other files
```

## Usage Example

### Basic Certificate Generation

```jsx
// In CertificateDetails component
const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
const SelectedTemplate = selectedTemplate.component;

// Create temporary container
const tempContainer = document.createElement("div");
tempContainer.id = `cert-${student.id}`;
document.body.appendChild(tempContainer);

// Render template
const root = ReactDOM.createRoot(tempContainer);
root.render(
  <SelectedTemplate
    studentName={student.name}
    courseTitle={selectedCourse.title}
    instructorName={selectedCourse.instructor}
    directorName="Dr. Name"
    date={new Date().toLocaleDateString()}
  />,
);

// Wait for render
await new Promise((resolve) => setTimeout(resolve, 1000));

// Generate PDF
const canvas = await html2canvas(tempContainer, {
  scale: 2,
  useCORS: true,
  backgroundColor: "#ffffff",
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
pdf.save(`${student.name}_Certificate.pdf`);

// Cleanup
root.unmount();
document.body.removeChild(tempContainer);
```

## Features

✅ **Single Certificate Download** - Generate and download one certificate at a time
✅ **Batch Processing** - Generate certificates for multiple students
✅ **Live Preview** - Preview certificate template before generation
✅ **Custom Styling** - Easy to customize with CSS/inline styles
✅ **Image Support** - Background images, logos, signatures all supported
✅ **High Quality** - 2x scale capture for crisp PDF output
✅ **CORS Handling** - Supports images from same origin
✅ **Progress Tracking** - Toast notifications for user feedback
✅ **Automatic File Naming** - PDFs named with student names

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ⚠️ Limited support (file download may not work as expected)

## Performance Considerations

1. **Canvas Scale**: Set to 2x for high-quality output (can reduce if needed for performance)
2. **Render Delay**: 1000ms timeout ensures component fully renders before canvas capture
3. **Memory**: Each certificate generation creates temporary DOM elements (automatically cleaned up)
4. **Batch Processing**: Processes one certificate at a time to prevent memory overload

## Customization

### Modifying Certificate Template

Edit `src/Admin/Certificate/Templates/CertificateTemplate2HTML.jsx`:

```jsx
// Change dimensions
style={{ width: "297mm", height: "210mm" }}

// Modify colors
color: "#7AA4A5"

// Add/remove elements
<img src={yourImage} />

// Adjust spacing
marginBottom: "40px"
```

### Changing PDF Generation Settings

In `CertificateDetails.jsx`:

```jsx
// Change orientation
orientation: "landscape"; // or "portrait"

// Change scale for quality
scale: 2; // Higher = better quality but slower

// Change format
format: "a4"; // or "letter", "a5", etc.
```

## Known Limitations

1. **Internet Images**: External images may require CORS headers
2. **Fonts**: System fonts only (for custom fonts, embed as data URLs)
3. **Complex Layouts**: Very complex CSS might render differently in canvas
4. **Transparency**: PNG transparency works but may affect PDF rendering

## Migration from @react-pdf/renderer

If you need to migrate other PDF components:

### Before (@react-pdf/renderer)

```jsx
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";

<PDFDownloadLink document={<Document>...</Document>} fileName="file.pdf">
  {({ loading }) => (loading ? "Loading..." : "Download")}
</PDFDownloadLink>;
```

### After (html2canvas + jsPDF)

```jsx
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generatePDF = async () => {
  const element = document.getElementById("content");
  const canvas = await html2canvas(element);
  const pdf = new jsPDF();
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
  pdf.save("file.pdf");
};

<button onClick={generatePDF}>Download</button>;
```

## Troubleshooting

### PDFs are blurry

- Increase the `scale` parameter in html2canvas options
- Ensure images are high resolution

### Images not appearing in PDF

- Check image paths are correct
- Verify CORS headers if using external images
- Ensure images are loaded before html2canvas capture

### Certificate positioning looks wrong

- Check that container dimensions match A4 landscape (297mm × 210mm)
- Verify inline styles are correct
- Test in browser DevTools first

### PDF generation is slow

- Reduce `scale` parameter (default 2)
- Reduce render wait time (currently 1000ms)
- Generate one certificate at a time instead of batch

## Future Enhancements

- [ ] Multiple certificate templates
- [ ] Template builder UI
- [ ] Email distribution integration
- [ ] Batch email delivery
- [ ] Certificate verification system
- [ ] Digital signatures
- [ ] QR codes with certificate ID
- [ ] Certificate archives/history

## Package Versions

```json
{
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.1",
  "react": "^19.1.1",
  "react-dom": "^19.1.1"
}
```

---

**Last Updated**: February 10, 2026
**Status**: ✅ Production Ready
