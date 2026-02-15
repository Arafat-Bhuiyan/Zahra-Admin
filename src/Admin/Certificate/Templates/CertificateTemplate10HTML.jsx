import React from "react";
import bgImage from "../../../assets/certificates/certificate_template10.jpg";
import logoImage from "../../../assets/img/logo.png";
import award from "../../../assets/certificates/blueAward.png";
import director_signature from "../../../assets/certificates/director_signature.png";
import instructor_signature from "../../../assets/certificates/instructor_signature.png";

const CertificateTemplate10HTML = ({
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
        fontFamily: "'Playfair Display', serif, Arial",
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
          top: "48%",
          left: "50%",
          width: "320px",
          height: "320px",
          transform: "translate(-50%, -50%)",
          opacity: 0.08,
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
          padding: "85px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: "15px",
            color: "#B4975A",
            fontWeight: "700",
            letterSpacing: "5px",
            textTransform: "uppercase",
            marginBottom: "35px",
          }}
        >
          Certificate of Completion
        </div>

        <h1
          style={{
            fontSize: "48px",
            fontWeight: "800",
            color: "#0D2137",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "5px",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Sakeena Institute
        </h1>

        <div style={{ marginTop: "15px", marginBottom: "15px" }}>
          <p
            style={{
              fontSize: "18px",
              color: "#64748B",
              fontWeight: "500",
              fontStyle: "italic",
            }}
          >
            This is to certify that
          </p>
        </div>

        <h2
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#B4975A",
            borderBottom: "1.5px solid #B4975A",
            paddingBottom: "12px",
            minWidth: "480px",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {studentName || "Student Name"}
        </h2>

        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.8",
            marginTop: "20px",
            marginBottom: "40px",
            color: "#4A5568",
            maxWidth: "70%",
          }}
        >
          for successfully completing the course{" "}
          <strong style={{ color: "#0D2137", fontSize: "18px" }}>
            {courseTitle || "Course Title"}
          </strong>{" "}
          and demonstrating exceptional commitment and academic excellence.
        </p>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            gap: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "240px",
            }}
          >
            <img
              src={instructor_signature}
              alt="instructor signature"
              style={{
                width: "280px",
                height: "80px",
                marginBottom: "-20px",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#0D2137",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#0D2137" }}
            >
              {instructorName || "Instructor Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                fontWeight: "700",
              }}
            >
              Lead Instructor
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <img
              src={award}
              alt="award"
              style={{
                width: "75px",
                height: "75px",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "240px",
            }}
          >
            <img
              src={director_signature}
              alt="director signature"
              style={{
                width: "280px",
                height: "80px",
                marginBottom: "-20px",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#0D2137",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#0D2137" }}
            >
              {directorName || "Director Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                fontWeight: "700",
              }}
            >
              Executive Director
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "14px",
            color: "#64748B",
            borderTop: "1px solid rgba(13, 33, 55, 0.1)",
            width: "35%",
            marginTop: "40px",
            paddingTop: "15px",
          }}
        >
          Date Issued: {date || new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate10HTML;
