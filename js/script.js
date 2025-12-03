"use strict";

const nav = document.querySelector("nav");

const handleScroll = () => {
    if (window.scrollY > 100) {
        nav.classList.add("scroll_menu");
    } else {
        nav.classList.remove("scroll_menu");
    }
};

window.addEventListener("scroll", handleScroll);