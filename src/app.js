import { router } from "./router.js";

document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-link]");

    if (!link) return;

    event.preventDefault();

    const path = link.getAttribute("href");
    window.history.pushState(null, "", path);

    router();
});

window.addEventListener("popstate", router);

router();