"use client";

import React, { useState } from "react";

export default function ReportUserComponent() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reportBy, setReportBy] = useState("phone");
  const [reportValue, setReportValue] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setReportValue("");
    setReportReason("");
    setSubmitResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("https://cheaters-db.onrender.com/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: reportBy,
          id: reportValue,
          story: reportReason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      const result = await response.json();
      setSubmitResult({
        success: true,
        message: "Report submitted successfully",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      setSubmitResult({
        success: false,
        message: "Failed to submit report. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={openPopup} style={styles.button}>
        Report a Cheater/Breakup
      </button>

      {isPopupOpen && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2 style={styles.popupTitle}>Report a Cheater/Breakup</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="report-by" style={styles.label}>
                  Report by:
                </label>
                <select
                  id="report-by"
                  value={reportBy}
                  onChange={(e) => setReportBy(e.target.value)}
                  style={styles.select}
                >
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="instagram">Instagram Username</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="report-value" style={styles.label}>
                  {reportBy.charAt(0).toUpperCase() + reportBy.slice(1)}:
                </label>
                <input
                  id="report-value"
                  type="text"
                  value={reportValue}
                  onChange={(e) => setReportValue(e.target.value)}
                  placeholder={`Enter user's ${reportBy}`}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="report-reason" style={styles.label}>
                  How they cheated you / your breakup story
                </label>
                <textarea
                  id="report-reason"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Write your story here"
                  required
                  style={styles.textarea}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={styles.submitButton}
              >
                {isSubmitting ? "Submitting..." : "Report User"}
              </button>
            </form>

            {submitResult && (
              <p
                style={
                  submitResult.success
                    ? styles.successMessage
                    : styles.errorMessage
                }
              >
                {submitResult.message}
              </p>
            )}

            <button onClick={closePopup} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "400px",
    width: "100%",
  },
  popupTitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minHeight: "100px",
    boxSizing: "border-box",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  closeButton: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  successMessage: {
    color: "green",
    marginBottom: "10px",
  },
  errorMessage: {
    color: "red",
    marginBottom: "10px",
  },
};
