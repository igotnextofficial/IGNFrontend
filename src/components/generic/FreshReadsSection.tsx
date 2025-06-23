import React from "react";

const styles = {
  section: {
    backgroundColor: "#111111",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    width: "100%",
    paddingLeft: "0.5rem",
    color: "#ffffff"
  },
  container: {
    maxWidth: "72rem",
    margin: "0 1.5rem"
 
  },
  heading: {
    fontSize: "2.6rem",
    fontWeight: "bold",
    marginBottom: "0.75rem"
  },
  paragraph: {
    color: "#d1d5db",
 
  }
};

const FreshReadsSection = () => {
  return (
    <div style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          Fresh Reads to Fuel Your Journey
        </h2>
        <p style={styles.paragraph}>
          Insights, tips, and real stories from mentors and rising stars in music and entertainment.
        </p>
      </div>
    </div>
  );
};

export default FreshReadsSection;
