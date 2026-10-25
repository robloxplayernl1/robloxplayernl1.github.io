const skills = [
    { name: "HTML", icon: "5", description: "De structuur en inhoud van webpagina's opbouwen." },
    { name: "CSS", icon: "#", description: "Websites vormgeven en geschikt maken voor verschillende schermformaten." },
    { name: "JavaScript", icon: "JS", description: "Webpagina's interactief maken met functies in de browser." },
    { name: "Python", icon: "🐍", description: "Een programmeertaal waarmee ik programma's en scripts kan maken." },
    { name: "Minecraft Skript", icon: "⛏️", description: "Scripts en functies maken voor Minecraft-servers." }
];

const projects = [
    {
        title: "Persoonlijke website",
        image: "images/project-website.svg",
        imageAlt: "Illustratie van een browservenster voor de persoonlijke website",
        description: "Mijn persoonlijke website met informatie over mij, mijn projecten en wat ik maak.",
        technologies: ["HTML", "CSS", "JavaScript"],
        url: "/",
        type: "website"
    },
    {
        title: "Blokcraft",
        image: "images/project-blokcraft.svg",
        imageAlt: "Illustratie van een blok voor het Minecraft-project Blokcraft",
        description: "De website en informatiepagina voor Blokcraft, een Minecraft-server.",
        technologies: ["HTML", "CSS", "JavaScript", "Minecraft"],
        url: "/blokcraft/",
        type: "website"
    }
];

const updates = [
     {
        version: "1.2.0",
        date: "2026-10-25",
        title: "veranderderde over mij",
        description: "anderen over mij tekst"
    },
    {
        version: "1.1.0",
        date: "2026-10-25",
        title: "Nettere website-adressen",
        description: "Je kunt pagina's nu openen met korte URL's zonder .html, zoals /projecten/ en /over-mij/."
    },
    {
        version: "1.0.0",
        date: "2026-10-25",
        title: "Website live",
        description: "De website is live met pagina's voor projecten en vaardigheden, een live klok, interactieve terminal en statistieken."
    }
];

function renderItems(container, items, createItem) {
    if (!container) return;
    container.replaceChildren(...items.map(createItem));
}

function getPageUrl(url) {
    if (location.protocol !== "file:") return url;
    return url === "/" ? "index.html" : `${url.replace(/^\/+|\/+$/g, "")}.html`;
}

function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card";

    const image = document.createElement("img");
    image.className = "project-image";
    image.src = project.image;
    image.alt = project.imageAlt;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "project-card-content";

    const title = document.createElement("h2");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = project.description;

    const technologies = document.createElement("ul");
    technologies.className = "technology-list";
    technologies.setAttribute("aria-label", "Gebruikte technologieën");
    project.technologies.forEach(technology => {
        const tag = document.createElement("li");
        tag.textContent = technology;
        technologies.append(tag);
    });

    const link = document.createElement("a");
    link.className = "project-link";
    link.href = getPageUrl(project.url);
    link.textContent = `Bekijk ${project.title}`;
    link.setAttribute("aria-label", `Bekijk project: ${project.title}`);

    content.append(title, description, technologies, link);
    card.append(image, content);
    return card;
}

function createSkillCard(skill) {
    const card = document.createElement("article");
    card.className = "skill-card";

    const icon = document.createElement("span");
    icon.className = "skill-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = skill.icon;

    const title = document.createElement("h2");
    title.textContent = skill.name;

    const description = document.createElement("p");
    description.textContent = skill.description;

    card.append(icon, title, description);
    return card;
}

function formatDutchDate(date) {
    return new Intl.DateTimeFormat("nl-NL", {
        timeZone: "Europe/Amsterdam",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);
}

function createUpdateCard(update) {
    const card = document.createElement("article");
    card.className = "update-card";

    const meta = document.createElement("p");
    meta.className = "update-meta";
    meta.textContent = `Versie ${update.version} · ${formatDutchDate(new Date(`${update.date}T12:00:00Z`))}`;

    const title = document.createElement("h2");
    title.textContent = update.title;

    const description = document.createElement("p");
    description.textContent = update.description;

    card.append(meta, title, description);
    return card;
}

function createStatCard(label, value) {
    const card = document.createElement("article");
    card.className = "stat-card";
    const count = document.createElement("strong");
    count.textContent = String(value);
    const caption = document.createElement("span");
    caption.textContent = label;
    card.append(count, caption);
    return card;
}

renderItems(document.querySelector("#projects-grid"), projects, createProjectCard);
renderItems(document.querySelector("#skills-grid"), skills, createSkillCard);
renderItems(
    document.querySelector("#updates-list"),
    [...updates].sort((first, second) => second.date.localeCompare(first.date)),
    createUpdateCard
);
renderItems(document.querySelector("#stats-grid"), [
    { label: "Projecten", value: projects.length },
    { label: "Websites", value: projects.filter(project => project.type === "website").length },
    { label: "Technologieën", value: skills.length }
], stat => createStatCard(stat.label, stat.value));

const clock = document.querySelector("#live-clock");
const liveDate = document.querySelector("#live-date");

if (clock && liveDate) {
    const timeFormatter = new Intl.DateTimeFormat("nl-NL", {
        timeZone: "Europe/Amsterdam",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    });

    function updateClock() {
        const now = new Date();
        clock.textContent = timeFormatter.format(now);
        liveDate.textContent = formatDutchDate(now);
        clock.dateTime = now.toISOString();
    }

    updateClock();
    window.setInterval(updateClock, 1000);
}

const terminalForm = document.querySelector("#terminal-form");
const terminalInput = document.querySelector("#terminal-input");
const terminalOutput = document.querySelector("#terminal-output");

if (terminalForm && terminalInput && terminalOutput) {
    const commands = ["help", "about", "whoami", "projects", "skills", "date", "time", "contact", "website", "theme", "ls", "echo", "clear"];
    const commandHelp = [
        "Beschikbare opdrachten:",
        "help · about / whoami · projects · skills · date / time",
        "contact · website · theme · ls · echo <tekst> · clear",
        "Gebruik ↑ en ↓ voor je opdrachtgeschiedenis. Tab vult opdrachten aan."
    ].join("\n");
    const history = [];
    let historyIndex = 0;

    function printTerminalLine(text, className = "") {
        const line = document.createElement("p");
        if (className) line.className = className;
        line.textContent = text;
        terminalOutput.append(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function runCommand(rawCommand) {
        const commandLine = rawCommand.trim();
        if (!commandLine) return;

        printTerminalLine(`> ${commandLine}`, "terminal-command");
        const [command, ...argumentParts] = commandLine.split(/\s+/);
        const argument = argumentParts.join(" ");
        const now = new Date();

        switch (command.toLowerCase()) {
            case "help":
                commandHelp.split("\n").forEach(line => printTerminalLine(line));
                break;
            case "about":
            case "whoami":
                printTerminalLine("Ik ben Sil. Ik kom uit Nederland en maak websites en Minecraft-projecten.");
                break;
            case "projects":
                printTerminalLine(projects.map(project => project.title).join(" · "));
                printTerminalLine("Open de pagina Projecten voor meer informatie.");
                break;
            case "skills":
                printTerminalLine(skills.map(skill => skill.name).join(" · "));
                break;
            case "date":
            case "time": {
                const time = new Intl.DateTimeFormat("nl-NL", {
                    timeZone: "Europe/Amsterdam",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hourCycle: "h23"
                }).format(now);
                printTerminalLine(`${formatDutchDate(now)} · ${time}`);
                break;
            }
            case "contact":
                printTerminalLine("Voor Blokcraft-vragen kun je terecht op de Blokcraft-pagina en Discord.");
                break;
            case "website":
                printTerminalLine("Je bekijkt de persoonlijke website van Sil.");
                break;
            case "theme":
                printTerminalLine(`Het ${document.body.dataset.theme === "light" ? "lichte" : "donkere"} thema is actief. Gebruik het zonnetje om te wisselen.`);
                break;
            case "ls":
                printTerminalLine("/ · /projecten/ · /vaardigheden/ · /updates/ · /blokcraft/");
                break;
            case "echo":
                printTerminalLine(argument || "Gebruik: echo <tekst>");
                break;
            case "clear":
                terminalOutput.replaceChildren();
                printTerminalLine("Terminal leeggemaakt. Typ help voor opdrachten.");
                break;
            default:
                printTerminalLine(`Onbekende opdracht: ${command}. Typ help voor de opdrachtenlijst.`, "terminal-error");
        }
    }

    terminalForm.addEventListener("submit", event => {
        event.preventDefault();
        const command = terminalInput.value.trim();
        terminalInput.value = "";
        if (!command) return;
        history.push(command);
        if (history.length > 50) history.shift();
        historyIndex = history.length;
        runCommand(command);
    });

    terminalInput.addEventListener("keydown", event => {
        if (event.key === "ArrowUp" && history.length) {
            event.preventDefault();
            historyIndex = Math.max(0, historyIndex - 1);
            terminalInput.value = history[historyIndex];
        } else if (event.key === "ArrowDown" && history.length) {
            event.preventDefault();
            historyIndex = Math.min(history.length, historyIndex + 1);
            terminalInput.value = history[historyIndex] || "";
        } else if (event.key === "Tab") {
            const partial = terminalInput.value.trim().toLowerCase();
            const matches = commands.filter(command => command.startsWith(partial));
            if (partial && matches.length === 1) {
                event.preventDefault();
                terminalInput.value = matches[0];
            }
        } else if (event.ctrlKey && event.key.toLowerCase() === "l") {
            event.preventDefault();
            terminalOutput.replaceChildren();
            printTerminalLine("Terminal leeggemaakt. Typ help voor opdrachten.");
        }
    });

    document.querySelectorAll("[data-terminal-command]").forEach(button => {
        button.addEventListener("click", () => {
            const command = button.dataset.terminalCommand;
            history.push(command);
            historyIndex = history.length;
            runCommand(command);
            terminalInput.focus();
        });
    });
}
