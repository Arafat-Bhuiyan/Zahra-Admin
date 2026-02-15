import React from "react";
import bgImage from "../../../assets/certificates/certificate_template12.jpg";
import logoImage from "../../../assets/img/logo.png";
import award from "../../../assets/certificates/award.png";
import director_signature from "../../../assets/certificates/director_signature.png";
import instructor_signature from "../../../assets/certificates/instructor_signature.png";

const CertificateTemplate12HTML = ({
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
            fontSize: "14px",
            color: "#A67C00",
            fontWeight: "700",
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          Certificate of Achivement
        </div>

        <h1
          style={{
            fontSize: "50px",
            fontWeight: "800",
            color: "#1A1A1A",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Sakeena Institute
        </h1>

        <div style={{ marginTop: "15px", marginBottom: "15px" }}>
          <p
            style={{
              fontSize: "18px",
              color: "#777777",
              fontWeight: "500",
              fontStyle: "italic",
            }}
          >
            This certificate is proudly presented to
          </p>
        </div>

        <h2
          style={{
            fontSize: "58px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#A67C00",
            borderBottom: "1px solid #A67C00",
            paddingBottom: "12px",
            minWidth: "500px",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {studentName || "Student Name"}
        </h2>

        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.9",
            marginTop: "20px",
            marginBottom: "45px",
            color: "#555555",
            maxWidth: "70%",
          }}
        >
          for successfully completing the course{" "}
          <strong style={{ color: "#1A1A1A", fontSize: "18px" }}>
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
            gap: "35px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "250px",
            }}
          >
            <img
              src={instructor_signature}
              alt="instructor signature"
              style={{
                width: "280px",
                height: "85px",
                marginBottom: "-25px",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#1A1A1A",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#1A1A1A" }}
            >
              {instructorName || "Instructor Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#777777",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: "700",
              }}
            >
              Lead Instructor
            </div>
          </div>

          <div style={{ marginBottom: "35px" }}>
            <img
              src={award}
              alt="award"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "250px",
            }}
          >
            <img
              src={director_signature}
              alt="director signature"
              style={{
                width: "280px",
                height: "85px",
                marginBottom: "-25px",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#1A1A1A",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#1A1A1A" }}
            >
              {directorName || "Director Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#777777",
                textTransform: "uppercase",
                letterSpacing: "2px",
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
            color: "#888888",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            width: "30%",
            paddingTop: "15px",
          }}
        >
          Date Issued: {date || new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate12HTML;
