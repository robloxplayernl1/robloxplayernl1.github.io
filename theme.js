const THEME_KEY = "personalWebsiteTheme";
const themeToggle = document.querySelector(".theme-toggle");

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
