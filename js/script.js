"use strict";

const nav = document.querySelector("nav");
// mobile menu toggle
const menuIcon = document.querySelector(".menu-toggle");
const menuList = document.querySelector(".lista_menu");

const handleScroll = () => {
    if (!nav) return;
    if (window.scrollY > 100) {
        nav.classList.add("scroll_menu");
    } else {
        nav.classList.remove("scroll_menu");
    }
};

if (nav) {
    window.addEventListener("scroll", handleScroll);
}

if (menuIcon && menuList) {
    // rozwijanie i zwijanie menu
    const closeMenu = () => {
        menuList.classList.remove("open");
        menuIcon.classList.remove("active");
        menuIcon.setAttribute("aria-expanded", "false");
        menuIcon.focus();
        if (nav) nav.classList.remove("menu-open");
        document.body.classList.remove("no-scroll");
    };

    menuIcon.addEventListener("click", () => {
        const isOpen = menuList.classList.toggle("open");
        menuIcon.classList.toggle("active", isOpen);
        menuIcon.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (nav) nav.classList.toggle("menu-open", isOpen);
        document.body.classList.toggle("no-scroll", isOpen);
    });

    // zamykanie menu po kliknięciu w link
    document.querySelectorAll(".lista_menu a").forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // reset menu when switching to desktop view
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            closeMenu();
        }
    });

    // zamykanie menu klawiszem Escape
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuList.classList.contains("open")) {
            closeMenu();
        }
    });
}

const mapPlaceholder = document.querySelector(".map-placeholder");
if (mapPlaceholder) {
    const button = mapPlaceholder.querySelector(".map-load-btn");
    const iframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2545.0935282222995!2d19.02252351300101!3d50.36481047145742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716d56d80c212bd%3A0xb72a9b779eb6f49f!2sGabinet%20Weterynaryjny%20Marek%20Lig%C4%99za!5e0!3m2!1spl!2spl!4v1764879143891!5m2!1spl!2spl";

    const loadMap = () => {
        if (mapPlaceholder.querySelector("iframe")) return;
        const iframe = document.createElement("iframe");
        iframe.src = iframeSrc;
        iframe.width = "100%";
        iframe.height = "450";
        iframe.style.border = "0";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.title = "Mapa dojazdu do gabinetu weterynaryjnego w Wojkowicach";
        mapPlaceholder.innerHTML = "";
        mapPlaceholder.appendChild(iframe);
    };

    if (button) {
        button.addEventListener("click", loadMap);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadMap();
                observer.disconnect();
            }
        });
    }, { rootMargin: "200px" });

    observer.observe(mapPlaceholder);
}
