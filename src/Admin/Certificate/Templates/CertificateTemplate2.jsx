import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import bgImage from "../../../assets/certificates/certificate_template1.jpg";
import logoImage from "../../../assets/img/logo.png";
import award from "../../../assets/certificates/award.png";
import director_signature from "../../../assets/certificates/director_signature.png";
import instructor_signature from "../../../assets/certificates/instructor_signature.png";

// Register fonts if needed (Optional: Industry standard uses custom fonts for premium look)
// Font.register({ family: 'Inter', src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' });

const styles = StyleSheet.create({
  page: {
    padding: 0,
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  background: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    marginTop: -180,
    marginLeft: -180,
    opacity: 1,
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 360,
    height: 360,
    marginTop: -180,
    marginLeft: -180,
    opacity: 0.25, // ওয়াটারমার্ক এখন একদম ক্লিয়ারলি বুঝা যাবে
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 60,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a1a1a",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: "#666666",
  },
  studentName: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#7AA4A5",
    borderBottomWidth: 2,
    borderBottomColor: "#7AA4A5",
    paddingBottom: 10,
    minWidth: 300,
  },
  description: {
    fontSize: 16,
    lineHeight: 1.5,
    marginVertical: 30,
    color: "#444444",
    maxWidth: "80%",
  },
  courseTitle: {
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  footer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginTop: 50,
  },
  signatureBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 200,
  },
  signatureLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#999",
    marginTop: 5,
    marginBottom: 10,
  },
  signatureName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  signatureTitle: {
    fontSize: 10,
    color: "#777",
    textTransform: "uppercase",
  },
  dateBlock: {
    paddingTop: 10,
    fontSize: 12,
    color: "#888",
  },
  signatureImage: {
    width: 320,
    height: 80,
    marginBottom: -20,
    objectFit: "contain",
  },
  awardImage: {
    width: 80,
    height: 80,
    objectFit: "contain",
  },
});

const CertificateTemplate2 = ({
  studentName,
  courseTitle,
  date,
  instructorName,
  directorName,
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Background Image */}
      <Image src={bgImage} style={styles.background} />

      {/* Semi-transparent Watermark Logo */}
      <Image src={logoImage} style={styles.watermark} />

      <View style={styles.content}>
        <Text style={styles.subtitle}>CERTIFICATE OF COMPLETION</Text>
        <Text style={styles.title}>SAKEENA INSTITUTE</Text>

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Text style={styles.subtitle}>This is to certify that</Text>
        </View>

        <Text style={styles.studentName}>{studentName || "Student Name"}</Text>

        <Text style={styles.description}>
          has successfully completed the course{" "}
          <Text style={styles.courseTitle}>
            {courseTitle || "Course Title"}
          </Text>{" "}
          with outstanding performance and dedication.
        </Text>

        <View style={styles.footer}>
          <View style={styles.signatureBlock}>
            <Image src={instructor_signature} style={styles.signatureImage} />
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>
              {instructorName || "Instructor Name"}
            </Text>
            <Text style={styles.signatureTitle}>Instructor</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Image src={award} style={styles.awardImage} />
          </View>

          <View style={styles.signatureBlock}>
            <Image src={director_signature} style={styles.signatureImage} />
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>
              {directorName || "Director Name"}
            </Text>
            <Text style={styles.signatureTitle}>Director</Text>
          </View>
        </View>

        <View style={styles.dateBlock}>
          <Text>Date Issued: {date || new Date().toLocaleDateString()}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default CertificateTemplate2;
