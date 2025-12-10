"use strict";

const nav = document.querySelector("nav");
// mobile menu toggle
const menuIcon = document.querySelector(".material-symbols-outlined");
const menuList = document.querySelector(".lista_menu");

const handleScroll = () => {
    if (window.scrollY > 100) {
        nav.classList.add("scroll_menu");
    } else {
        nav.classList.remove("scroll_menu");
    }
};

window.addEventListener("scroll", handleScroll);

//rozwijanie i zwijanie menu
menuIcon.addEventListener("click", () => {
    menuList.classList.toggle("open");
    menuIcon.classList.toggle("active");
    menuIcon.setAttribute("aria-expanded", menuList.classList.contains("open"));
});

// zamykanie menu po kliknięciu w link
document.querySelectorAll(".lista_menu a").forEach(link => {
    link.addEventListener("click", () => {
        menuList.classList.remove("open");
        menuIcon.classList.remove("active");
        menuIcon.setAttribute("aria-expanded", "false");
    });
});

// reset menu when switching to desktop view
window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
        menuList.classList.remove("open");
        menuIcon.classList.remove("active");
        menuIcon.setAttribute("aria-expanded", "false");
    }
});



