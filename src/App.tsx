
import CinematicIntro from "./sections/CinematicIntro";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import Preloader from "./components/Preloader";

export default function App() {
    return (
        <>
            <Preloader />

            <CinematicIntro />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
        </>
    );
}
