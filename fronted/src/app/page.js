"use client";
import styles from "./page.module.css";
import { useState } from "react";
import Image from 'next/image';

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
      <div className={styles["site-info"]}>
        <div>
          <div className={styles["icon"]}>
            <Image
              src="https://www.shorturl.at/img/icon-like.png"
              alt="Like Icon"
              width={75}
              height={75}
              // style={{width:"100%",height:"auto"}}
            />
          </div>
          <h3 className={styles["align-center"]}>Easy</h3>
          <p className={styles["align-center"]}>ShortURL is easy and fast, enter the long link to get your shortened link</p>
        </div>
        <div>
          <div className={styles["icon"]}>
            <Image
              src="https://www.shorturl.at/img/icon-url.png"
              alt="Shorten Icon"
              width={75}
              height={75}
            />
          </div>
          <h3 className={styles["align-center"]}>Shortened</h3>
          <p className={styles["align-center"]}>Use any link, no matter what size, ShortURL always shortens</p>
        </div>
        <div>
          <div className={styles["icon"]}>
            <Image
              src="https://www.shorturl.at/img/icon-secure.png"
              alt="Secure Icon"
              width={75}
              height={75}
            />
          </div>
          <h3 className={styles["align-center"]}>Secure</h3>
          <p className={styles["align-center"]}>It is fast and secure, our service has HTTPS protocol and data encryption</p>
        </div>
        <div>
          <div className={styles["icon"]}>
            <Image
              src="https://www.shorturl.at/img/icon-statistics.png"
              alt="statistics Icon"
              width={75}
              height={75}
            />
          </div>
          <h3 className={styles["align-center"]}>Statistics</h3>
          <p className={styles["align-center"]}>Check the number of clicks that your shortened URL received</p>
        </div>
        <div>
          <div className={styles["icon"]}>
            <Image
              src="https://www.shorturl.at/img/icon-unique.png"
              alt="Reliable Icon"
              width={75}
              height={75}
            />
          </div>
          <h3 className={styles["align-center"]}>Reliable</h3>
          <p className={styles["align-center"]}>All links that try to disseminate spam, viruses and malware are deleted</p>
        </div>
        <div>
          <div className={styles["icon"]}>
            <Image
              src="https://www.shorturl.at/img/icon-responsive.png"
              alt="Responsive Icon"
              width={75}
              height={75}
            />
          </div>
          <h3 className={styles["align-center"]}>Responsive</h3>
          <p className={styles["align-center"]}>Compatible with smartphones, tablets and desktop</p>
        </div>
      </div>
    </div>
  );
}
