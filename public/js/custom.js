const scrollToSection = (event, sectionId) => {
    event.preventDefault();  // Previene il comportamento di default del link
    const section = document.querySelector(sectionId);
    const offset = 110;  // Altezza del menu sticky
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = section.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth" // Scorrimento fluido
    });
}