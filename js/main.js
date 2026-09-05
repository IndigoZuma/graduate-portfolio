"use strict";

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".primary-navigation");
const themeButton = document.querySelector(".theme-button");
const currentYear = document.querySelector("#current-year");

function closeMenu() {
  if (!menuButton || !navigation) {
    return;
  }

  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function setTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark-mode", isDark);

  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.querySelector(".theme-label").textContent = isDark
      ? "Light mode"
      : "Dark mode";
  }
}

const savedTheme = localStorage.getItem("portfolio-theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme(systemPrefersDark ? "dark" : "light");
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark";

    localStorage.setItem("portfolio-theme", newTheme);
    setTheme(newTheme);
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
