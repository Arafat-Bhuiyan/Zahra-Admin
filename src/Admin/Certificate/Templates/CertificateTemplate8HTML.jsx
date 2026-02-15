import React from "react";
import bgImage from "../../../assets/certificates/certificate_template8.png";
import logoImage from "../../../assets/img/logo.png";
import award from "../../../assets/certificates/tealAward.png";
import director_signature from "../../../assets/certificates/director_signature.png";
import instructor_signature from "../../../assets/certificates/instructor_signature.png";

const CertificateTemplate8HTML = ({
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
          opacity: 0.1,
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
          style={{
            fontSize: "18px",
            marginBottom: "40px",
            color: "#C5A021",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          CERTIFICATE OF RECOGNITION
        </div>

        <h1
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#114246",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          SAKEENA INSTITUTE
        </h1>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p
            style={{
              fontSize: "18px",
              color: "#3A6E73",
              fontWeight: "500",
              fontStyle: "italic",
            }}
          >
            Awarded to
          </p>
        </div>

        <h2
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#C5A021",
            borderBottom: "2px solid #C5A021",
            paddingBottom: "10px",
            minWidth: "400px",
          }}
        >
          {studentName || "Student Name"}
        </h2>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginTop: "30px",
            marginBottom: "30px",
            color: "#114246",
            maxWidth: "80%",
          }}
        >
          for successfully completing the course{" "}
          <strong style={{ color: "#C5A021" }}>
            {courseTitle || "Course Title"}
          </strong>{" "}
          and achieving excellence in all assessments.
        </p>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            marginTop: "40px",
            gap: "40px",
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
                backgroundColor: "#3A6E73",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#114246" }}
            >
              {instructorName || "Instructor Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#3A6E73",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "600",
              }}
            >
              Instructor
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <img
              src={award}
              alt="award"
              style={{
                width: "90px",
                height: "90px",
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
                backgroundColor: "#3A6E73",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#114246" }}
            >
              {directorName || "Director Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#3A6E73",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "600",
              }}
            >
              Director
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: "20px",
            fontSize: "13px",
            color: "#3A6E73",
            width: "50%",
          }}
        >
          Date Issued: {date || new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate8HTML;
