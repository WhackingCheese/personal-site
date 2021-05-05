export function catchErrors(fn) {
    return (req, res) => fn(req, res);
}

export function getPages() {
    return [
        {
            name: "CV",
            href: "/cv"
        },
        {
            name: "About",
            href: "/about"
        }
    ]
}

export function getSocials() {
    return [
        {
            name: "Email",
            href: "mailto:mikolaj.cymcyk@gmail.com",
            svg: "../svg/email.svg"
        },
        {
            name: "GitHub",
            href: "https://github.com/WhackingCheese/",
            svg: "../svg/github.svg"
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/mikolaj-cymcyk-0a03aa211",
            svg: "../svg/linkedin.svg"
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/mikkicym/",
            svg: "../svg/instagram.svg"
        }
    ]
}
