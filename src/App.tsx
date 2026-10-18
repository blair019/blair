
import CinematicIntro from "./sections/CinematicIntro";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import Preloader from "./components/Preloader";
import SelectedWorkSection from "./sections/SelectedWorkSection.tsx";

export default function App() {
    return (
        <>
            <Preloader />

            <CinematicIntro />
            <SelectedWorkSection />
            <ProjectsSection />

            <ExperienceSection />
            <ContactSection />
        </>
    );
}
