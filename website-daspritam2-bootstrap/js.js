const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  if (button.classList.contains("btn-glitch")) {
    button.addEventListener("mouseenter", () => {
      button.textContent = "";
    });

    button.addEventListener("mouseleave", () => {
      button.textContent = "11. GLITCH";
    });
  }

  if (button.classList.contains("btn-morph")) {
    button.addEventListener("mouseenter", () => {
      setTimeout(() => {
        button.textContent = "WOW!";
      }, 250);
    });

    button.addEventListener("mouseleave", () => {
      setTimeout(() => {
        button.textContent = "12. MORPH";
      }, 250);
    });
  }
});
