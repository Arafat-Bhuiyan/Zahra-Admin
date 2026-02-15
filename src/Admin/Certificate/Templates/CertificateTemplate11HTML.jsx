import React from "react";
import bgImage from "../../../assets/certificates/certificate_template10.jpg";
import logoImage from "../../../assets/img/logo.png";
import award from "../../../assets/certificates/blueAward.png";
import director_signature from "../../../assets/certificates/director_signature.png";
import instructor_signature from "../../../assets/certificates/instructor_signature.png";

const CertificateTemplate11HTML = ({
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
            fontSize: "16px",
            color: "#C5A021",
            fontWeight: "700",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "30px",
          }}
        >
          CERTIFICATE OF COMPLETION
        </div>

        <h1
          style={{
            fontSize: "46px",
            fontWeight: "bold",
            color: "#1A3A5A",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Sakeena Institute
        </h1>

        <div style={{ marginTop: "15px", marginBottom: "10px" }}>
          <p
            style={{
              fontSize: "19px",
              color: "#5A6A82",
              fontWeight: "500",
              fontStyle: "italic",
            }}
          >
            This is to certify that
          </p>
        </div>

        <h2
          style={{
            fontSize: "54px",
            fontWeight: "bold",
            marginBottom: "15px",
            color: "#C5A021",
            borderBottom: "2px solid #C5A021",
            paddingBottom: "10px",
            minWidth: "460px",
            fontFamily: "serif",
          }}
        >
          {studentName || "Student Name"}
        </h2>

        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.7",
            marginTop: "25px",
            marginBottom: "35px",
            color: "#4A5568",
            maxWidth: "75%",
          }}
        >
          for successfully completing the course{" "}
          <strong style={{ color: "#1A3A5A", fontSize: "19px" }}>
            {courseTitle || "Course Title"}
          </strong>{" "}
          and demonstrating exceptional commitment to learning.
        </p>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            gap: "20px",
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
                width: "300px",
                height: "75px",
                marginBottom: "-15px",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#1A3A5A",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#1A3A5A" }}
            >
              {instructorName || "Instructor Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#5A6A82",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "600",
              }}
            >
              Instructor
            </div>
          </div>

          <div style={{ marginBottom: "25px" }}>
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
              width: "240px",
            }}
          >
            <img
              src={director_signature}
              alt="director signature"
              style={{
                width: "300px",
                height: "75px",
                marginBottom: "-15px",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#1A3A5A",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#1A3A5A" }}
            >
              {directorName || "Director Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#5A6A82",
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
            fontSize: "14px",
            color: "#5A6A82",
            borderTop: "1px solid rgba(26, 58, 90, 0.1)",
            width: "40%",
            marginTop: "30px",
          }}
        >
          Date Issued: {date || new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate11HTML;
