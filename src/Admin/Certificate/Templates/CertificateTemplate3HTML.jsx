import React from "react";
import bgImage from "../../../assets/certificates/certificate_template3.jpg";
import logoImage from "../../../assets/img/logo.png";
import award from "../../../assets/certificates/tealAward.png";
import director_signature from "../../../assets/certificates/director_signature.png";
import instructor_signature from "../../../assets/certificates/instructor_signature.png";

const CertificateTemplate3HTML = ({
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
        <div>
          <img
            src={logoImage}
            alt="logo"
            style={{
              width: "80px",
              height: "80px",
              marginBottom: "-40px",
              objectFit: "contain",
            }}
          />
        </div>

        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "600",
              color: "#2F5233",
              fontFamily: "'Times New Roman', serif",
              letterSpacing: "1px",
            }}
          >
            Certificate of Achivement{" "}
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#2B2B2B",
              fontStyle: "italic",
              fontFamily: "'Georgia', serif",
            }}
          >
            This certificate is proudly presented to
          </p>
        </div>

        <h2
          style={{
            fontSize: "52px",
            fontWeight: "500",
            color: "#1F3D2B",
            fontFamily: "'Playfair Display', 'Georgia', serif",
            borderBottom: "2px solid #2F5233",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          {studentName || "Name Surname"}
        </h2>

        <p
          style={{
            fontSize: "16px",
            color: "#2B2B2B",
            fontFamily: "'Times New Roman', serif",
            lineHeight: "1.6",
            maxWidth: "75%",
          }}
        >
          has successfully completed the course
          <strong style={{ color: "#1F3D2B" }}>
            {" "}
            {courseTitle || "Course Title"}
          </strong>
          , demonstrating competence and dedication throughout the program.
        </p>

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
              style={{
                fontSize: "14px",
                fontFamily: "'Times New Roman', serif",
                color: "#2B2B2B",
                fontWeight: "bold",
              }}
            >
              {instructorName || "Instructor Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#666666",
                letterSpacing: "1px",
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
                width: "130px",
                height: "130px",
                objectFit: "contain",
                marginBottom: "-20px",
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
              style={{
                fontSize: "14px",
                fontFamily: "'Times New Roman', serif",
                color: "#2B2B2B",
                fontWeight: "bold",
              }}
            >
              {directorName || "Director Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#666666",
                letterSpacing: "1px",
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

export default CertificateTemplate3HTML;
