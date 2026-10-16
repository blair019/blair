# BLAIR — Restored modular portfolio

This version is built around the **original Vite/React project carousel** found in `src/App.tsx` of the supplied RAR. Its JSX, animation timing, images, navigation, and project data have been preserved in `src/sections/ProjectsSection.tsx`; its original stylesheet is `src/sections/projects.css`.

## Run
`npm install` then `npm run dev`.

## Files
- `src/sections/CinematicIntro.tsx` and `.module.css`: new cinematic hero
- `src/sections/AboutSection.tsx` and `.module.css`: introduction
- `src/sections/ExperienceSection.tsx` and `.module.css`: technical expertise (verify personal details)
- `src/sections/ProjectsSection.tsx` and `projects.css`: original preserved carousel
- `src/sections/ContactSection.tsx` and `.module.css`: closing section
- `src/App.tsx`: section composition

## Notes
The cinematic orb is cropped artwork from the approved visual concept, not a true 3D object. This is an approximation of the visual reference, not pixel-identical. The original project carousel still includes its own navbar and project-specific colors. Contact details are deliberately not invented. No unrelated carousel refactoring has been performed.
