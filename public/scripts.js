/**
 * Event listener for HTML load.
 * Removes the preload class from body..
 */
document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementsByClassName("preload")[0];
    body.classList.remove("preload");
});

/**
 * Event listener for page full load.
 * Sets print page size for the website dynamically based on page content.
 * Prints a link into the console for an alternative version of the CV
 */
window.addEventListener("load", () => {
    const card = document.getElementsByClassName("cv__card")[0] || document.getElementsByClassName("content__inner")[0];
    if (card) {
        const params = new URLSearchParams(window.location.search);
        const lang = params.get('lang') || 'is';
        const projects = document.getElementsByClassName("project");
        if (projects.length == 0) {
            console.log(`See Full Version Here: ${window.location.href.replace(window.location.search, '')}?lang=${lang}`);
        } else {
            console.log(`Basic Version Here: ${window.location.href.replace(window.location.search, '')}?lang=${lang}&basic=true`)
        }
        const style = document.createElement('style');
        const width = Math.max(card.offsetWidth, card.clientWidth, card.scrollWidth);
        const height = Math.max(card.offsetHeight, card.clientHeight, card.scrollHeight) + 1;
        style.textContent = `@media print {@page {size: ${width}px ${height}px;}}`;
        document.head.append(style);
    }
});
