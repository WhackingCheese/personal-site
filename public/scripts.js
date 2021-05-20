const pdf_converter = "https://cloudconvert.com/save-website-pdf";

document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementsByClassName("preload")[0];
    body.classList.remove("preload");

    const page = document.getElementsByClassName("cv__inner")[0];
    const card = document.getElementsByClassName("cv__card")[0];
    
    if (page && !card) {
        const height = 21 * (1 / (page.scrollWidth / page.scrollHeight))
        console.log(`Language: ${document.documentElement.lang}`);
        console.log(`Height: ${height}cm`);
        console.log(`Create PDF at: ${pdf_converter}`);
    } else {
        console.log(`Printable version: ${window.location.href}&pdf=true`);
    }
});
