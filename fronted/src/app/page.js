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
      const response = await fetch("https://shorturl-iquj.vercel.app/api/shorten", {
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
              alt="Device Icon"
              width={75}
              height={75}
            />
          </div>
          <h3 className={styles["align-center"]}>Device</h3>
          <p className={styles["align-center"]}>Compatible with smartphones, tablets and desktop</p>
        </div>
      </div>

     <div className={styles["footer"]}>
  <div className={styles.footerText}>
    © 2025 <strong>ShortUrl Shorten</strong> — Tool to shorten a long link, created by <strong>Pramod Kumar</strong>
  </div>
  <ul className={styles["profiles"]}>
    <li>
      <a href="https://github.com/pramodkumar5921" target="_blank" rel="noopener noreferrer">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub"
          width="24"
          height="24"
        />
        <span>GitHub</span>
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/pramod-kumar-1b8470258/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="LinkedIn"
          width="24"
          height="24"
        />
        <span>LinkedIn</span>
      </a>
    </li>
    <li>
      <a href="https://leetcode.com/u/pramodkumar808751528270/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
          alt="LeetCode"
          width="24"
          height="24"
        />
        <span>LeetCode</span>
      </a>
    </li>
  </ul>
</div>



    </div>
  );
}
