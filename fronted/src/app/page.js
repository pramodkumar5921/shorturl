"use client";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [url, setURL] = useState("");       // 🔁 default empty string
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false); // optional UX flag

  const handleShortUrlClick = async () => {
    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8081/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();
      setOutput(data?.shortUrl || "No short URL returned.");
      setURL(""); // reset input
    } catch (error) {
      console.error("Error shortening URL:", error);
      setOutput("Failed to shorten URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["main-page"]}>
      <h1 style={{ padding: "16px", color: "#444444" }}>ShortURL</h1>
      <div className={styles["body"]}>
        <h1>Paste the URL to be shortened</h1>

        <div className={styles["input-box"]}>
          <div className={styles["input-url"]}>
            <input
              type="text"
              placeholder="Enter the link here"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              className={styles["input-text"]}
            />
          </div>

          <div className={styles["input-button"]}>
            <button onClick={handleShortUrlClick} disabled={loading}>
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>
        </div>

        {output && (
          <p>
            <strong>Shorter URL: </strong>
            <a href={output} target="_blank" rel="noopener noreferrer">
              {output}
            </a>
          </p>
        )}

        <p>ShortURL is a free tool to shorten URLs and generate short links</p>
        <p>URL shortener allows to create a shortened link making it easy to share</p>
      </div>
    </div>
  );
}
