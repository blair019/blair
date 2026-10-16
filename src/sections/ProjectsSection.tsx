
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import type { CSSProperties } from "react";
import "./projects.css";

type Project = {
    id: string;
    number: string;
    name: string;
    description: string;
    category: string;
    image: string;
    url: string | null;
    accent: string;
};

type Expansion = {
    index: number;
    left: number;
    top: number;
    width: number;
    height: number;
};

const projects: Project[] = [
    {
        id: "issho",
        number: "01",
        name: "ISSHO",
        description:
            "A Japan-focused platform helping people break out of everyday routines through small, meaningful experiences.",
        category: "PERSONAL PROJECT / NEXT.JS / TYPESCRIPT",
        image: "/images/issho-main-bg.png",
        url: null,
        accent: "#f2c8b7",
    },
    {
        id: "tuntunan",
        number: "02",
        name: "TUNTUNAN",
        description:
            "A location-based discovery platform helping people find cafés and places worth exploring.",
        category: "WEB APPLICATION / LOCATION DISCOVERY",
        image: "/images/tuntunan-main-bg.png",
        url: "https://frontend-tuntunan.vercel.app/",
        accent: "#d6ff68",
    },
    {
        id: "prospectpick",
        number: "03",
        name: "PROSPECT PICK",
        description:
            "A full-stack web application bringing discovery, design, and functionality together.",
        category: "FULL-STACK / REACT / DJANGO",
        image: "/images/prospect-main-bg.png",
        url: "https://prospect-shop.vercel.app/",
        accent: "#b9ccff",
    },
];

const EXPAND_DURATION = 1200;
const EXIT_DURATION = 280;
const CONTENT_START = 1000;
const FINISH_DURATION = 1750;

export default function App() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [displayIndex, setDisplayIndex] = useState(0);

    const [transitioning, setTransitioning] =
        useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    const [expansion, setExpansion] =
        useState<Expansion | null>(null);

    const [expansionStarted, setExpansionStarted] =
        useState(false);

    const [contentPhase, setContentPhase] =
        useState<"visible" | "exit" | "prepare" | "enter">(
            "visible"
        );

    const activeIndexRef = useRef(0);
    const transitioningRef = useRef(false);

    const cardRefs =
        useRef<(HTMLButtonElement | null)[]>([]);

    const timersRef =
        useRef<ReturnType<typeof setTimeout>[]>([]);

    const framesRef = useRef<number[]>([]);

    const activeProject = projects[activeIndex];
    const displayedProject = projects[displayIndex];

    const selectProject = useCallback((index: number) => {
        const nextIndex =
            (index + projects.length) % projects.length;

        if (
            nextIndex === activeIndexRef.current ||
            transitioningRef.current
        ) {
            return;
        }

        const card = cardRefs.current[nextIndex];
        if (!card) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
            setDisplayIndex(nextIndex);
            return;
        }

        const rect = card.getBoundingClientRect();

        transitioningRef.current = true;
        setTransitioning(true);

        setContentPhase("exit");

        setExpansion({
            index: nextIndex,
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
        });

        setExpansionStarted(false);

        // Start only after the initial frame is painted.
        const firstFrame = requestAnimationFrame(() => {
            const secondFrame = requestAnimationFrame(() => {
                setExpansionStarted(true);
            });

            framesRef.current.push(secondFrame);
        });

        framesRef.current.push(firstFrame);

        // Let the previous text finish leaving.
        const prepareTimer = setTimeout(() => {
            setContentPhase("prepare");
            setDisplayIndex(nextIndex);
        }, EXIT_DURATION + 80);

        // Show the exact same image behind the
        // expanding layer before it finishes.
        const backgroundTimer = setTimeout(() => {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
        }, EXPAND_DURATION - 100);

        // Start new text from bottom-left.
        const contentTimer = setTimeout(() => {
            setContentPhase("enter");
        }, CONTENT_START);

        // Remove overlay after it reaches full size.
        const overlayTimer = setTimeout(() => {
            setExpansion(null);
            setExpansionStarted(false);
        }, EXPAND_DURATION + 80);

        const finishTimer = setTimeout(() => {
            setContentPhase("visible");
            setTransitioning(false);
            transitioningRef.current = false;
        }, FINISH_DURATION);

        timersRef.current.push(
            prepareTimer,
            backgroundTimer,
            contentTimer,
            overlayTimer,
            finishTimer
        );
    }, []);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            const target = event.target;

            if (
                target instanceof HTMLElement &&
                (
                    target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable
                )
            ) {
                return;
            }

            if (event.key === "ArrowRight") {
                selectProject(activeIndexRef.current + 1);
            }

            if (event.key === "ArrowLeft") {
                selectProject(activeIndexRef.current - 1);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [selectProject]);

    useEffect(() => {
        // Preload screenshots to avoid a flash
        // when changing project backgrounds.
        projects.forEach((project) => {
            const image = new Image();
            image.src = project.image;
        });

        return () => {
            timersRef.current.forEach(clearTimeout);
            framesRef.current.forEach(cancelAnimationFrame);
        };
    }, []);

    const themeStyle = {
        "--project-accent": activeProject.accent,
    } as CSSProperties;

    const expansionStyle = expansion
        ? ({
            "--expand-left": `${expansion.left}px`,
            "--expand-top": `${expansion.top}px`,
            "--expand-width": `${expansion.width}px`,
            "--expand-height": `${expansion.height}px`,
            "--expand-image": `url("${projects[expansion.index].image}")`,
        } as CSSProperties)
        : undefined;

    return (
        <div
            className={`portfolio ${
                transitioning ? "is-transitioning" : ""
            }`}
            style={themeStyle}
        >
            {/* Backgrounds */}
            <div
                className="portfolio-backgrounds"
                aria-hidden="true"
            >
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`portfolio-background ${
                            index === activeIndex
                                ? "is-active"
                                : ""
                        }`}
                        style={{
                            backgroundImage:
                                `url("${project.image}")`,
                        }}
                    />
                ))}
            </div>

            <div className="portfolio-overlay" />
            <div className="portfolio-grain" />

            {/* Shared-image expansion */}
            {expansion && (
                <div
                    className={`project-expansion ${
                        expansionStarted
                            ? "is-expanded"
                            : ""
                    }`}
                    style={expansionStyle}
                    aria-hidden="true"
                >
                    <div className="project-expansion-image" />
                    <div className="project-expansion-shade" />
                </div>
            )}



            {/* Main project information */}
            <main className="portfolio-main" id="work">
                <div
                    className={`portfolio-content content-${contentPhase}`}
                >
                    <div className="portfolio-eyebrow">
                        <span className="eyebrow-line" />
                        <span>
                            {displayedProject.number}
                            {" / SELECTED WORK — 2026"}
                        </span>
                    </div>

                    <div className="portfolio-title-wrapper">
                        <h1 className="portfolio-title">
                            {displayedProject.name}
                            <span className="title-period">
                                .
                            </span>
                        </h1>
                    </div>

                    <p className="portfolio-category">
                        {displayedProject.category}
                    </p>

                    <p className="portfolio-description">
                        {displayedProject.description}
                    </p>

                    {displayedProject.url ? (
                        <a
                            className="portfolio-project-link"
                            href={displayedProject.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            EXPLORE PROJECT
                            <span className="project-link-icon">
                                ↗
                            </span>
                        </a>
                    ) : (
                        <div className="portfolio-coming-soon">
                            <span className="coming-soon-dot" />
                            PROJECT IN DEVELOPMENT
                        </div>
                    )}
                </div>
            </main>

            {/* Project thumbnails */}
            <footer className="portfolio-footer">
                <div className="portfolio-counter">
                    <div>
                        <span className="counter-current">
                            {activeProject.number}
                        </span>

                        <span className="counter-divider">
                            {" / "}
                            {String(projects.length).padStart(
                                2,
                                "0"
                            )}
                        </span>
                    </div>

                    <span className="counter-caption">
                        FEATURED PROJECTS
                    </span>
                </div>

                <div
                    className="portfolio-project-cards"
                    aria-label="Select a project"
                >
                    {projects.map((project, index) => (
                        <button
                            key={project.id}
                            ref={(element) => {
                                cardRefs.current[index] =
                                    element;
                            }}
                            type="button"
                            className={`portfolio-project-card ${
                                index === activeIndex
                                    ? "is-active"
                                    : ""
                            }`}
                            onClick={() =>
                                selectProject(index)
                            }
                            disabled={transitioning}
                            aria-pressed={
                                index === activeIndex
                            }
                            style={
                                {
                                    "--card-accent":
                                    project.accent,
                                    backgroundImage:
                                        `url("${project.image}")`,
                                } as CSSProperties
                            }
                        >
                            <span className="project-card-shade" />

                            <span className="project-card-number">
                                {project.number} / PROJECT
                            </span>

                            <span className="project-card-name">
                                {project.name}
                                <span aria-hidden="true">
                                    {" ↗"}
                                </span>
                            </span>
                        </button>
                    ))}
                </div>

                <div className="portfolio-controls">
                    <button
                        type="button"
                        onClick={() =>
                            selectProject(activeIndex - 1)
                        }
                        disabled={transitioning}
                        aria-label="Previous project"
                    >
                        ‹
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            selectProject(activeIndex + 1)
                        }
                        disabled={transitioning}
                        aria-label="Next project"
                    >
                        ›
                    </button>
                </div>
            </footer>

            <div className="portfolio-progress">
                <div
                    className="portfolio-progress-fill"
                    style={{
                        width:
                            `${((activeIndex + 1) / projects.length) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
}
