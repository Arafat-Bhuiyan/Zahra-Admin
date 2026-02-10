# Certificate Generation - Quick Start Guide

## ✅ Setup Complete!

Your certificate generation system has been successfully converted to use **html2canvas** and **jsPDF**!

### What's New?

#### 🎯 Key Changes:

1. **Replaced** `@react-pdf/renderer` with native React + html2canvas + jsPDF
2. **Created** new HTML-based certificate template
3. **Updated** certificate details page with new PDF generation logic

### 📦 Installed Packages

```bash
html2canvas@^1.4.1
jspdf@^4.1.0
```

### 📁 New Files

```
src/
├── Admin/Certificate/Templates/
│   └── CertificateTemplate2HTML.jsx         # New HTML certificate template
├── hooks/
│   └── useCertificateDownload.js            # PDF generation utility hook
└── ...
```

### 🔄 Updated Files

```
src/Admin/Certificate/
├── CertificateDetails.jsx                   # Updated with html2canvas + jsPDF
└── Certificate.jsx                          # Parent component (no changes needed)
```

## 🚀 How to Use

### Generate a Single Certificate

1. Navigate to Certificate → Select Course
2. Select students from the list
3. Click "Generate Certificates"
4. PDFs are automatically downloaded

### Features

- ✅ Batch certificate generation (one click for multiple students)
- ✅ Live preview of certificate template
- ✅ Custom student names and course titles
- ✅ Professional landscape A4 format
- ✅ High-quality 2x scale rendering
- ✅ Automatic file naming (StudentName_Certificate.pdf)

## 📝 Certificate Template Customization

### Edit Template

File: `src/Admin/Certificate/Templates/CertificateTemplate2HTML.jsx`

```jsx
// Change colors
color: "#7AA4A5" → color: "#YOUR_COLOR"

// Modify text
SAKEENA INSTITUTE → YOUR_INSTITUTE_NAME

// Adjust layout
marginBottom: "40px" → marginBottom: "20px"

// Add/remove elements
<img src={award} /> → <YourElement />
```

### Update Signatories

In `CertificateDetails.jsx`:

```jsx
directorName="Dr. Abdul Rahman"  // Change this
instructorName={selectedCourse.instructor}  // Or use dynamic value
```

## 🎨 Preview Certificate

Before generating:

1. Click the 👁️ Eye icon next to certificate template selector
2. View the certificate with placeholder data
3. Adjust if needed

## 📊 File Structure

```
Zahra-Admin/
├── src/
│   ├── Admin/Certificate/
│   │   ├── Certificate.jsx                    # Main certificate page
│   │   ├── CertificateDetails.jsx             # Certificate generation UI
│   │   ├── GenerateCertificateModal.jsx       # Modal for generation options
│   │   └── Templates/
│   │       ├── CertificateTemplate1.jsx       # Deprecated react-pdf version
│   │       └── CertificateTemplate2HTML.jsx   # ✅ NEW HTML version
│   ├── hooks/
│   │   ├── use-mobile.jsx
│   │   └── useCertificateDownload.js          # ✅ NEW utility hook
│   └── ...
└── CERTIFICATE_MIGRATION.md                   # Full migration documentation
```

## 🔧 Configuration

### PDF Settings

In `src/Admin/Certificate/CertificateDetails.jsx`:

```jsx
// Quality
scale: 2; // Increase for better quality, decrease for faster generation

// Orientation
orientation: "landscape"; // or "portrait"

// Format
format: "a4"; // A4 size

// Render wait time
await new Promise((resolve) => setTimeout(resolve, 1000)); // Increase if rendering incomplete
```

### Image Settings

```jsx
// Watermark opacity
opacity: 0.15; // Adjust from 0-1

// Background image
src = { bgImage }; // Ensure correct import path

// Signatures
src = { instructor_signature };
src = { director_signature };
```

## 🐛 Troubleshooting

### Issue: PDF is blurry

**Solution**: Increase `scale` parameter

```jsx
const canvas = await html2canvas(element, {
  scale: 3, // Increased from 2
  // ...
});
```

### Issue: Images not showing in PDF

**Solution**: Ensure images are loaded and CORS is handled

```jsx
html2canvas(element, {
  useCORS: true, // Allow cross-origin images
  allowTaint: true, // Allow tainted canvas
  // ...
});
```

### Issue: Certificate positioning is wrong

**Solution**: Check dimensions match A4 landscape

```jsx
style={{
  width: "297mm",  // A4 width
  height: "210mm",  // A4 height (landscape)
  // ...
}}
```

### Issue: PDF generation is slow

**Solution**: Reduce quality or render time

```jsx
// Option 1: Reduce quality
scale: 1.5;

// Option 2: Reduce wait time
await new Promise((resolve) => setTimeout(resolve, 500));
```

## 📱 Browser Support

| Browser     | Support    |
| ----------- | ---------- |
| Chrome/Edge | ✅ Full    |
| Firefox     | ✅ Full    |
| Safari      | ✅ Full    |
| Mobile      | ⚠️ Limited |

## 🚨 Important Notes

1. **Temporary DOM Elements**: The code creates hidden elements during PDF generation but automatically cleans them up
2. **Render Timing**: The 1000ms wait ensures components fully render before screenshot
3. **File Download**: PDFs are downloaded to the user's default download folder
4. **CORS**: External images may require CORS headers to be included in PDFs

## 📚 Documentation

For detailed technical documentation, see: `CERTIFICATE_MIGRATION.md`

---

## Next Steps

1. ✅ Test certificate generation with sample students
2. ✅ Customize certificate template with your branding
3. ✅ Add email notification integration (optional)
4. ✅ Set up certificate archiving (optional)
5. ✅ Add digital signatures (optional)

## 💡 Tips

- **Batch Download**: Select multiple students to generate all certificates at once
- **Preview First**: Always preview the template before final generation
- **Student Names**: Ensure student names are spelled correctly in the system
- **Course Titles**: Keep course titles concise for better layout
- **Date Format**: Dates automatically format based on system locale

---

**Ready to generate certificates!** 🎓

Questions? Check `CERTIFICATE_MIGRATION.md` for detailed technical documentation.
