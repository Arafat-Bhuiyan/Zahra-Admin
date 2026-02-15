import React from "react";
import bgImage from "../../../assets/certificates/certificate_template6.png";
import logoImage from "../../../assets/img/logo.png";
import award from "../../../assets/certificates/award.png";
import director_signature from "../../../assets/certificates/director_signature.png";
import instructor_signature from "../../../assets/certificates/instructor_signature.png";

const CertificateTemplate6HTML = ({
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
        fontFamily: "'Times New Roman', serif",
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
          padding: "70px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        {/* <div
          style={{
            fontSize: "16px",
            marginBottom: "35px",
            color: "#1A3A5A",
            fontWeight: "bold",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginTop: "10px",
          }}
        >
          Certificate of Accomplishment
        </div> */}

        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginTop: "60px",
            color: "#1A3A5A",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          SAKEENA INSTITUTE
        </h1>

        <div style={{ marginTop: "15px", marginBottom: "10px" }}>
          <p
            style={{
              fontSize: "20px",
              color: "#5A6A82",
              fontStyle: "italic",
              fontFamily: "Arial, sans-serif",
            }}
          >
            This certificate formally recognizes the successful completion of
            the course by
          </p>
        </div>

        <h2
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#1A3A5A",
            borderBottom: "2px solid #1A3A5A",
            paddingBottom: "10px",
            minWidth: "450px",
          }}
        >
          {studentName || "Student Name"}
        </h2>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.6",
            marginTop: "30px",
            marginBottom: "30px",
            color: "#4A5568",
            maxWidth: "75%",
            fontFamily: "Arial, sans-serif",
          }}
        >
          has successfully completed the requirements for the course{" "}
          <strong style={{ color: "#1A3A5A", fontSize: "20px" }}>
            {courseTitle || "Course Title"}
          </strong>{" "}
          with excellence and is hereby awarded this certificate.
        </p>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingInline: "50px",
            paddingBottom: "90px",
          }}
        >
          {/* Instructor Column */}
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
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                color: "#1A3A5A",
              }}
            >
              {instructorName || "Instructor Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#5A6A82",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: "600",
              }}
            >
              Lead Instructor
            </div>
          </div>

          {/* Date Column - Positioned to look like a seal entry */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "5px",
              minWidth: "150px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#1A3A5A",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                fontWeight: "600",
              }}
            >
              Date Issued
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#1A3A5A",
                fontWeight: "bold",
                marginTop: "2px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {date || new Date().toLocaleDateString()}
            </div>
          </div>

          {/* Director Column */}
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
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                color: "#1A3A5A",
              }}
            >
              {directorName || "Director Name"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#5A6A82",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: "600",
              }}
            >
              Executive Director
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate6HTML;
