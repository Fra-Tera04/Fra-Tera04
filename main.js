const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// --- ANNO NEL FOOTER ---
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- TORNA IN CIMA ---
const backToTopBtn = document.getElementById("back-to-top");

// Mostra il pulsante dopo 300px
window.addEventListener(
  "scroll",
  () => backToTopBtn.classList.toggle("visible", window.scrollY > 300),
  { passive: true }
);

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion.matches ? "auto" : "smooth",
  });
});

// --- CONTENUTI PRESI DAL README.MD ---
// Oggetto che conterrà i testi (all'inizio mostra un caricamento)
const detailsData = {
  academic: "<p>Loading data...</p>",
  projects: "<p>Loading data...</p>",
  experience: "<p>Loading data...</p>",
};

// Estrattore: cerca i segnalibri nel README e ritaglia il testo in mezzo
function extractSection(text, marker) {
  const startTag = `<!-- START: ${marker} -->`;
  const endTag = `<!-- END: ${marker} -->`;
  const startIndex = text.indexOf(startTag);
  const endIndex = text.indexOf(endTag);

  if (startIndex !== -1 && endIndex !== -1) {
    const rawMarkdown = text
      .substring(startIndex + startTag.length, endIndex)
      .trim();
    // Converte il Markdown in HTML pronto per il sito
    return marked.parse(rawMarkdown);
  }
  return "<p>Section not found in the README.</p>";
}

fetch("README.md")
  .then((response) => {
    if (!response.ok) throw new Error("README not found");
    return response.text();
  })
  .then((markdownText) => {
    detailsData.academic = extractSection(markdownText, "ACADEMIC");
    detailsData.projects = extractSection(markdownText, "PROJECTS");
    detailsData.experience = extractSection(markdownText, "EXPERIENCE");
  })
  .catch((error) => {
    console.error(error);
    const errorMsg =
      "<p>Could not load the README. Check that the file is in the same folder.</p>";
    detailsData.academic = errorMsg;
    detailsData.projects = errorMsg;
    detailsData.experience = errorMsg;
  });

// --- MODALE (elemento <dialog> nativo) ---
// showModal() gestisce da solo: focus trap, sfondo inerte, tasto ESC e livello in primo piano.
const modal = document.getElementById("details-modal");
const modalContent = modal.querySelector(".modal-content");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close-modal");
const readMoreBtns = document.querySelectorAll(".read-more-btn");
let modalTrigger = null;
let isClosing = false;

function openModal(btn) {
  modalTrigger = btn;
  modalBody.innerHTML = detailsData[btn.dataset.topic] ?? "";

  // Il primo titolo del contenuto diventa il nome accessibile della finestra
  modal.removeAttribute("aria-labelledby");
  const heading = modalBody.querySelector("h1, h2, h3");
  if (heading) {
    heading.id = "modal-title";
    modal.setAttribute("aria-labelledby", "modal-title");
  }

  modalContent.scrollTop = 0;
  modal.showModal();
  // Frame successivo: fa partire la transizione di apertura. Il focus va dato
  // solo ora: finché il dialog è "visibility: hidden" i suoi figli non sono focalizzabili.
  requestAnimationFrame(() => {
    modal.classList.add("active");
    closeBtn.focus();
  });
}

function closeModal() {
  if (!modal.open || isClosing) return;
  isClosing = true;
  modal.classList.remove("active"); // avvia la dissolvenza

  let timer;
  const finish = () => {
    clearTimeout(timer);
    modal.removeEventListener("transitionend", onTransitionEnd);
    isClosing = false;
    modal.close();
  };
  const onTransitionEnd = (e) => {
    if (e.target === modal && e.propertyName === "opacity") finish();
  };
  modal.addEventListener("transitionend", onTransitionEnd);
  timer = setTimeout(finish, 500); // rete di sicurezza
}

readMoreBtns.forEach((btn) => btn.addEventListener("click", () => openModal(btn)));

closeBtn.addEventListener("click", closeModal);

// Clic sull'overlay (fuori dal riquadro) chiude
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ESC: usa la nostra chiusura con dissolvenza
modal.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeModal();
});

// A chiusura avvenuta il focus torna al bottone che l'aveva aperta
modal.addEventListener("close", () => modalTrigger?.focus());
