const THEME_KEY = "personalWebsiteTheme";
const themeToggle = document.querySelector(".theme-toggle");

if (location.protocol === "file:") {
    document.body.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("permalink:")) node.remove();
    });
}

if (location.protocol === "file:") {
    document.querySelectorAll('a[href^="/"]').forEach(link => {
        const route = link.getAttribute("href");
        const suffixIndex = route.search(/[?#]/);
        const pathname = suffixIndex === -1 ? route : route.slice(0, suffixIndex);
        const suffix = suffixIndex === -1 ? "" : route.slice(suffixIndex);
        const localPath = pathname === "/" ? "index.html" : `${pathname.replace(/^\/+|\/+$/g, "")}.html`;
        link.setAttribute("href", `${localPath}${suffix}`);
    });
}

if (themeToggle) {
    function setTheme(theme) {
        const isLight = theme === "light";
        document.body.dataset.theme = isLight ? "light" : "dark";
        themeToggle.textContent = isLight ? "☾" : "☀";
        themeToggle.setAttribute("aria-label", `Schakel naar ${isLight ? "donker" : "licht"} thema`);
        themeToggle.setAttribute("aria-pressed", String(isLight));
    }

    try {
        setTheme(localStorage.getItem(THEME_KEY));
    } catch (error) {
        setTheme("dark");
        console.error(`Thema-instelling kon niet worden geladen: ${error.message}`);
    }

    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        try {
            localStorage.setItem(THEME_KEY, nextTheme);
        } catch (error) {
            console.error(`Thema-instelling kon niet worden opgeslagen: ${error.message}`);
        }
    });
}
