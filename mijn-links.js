const categories = {
    Home: [
        ["▶️", "YouTube", "https://www.youtube.com/"],
        ["🤖", "Lovable", "https://lovable.dev/"],
        ["🖥️", "MCServerHost", "https://www.mcserverhost.com/"]
    ],
    Minecraft: [
        ["⛏️", "Aternos", "https://aternos.org/"],
        ["🧩", "Modrinth", "https://modrinth.com/"]
    ],
    Tools: [
        ["📝", "Google Forms", "https://forms.google.com/"]
    ],
    "AI Tools": [
        ["🤖", "Lovable", "https://lovable.dev/"]
    ],
    School: [
        ["📅", "Somtoday rooster", "https://leerling.somtoday.nl/rooster"],
        ["📚", "SlimStampen", "https://mijn.slimstampen.nl/#/lessons?tab="]
    ]
};

const categoryIcons = {
    Home: "🏠",
    Minecraft: "⛏️",
    Tools: "🛠️",
    "AI Tools": "🤖",
    School: "🎒"
};

const nav = document.querySelector("#category-nav");
const pages = document.querySelector("#pages");
let currentCategory = "Home";

function render() {
    nav.replaceChildren();
    pages.replaceChildren();

    Object.entries(categories).forEach(([category, links]) => {
        const categoryButton = document.createElement("button");
        categoryButton.type = "button";
        categoryButton.className = `category-button${category === currentCategory ? " active" : ""}`;
        categoryButton.textContent = `${categoryIcons[category]} ${category}`;
        categoryButton.setAttribute("aria-pressed", String(category === currentCategory));
        categoryButton.addEventListener("click", () => {
            currentCategory = category;
            render();
        });
        nav.append(categoryButton);

        const section = document.createElement("section");
        section.className = `page${category === currentCategory ? " active" : ""}`;
        section.setAttribute("aria-label", category);

        const heading = document.createElement("h2");
        heading.className = "page-heading";
        heading.textContent = category;
        section.append(heading);

        const grid = document.createElement("div");
        grid.className = "link-grid";

        links.forEach(([icon, name, url]) => {
            const link = document.createElement("a");
            link.className = "link-card";
            link.href = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            const iconElement = document.createElement("span");
            iconElement.className = "link-icon";
            iconElement.setAttribute("aria-hidden", "true");
            iconElement.textContent = icon;

            const nameElement = document.createElement("span");
            nameElement.textContent = name;

            link.append(iconElement, nameElement);
            grid.append(link);
        });

        section.append(grid);
        pages.append(section);
    });
}

render();
