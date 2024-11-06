import React, { useState } from "react";
import ReportUserComponent from "./report-user";

export default function App() {
  // utility functions
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [searchBy, setSearchBy] = useState("phone");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noResultFound, setNoResultFound] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setResults(null);

    try {
      setNoResultFound(false);
      // Replace this URL with your actual API endpoint
      const response = await fetch(
        `http://localhost:5000/reports?type=${searchBy}&id=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults(data);
      if (data.results.length === 0) {
        setNoResultFound(true);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults({ error: "An error occurred while fetching results." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      "Cheating is never an option, it's a choice !!" Find if your partner is a
      cheater. <br /> <br />
      <div style={styles.inputGroup}>
        <label htmlFor="search-by" style={styles.label}>
          Search people by
        </label>
        <select
          id="search-by"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          style={styles.select}
        >
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="instagram">Instagram Username</option>
        </select>
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="search-query" style={styles.label}>
          Search Query
        </label>
        <input
          id="search-query"
          type="text"
          placeholder={`Enter ${searchBy}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleSearch} disabled={isLoading} style={styles.button}>
        {isLoading ? "Searching..." : "Search"}
      </button>
      {results && (
        <div style={styles.results}>
          <h2 style={styles.resultsTitle}>
            Results:{" "}
            {noResultFound ? "No Results Found, maybe a good one to date" : ""}
          </h2>
          {results.error ? (
            <p style={styles.error}>{results.error}</p>
          ) : (
            <div style={styles.cardContainer}>
              {results.results.map((item) => (
                <div key={item._id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{item.id}</h3>
                  <p style={styles.cardType}>Type: {item.type}</p>
                  <p style={styles.cardStory}>{item.story}</p>
                  <p style={styles.cardDate}>Date: {formatDate(item.date)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div>
        <br />
        <br />
        <ReportUserComponent />
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
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
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  results: {
    marginTop: "20px",
  },
  resultsTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  error: {
    color: "red",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  cardType: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "5px",
  },
  cardStory: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "#333",
  },
  cardDate: {
    fontSize: "12px",
    color: "#999",
  },
};
