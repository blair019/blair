import { useState } from "react";
import styles from "./SelectedWorkSection.module.css";

type Company = { name: string; role: string; years: string; headline: string; description: string; tags: string[] };
type Project = { title: string; category: string; symbol: string; description: string; contribution: string; tags: string[]; featured?: boolean };

const companies: Company[] = [
    { name: "Questronix Corporation", role: "Software Engineer", years: "2021 — 2025", headline: "Enterprise applications, built to work better.", description: "Developed and maintained enterprise interfaces and backend features, including work on Cocolife's web administration experience. Improved responsive UI, API integration, data retrieval, and application stability.", tags: ["React", "Next.js", "Django REST", "Axios / SWR"] },
    { name: "The Veelo Group", role: "Software Engineer", years: "2022 — 2026", headline: "Creative tooling with serious engineering.", description: "Developed full-stack applications and a video animation platform with real-time canvas rendering, customizable templates, multi-scene timelines, and FFmpeg-based exports.", tags: ["Next.js", "React", "MongoDB", "FFmpeg"] },
    { name: "ASW Global", role: "Platform Engineer", years: "2025 — 2026", headline: "Making complex workflows feel simple.", description: "Engineered enterprise automation on Servicely, including service catalogs, business rules, REST integrations, AI-assisted workflows, and operational dashboards.", tags: ["Servicely", "REST APIs", "Automation", "AI Workflows"] },
    { name: "Brandefy & Marton Varo", role: "Freelance Software Engineer", years: "2023 — 2025", headline: "Digital experiences that perform.", description: "Built and customized responsive WordPress and WooCommerce experiences, including reusable content, checkout flows, performance improvements, and SEO readiness.", tags: ["WordPress", "WooCommerce", "Elementor", "Performance"] },
    { name: "Independent Consultant", role: "Software Engineer", years: "2021 — 2024", headline: "Real problems. Purpose-built software.", description: "Delivered platforms for clients across healthcare, media, hospitality, retail, logistics, and education, from online ordering and scheduling to inventory and delivery management.", tags: ["Full-stack", "Payments", "CMS", "Business Platforms"] },
];

const projects: Project[] = [
    { title: "Cocolife", category: "ENTERPRISE WEB APPLICATION", symbol: "CO", featured: true, description: "Enterprise web administration and modernized interfaces.", contribution: "Worked on Cocolife web admin interfaces through Questronix. Developed responsive React pages, integrated API-driven data, modernized older views, and fixed application issues.", tags: ["React", "Axios", "SWR", "REST APIs"] },
    { title: "Servicely Platform", category: "ENTERPRISE AUTOMATION", symbol: "SV", featured: true, description: "Business workflows, service management, and AI-assisted automation.", contribution: "Configured and engineered enterprise workflows, service catalogs, integrations, business rules, AI-powered ticket handling, and dashboards while at ASW Global.", tags: ["Servicely", "REST APIs", "Workflows", "AI"] },
    { title: "Brandefy", category: "WEB EXPERIENCE & COMMERCE", symbol: "BR", featured: true, description: "Responsive business websites, commerce, and performance.", contribution: "Developed and customized WordPress and WooCommerce experiences with Elementor, reusable shortcodes, responsive layouts, and performance and SEO improvements.", tags: ["WordPress", "WooCommerce", "Elementor", "PHP"] },
    { title: "NPK Soil Monitoring", category: "MOBILE / AGRITECH", symbol: "NPK", featured: true, description: "Mobile application for soil NPK monitoring and notifications.", contribution: "Built a mobile application focused on monitoring soil nitrogen, phosphorus, and potassium (NPK) information and notifications. Sensor connectivity, implementation stack, and notification triggers can be documented once confirmed.", tags: ["Mobile App", "Soil Monitoring", "Notifications"] },
    { title: "Veterinary Blood Supply", category: "HEALTHCARE PLATFORM", symbol: "+", description: "A nationwide platform supporting veterinary clinic coordination.", contribution: "Developed a web application connecting partner veterinary clinics, handling inquiries, and making critical medical information accessible.", tags: ["Full-stack", "Healthcare", "Web App"] },
    { title: "Media Operations Platform", category: "MULTI-ORG CMS", symbol: "↗", description: "Scheduling and asset management across three media companies.", contribution: "Built a centralized content management and scheduling platform supporting collaboration, publishing workflows, and asset organization across teams in the US and Philippines.", tags: ["CMS", "Scheduling", "Automation"] },
    { title: "Café Ordering System", category: "COMMERCE / PAYMENTS", symbol: "◎", description: "Online ordering, payments, and live order status.", contribution: "Developed mobile-responsive café ordering with dynamic menus, PayMongo payment integration, and order tracking.", tags: ["PayMongo", "E-commerce", "Ordering"] },
    { title: "Hardware Delivery Platform", category: "RETAIL / LOGISTICS", symbol: "→", description: "Online ordering and delivery workflow management.", contribution: "Built product catalog management, delivery assignment, rider tracking, and order status flows for a hardware retailer.", tags: ["E-commerce", "Logistics", "Tracking"] },
    { title: "Library Management", category: "EDUCATION SYSTEM", symbol: "≡", description: "Digital inventory and borrowing records.", contribution: "Built tools to manage books, borrowing and returns, overdue items, and digital records for librarians and students.", tags: ["Inventory", "Records", "Education"] },
    { title: "Dental Appointment System", category: "HEALTHCARE / BOOKING", symbol: "✳", description: "Online patient booking and clinic scheduling.", contribution: "Developed appointment booking, automated confirmations, schedule management, and a clinic operations dashboard.", tags: ["Booking", "Scheduling", "Healthcare"] },
];

export default function SelectedWorkSection() {
    const [view, setView] = useState<"companies" | "projects">("companies");
    const [selectedCompany, setSelectedCompany] = useState(0);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const active = companies[selectedCompany];
    const project = selectedProject === null ? null : projects[selectedProject];

    return (
        <section id="experience" className={styles.section} aria-labelledby="experience-title">
            <div className={styles.container}>
                <header className={styles.heading}>
                    <div className={styles.kicker}><span className={styles.dash} />02 / EXPERIENCE <span className={styles.kickerMuted}>— THE WORK BEHIND THE WORK</span></div>
                    <h2 id="experience-title" className={styles.title}>EXPERI<span>ENCE</span><b>.</b></h2>
                    <p className={styles.intro}>The teams I've worked with, the systems I've engineered, and the problems I've helped solve.</p>
                </header>
                <div className={styles.toolbar}>
                    <div className={styles.toolbarLabel}>{view === "companies" ? "SELECTED EXPERIENCE" : "SELECTED CLIENT WORK"} <em>/ {view === "companies" ? "01—05" : "01—10"}</em></div>
                    <div className={styles.switch} role="group" aria-label="Experience view">
                        <button type="button" className={view === "companies" ? styles.switchActive : ""} onClick={() => setView("companies")} aria-pressed={view === "companies"}>COMPANIES</button>
                        <button type="button" className={view === "projects" ? styles.switchActive : ""} onClick={() => setView("projects")} aria-pressed={view === "projects"}>CLIENT PROJECTS</button>
                    </div>
                </div>
                {view === "companies" ? (
                    <div className={styles.companyGrid}>
                        <div className={styles.companyList}>
                            {companies.map((company, i) => (
                                <button type="button" key={company.name} className={`${styles.company} ${selectedCompany === i ? styles.companyActive : ""}`} onClick={() => setSelectedCompany(i)} aria-pressed={selectedCompany === i}>
                                    <span className={styles.companyNumber}>{String(i + 1).padStart(2, "0")}</span>
                                    <span className={styles.companyCopy}><strong>{company.name}</strong><small>{company.role.toUpperCase()} <span>·</span> {company.years}</small></span>
                                    <span className={styles.companyArrow} aria-hidden="true">↗</span>
                                </button>
                            ))}
                        </div>
                        <div className={styles.companyDetail}>
                            <div className={styles.detailTop}><span><i /> CURRENTLY VIEWING</span><span>{String(selectedCompany + 1).padStart(2, "0")} / 05</span></div>
                            <div key={selectedCompany} className={styles.detailContent}>
                                <div className={styles.detailEyebrow}>{active.years} / {active.role.toUpperCase()}</div>
                                <h3>{active.headline}</h3><p>{active.description}</p>
                                <div className={styles.tags}>{active.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                            </div>
                            <div className={styles.detailFooter}><span>SELECT A COMPANY TO EXPLORE</span><span className={styles.circleArrow}>↗</span></div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.projectArea}>
                        <div className={styles.projectSubheading}><span>FEATURED PROJECTS</span><span>01 / 04</span></div>
                        <div className={styles.featuredGrid}>
                            {projects.slice(0, 4).map((item, i) => (
                                <button type="button" key={item.title} className={styles.featuredCard} onClick={() => setSelectedProject(i)} aria-label={`View ${item.title} details`}>
                                    <span className={styles.cardTop}><span>0{i + 1} / FEATURED</span><span>↗</span></span>
                                    <span className={styles.featuredArt} aria-hidden="true"><span>{item.symbol}</span><span className={styles.artCircle} /></span>
                                    <span className={styles.cardBottom}><small>{item.category}</small><strong>{item.title}</strong><span>{item.description}</span></span>
                                </button>
                            ))}
                        </div>
                        <div className={styles.projectSubheading}><span>MORE CLIENT BUILDS</span><span>05 / 10</span></div>
                        <div className={styles.moreGrid}>
                            {projects.slice(4).map((item, i) => (
                                <button type="button" key={item.title} className={styles.moreCard} onClick={() => setSelectedProject(i + 4)} aria-label={`View ${item.title} details`}>
                                    <span className={styles.moreTop}><span>{String(i + 5).padStart(2, "0")} / SELECTED BUILD</span><span aria-hidden="true">↗</span></span>
                                    <span className={styles.moreSymbol} aria-hidden="true">{item.symbol}</span>
                                    <span className={styles.moreBottom}><strong>{item.title}</strong><span>{item.description}</span><small>{item.category}</small></span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {project && (
                <div className={styles.modalBackdrop} onClick={() => setSelectedProject(null)}>
                    <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onClick={event => event.stopPropagation()}>
                        <div className={styles.modalTop}><span>SELECTED WORK / {String(selectedProject! + 1).padStart(2, "0")}</span><button type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">✕</button></div>
                        <div className={styles.modalSymbol} aria-hidden="true">{project.symbol}</div>
                        <div className={styles.modalCategory}>{project.category}</div>
                        <h3 id="project-dialog-title">{project.title}</h3>
                        <p className={styles.modalLead}>{project.description}</p>
                        <div className={styles.modalDivider} />
                        <span className={styles.modalCaption}>MY CONTRIBUTION</span>
                        <p>{project.contribution}</p>
                        <div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                    </div>
                </div>
            )}
        </section>
    );
}
