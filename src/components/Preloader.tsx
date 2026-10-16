
import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

const SESSION_KEY = "blair-intro-played";

function shouldShowIntro() {
    if (typeof window === "undefined") return false;

    try {
        return (
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
            sessionStorage.getItem(SESSION_KEY) !== "true"
        );
    } catch {
        return false;
    }
}

export default function Preloader() {
    const [visible, setVisible] = useState(shouldShowIntro);

    useEffect(() => {
        if (!visible) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const timer = window.setTimeout(() => {
            setVisible(false);

            try {
                sessionStorage.setItem(SESSION_KEY, "true");
            } catch {
                // Session storage may be unavailable in some browsers.
            }
        }, 3800);

        return () => {
            window.clearTimeout(timer);
            document.body.style.overflow = previousOverflow;
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <div className={styles.preloader} aria-label="Loading portfolio">
            <div className={styles.center}>
                <div className={styles.word} aria-hidden="true">
                    {"BLAIR".split("").map((letter, index) => (
                        <span
                            key={index}
                            className={styles.letter}
                            style={{ animationDelay: `${index * 0.12}s` }}
                        >
              {letter}
            </span>
                    ))}

                    <span
                        className={`${styles.letter} ${styles.period}`}
                        style={{ animationDelay: "0.6s" }}
                    >
            .
          </span>
                </div>

                <div className={styles.progressTrack}>
                    <div className={styles.progressFill} />
                </div>

                <p className={styles.caption}>LOADING EXPERIENCE</p>
            </div>

            <div className={styles.footer}>
                <span>BLAIR © {new Date().getFullYear()}</span>
                <span>FULL-STACK DEVELOPER</span>
            </div>
        </div>
    );
}
