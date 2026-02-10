import React from "react";
import bgImage from "../../../assets/certificates/certificate_template1.jpg";
import logoImage from "../../../assets/img/logo.png";
import award from "../../../assets/certificates/award.png";
import director_signature from "../../../assets/certificates/director_signature.png";
import instructor_signature from "../../../assets/certificates/instructor_signature.png";

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
        height: "210mm", // A4 landscape
        padding: 0,
        position: "relative",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Background Image */}
      <img
        src={bgImage}
        alt="background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Watermark Logo */}
      <img
        src={logoImage}
        alt="watermark"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "360px",
          height: "360px",
          transform: "translate(-50%, -50%)",
          opacity: 0.15,
          objectFit: "contain",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{ fontSize: "18px", marginBottom: "40px", color: "#666666" }}
        >
          CERTIFICATE OF COMPLETION
        </div>

        <h1
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#1a1a1a",
            textTransform: "uppercase",
          }}
        >
          SAKEENA INSTITUTE
        </h1>

        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
          <p style={{ fontSize: "18px", color: "#666666" }}>
            This is to certify that
          </p>
        </div>

        <h2
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#7AA4A5",
            borderBottom: "2px solid #7AA4A5",
            paddingBottom: "10px",
            minWidth: "300px",
          }}
        >
          {studentName || "Student Name"}
        </h2>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.5",
            marginTop: "30px",
            marginBottom: "30px",
            color: "#444444",
            maxWidth: "80%",
          }}
        >
          has successfully completed the course{" "}
          <strong>{courseTitle || "Course Title"}</strong> with outstanding
          performance and dedication.
        </p>

        {/* Footer with signatures */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            marginTop: "50px",
            gap: "40px",
          }}
        >
          {/* Instructor Signature */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "200px",
            }}
          >
            <img
              src={instructor_signature}
              alt="instructor signature"
              style={{
                width: "320px",
                height: "80px",
                marginBottom: "-20px",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#999",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
            >
              {instructorName || "Instructor Name"}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#777",
                textTransform: "uppercase",
              }}
            >
              Instructor
            </div>
          </div>

          {/* Award Image */}
          <div>
            <img
              src={award}
              alt="award"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Director Signature */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "200px",
            }}
          >
            <img
              src={director_signature}
              alt="director signature"
              style={{
                width: "320px",
                height: "80px",
                marginBottom: "-20px",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#999",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
            >
              {directorName || "Director Name"}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#777",
                textTransform: "uppercase",
              }}
            >
              Director
            </div>
          </div>
        </div>

        {/* Date */}
        <div
          style={{
            paddingTop: "10px",
            fontSize: "12px",
            color: "#888",
            marginTop: "30px",
          }}
        >
          Date Issued: {date || new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate2HTML;
