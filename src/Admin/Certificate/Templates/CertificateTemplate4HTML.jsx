import React from "react";
import bgImage from "../../../assets/certificates/certificate_template4.jpeg";
import logoImage from "../../../assets/img/logo.png";
import award from "../../../assets/certificates/award.png";
import director_signature from "../../../assets/certificates/director_signature.png";
import instructor_signature from "../../../assets/certificates/instructor_signature.png";

const CertificateTemplate4HTML = ({
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
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
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

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: "90px 120px", // top-bottom | left-right
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: "16px",
            marginTop: "10px",
            marginBottom: "30px",
            color: "#1F3D7A",
            letterSpacing: "1px",
          }}
        >
          CERTIFICATE OF COMPLETION
        </div>

        <h1
          style={{
            fontSize: "44px",
            fontWeight: "700",
            marginBottom: "35px",
            color: "#1F3D7A",
            textTransform: "uppercase",
          }}
        >
          SAKEENA INSTITUTE
        </h1>

        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
          <p style={{ fontSize: "18px", color: "#1F3D7A" }}>
            This certifies that
          </p>
        </div>

        <h2
          style={{
            fontSize: "46px",
            fontWeight: "700",
            margin: "20px auto",
            color: "#2F5597",
            borderBottom: "2px solid #C9A24D",
            paddingBottom: "8px",
            width: "520px",
          }}
        >
          {studentName || "Sample Student Name"}
        </h2>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginTop: "25px",
            marginBottom: "40px",
            color: "#333333",
            maxWidth: "700px",
          }}
        >
          has completed the program{" "}
          <strong>{courseTitle || "Course Title"}</strong> and has demonstrated
          proficiency and dedication to learning.
        </p>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            marginTop: "-20px",
            gap: "40px",
          }}
        >
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
              style={{ fontSize: "14px", fontWeight: "bold", color: "#333333" }}
            >
              {instructorName || "Instructor Name"}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#666666",
                textTransform: "uppercase",
              }}
            >
              Instructor
            </div>
          </div>

          <div>
            <img
              src={award}
              alt="award"
              style={{
                width: "70px",
                height: "70px",
                marginBottom: "10px",
              }}
            />
          </div>

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
              style={{ fontSize: "14px", fontWeight: "bold", color: "#333333" }}
            >
              {directorName || "Director Name"}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#666666",
                textTransform: "uppercase",
              }}
            >
              Director
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: "10px",
            fontSize: "12px",
            color: "#666666",
            marginTop: "30px",
          }}
        >
          Date Issued: {date || new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate4HTML;
