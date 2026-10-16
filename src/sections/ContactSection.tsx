
import { useState, type FormEvent } from "react";
import styles from "./ContactSection.module.css";

const CONTACT_EMAIL = "blairjurgenchacon19@gmail.com";
const PHONE = "639766714481";

// Get your key from https://web3forms.com
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (status === "sending") return;

        if (!ACCESS_KEY) {
            setErrorMessage("The contact form is not configured yet.");
            setStatus("error");
            return;
        }

        setStatus("sending");
        setErrorMessage("");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    subject: "New Portfolio Inquiry — BLAIR",
                    from_name: "BLAIR Portfolio",
                    name: name.trim(),
                    email: email.trim(),
                    message: note.trim(),
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Unable to send message.");
            }

            setStatus("success");
            setName("");
            setEmail("");
            setNote("");
        } catch {
            setErrorMessage(
                "Your message could not be sent. Please try again or email me directly."
            );
            setStatus("error");
        }
    }

    return (
        <footer id="contact" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.topline}>
                    <span>04 / CONTACT</span>
                    <span>AVAILABLE FOR COLLABORATIONS ↗</span>
                </div>

                <div className={styles.intro}>
                    <div>
                        <p className={styles.eyebrow}>HAVE SOMETHING IN MIND?</p>

                        <h2>
                            LET&apos;S MAKE
                            <br />
                            <span>IT REAL.</span>
                        </h2>
                    </div>

                    <p className={styles.description}>
                        Have a project, an opportunity, or just an idea?
                        I&apos;d love to hear about it.
                    </p>
                </div>

                <div className={styles.contactGrid}>
                    <div className={styles.details}>
                        <p className={styles.columnLabel}>01 / GET IN TOUCH</p>

                        <div className={styles.contactItem}>
                            <span className={styles.itemLabel}>EMAIL ADDRESS</span>
                            <a href={`mailto:${CONTACT_EMAIL}`}>
                                {CONTACT_EMAIL}
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>

                        <div className={styles.contactItem}>
                            <span className={styles.itemLabel}>PHONE NUMBER</span>
                            <a href={`tel:+${PHONE}`}>
                                0976 671 4481
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>

                        <div className={styles.contactItem}>
                            <span className={styles.itemLabel}>OTHER WAYS TO CONNECT</span>

                            <div className={styles.socialLinks}>
                                <a
                                    href={`https://wa.me/${PHONE}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    WHATSAPP ↗
                                </a>

                                <a href={`viber://chat?number=%2B${PHONE}`}>
                                    VIBER ↗
                                </a>
                            </div>
                        </div>

                        <p className={styles.availability}>
                            <span className={styles.statusDot} />
                            OPEN TO NEW OPPORTUNITIES
                        </p>
                    </div>

                    <div className={styles.formArea}>
                        <p className={styles.columnLabel}>02 / DROP ME A MESSAGE</p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.field}>
                                <label htmlFor="contact-name">YOUR NAME</label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    placeholder="What should I call you?"
                                    autoComplete="name"
                                    maxLength={100}
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="contact-email">YOUR EMAIL</label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    maxLength={254}
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="contact-note">YOUR NOTE</label>
                                <textarea
                                    id="contact-note"
                                    name="message"
                                    placeholder="Tell me a little about your project..."
                                    rows={3}
                                    maxLength={5000}
                                    value={note}
                                    onChange={(event) => setNote(event.target.value)}
                                    required
                                />
                            </div>

                            <button
                                className={styles.submitButton}
                                type="submit"
                                disabled={status === "sending"}
                            >
                <span>
                  {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
                </span>
                                <span aria-hidden="true">↗</span>
                            </button>

                            <div className={styles.feedback} aria-live="polite">
                                {status === "success" && (
                                    <p className={styles.success}>
                                        Message submitted successfully. Thanks for reaching out!
                                    </p>
                                )}

                                {status === "error" && (
                                    <p className={styles.error} role="alert">
                                        {errorMessage}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <span>© {new Date().getFullYear()} BLAIR</span>
                    <span>DESIGNED & BUILT WITH INTENTION.</span>
                    <a href="#home">BACK TO TOP ↑</a>
                </div>
            </div>
        </footer>
    );
}
