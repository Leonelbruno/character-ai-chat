import { renderHome } from "./views/home.js";
import { renderChat } from "./views/chatView.js";
import { renderAbout } from "./views/about.js";
import { renderNotFound } from "./views/notFound.js";

const routes = {
    "/": renderHome,
    "/home": renderHome,
    "/chat": renderChat,
    "/about": renderAbout
};

export function router() {
    const path = window.location.pathname;
    const renderView = routes[path] || renderNotFound;

    renderView();
    updateActiveLink(path);
}

export function navigateTo(path) {
    window.history.pushState(null, "", path);
    router();
}

function updateActiveLink(path) {
    const currentPath = path === "/" ? "/home" : path;

    document.querySelectorAll(".site-nav a").forEach((link) => {
        const href = link.getAttribute("href");

        if (href === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}