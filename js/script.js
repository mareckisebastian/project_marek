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
    };

    menuIcon.addEventListener("click", () => {
        menuList.classList.toggle("open");
        menuIcon.classList.toggle("active");
        menuIcon.setAttribute("aria-expanded", menuList.classList.contains("open"));
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

