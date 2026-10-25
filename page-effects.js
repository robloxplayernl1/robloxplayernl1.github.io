const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
    "main > section, main article, .legal-content > *, .about-card, .error-card, .maintenance-card, .container > .page-header, .container > footer"
);

document.documentElement.classList.add("page-effects-enabled");

if (!reducedMotion) {
    document.body.classList.add("page-entering");
    window.setTimeout(() => {
        document.body.classList.remove("page-entering");
    }, 900);

    revealTargets.forEach((element, index) => {
        element.classList.add("scroll-reveal");
        const stagger = index % 4;
        if (stagger) element.style.setProperty("--reveal-delay", `${stagger * 55}ms`);
    });

    function revealVisibleElements() {
        revealTargets.forEach(element => {
            if (element.classList.contains("is-visible")) return;
            const bounds = element.getBoundingClientRect();
            if (bounds.top < window.innerHeight * 0.9 && bounds.bottom > window.innerHeight * 0.1) {
                element.classList.add("is-visible");
            }
        });
    }

    revealVisibleElements();
    window.addEventListener("scroll", revealVisibleElements, { passive: true });
    window.addEventListener("resize", revealVisibleElements);
} else {
    revealTargets.forEach(element => element.classList.add("is-visible"));
}

document.addEventListener("click", event => {
    if (
        reducedMotion ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
    ) return;

    const link = event.target.closest("a[href]");
    if (!link || link.target || link.hasAttribute("download")) return;

    const destination = new URL(link.href, window.location.href);
    const isSameOrigin = destination.origin === window.location.origin;
    const isSamePath = destination.pathname === window.location.pathname;
    if (!isSameOrigin || isSamePath) return;

    event.preventDefault();
    document.body.classList.add("page-leaving");
    window.setTimeout(() => window.location.assign(destination.href), 180);
});
