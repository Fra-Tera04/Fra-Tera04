const backToTopBtn = document.getElementById("back-to-top");

// Mostra pulsante dopo 300px
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  if (typeof lenis !== "undefined") {
    lenis.scrollTo(0);
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

// --- CONTENUTI PRESI DAL README.MD ---
// Oggetto che conterrà i testi (all'inizio mostra un caricamento)
const detailsData = {
  academic: "<p>Loading data...</p>",
  projects: "<p>Loading data...</p>",
  experience: "<p>Loading data...</p>",
};

// Funzione "estrattore": cerca i segnalibri e taglia il testo in mezzo
function extractSection(text, marker) {
  const startTag = `<!-- START: ${marker} -->`;
  const endTag = `<!-- END: ${marker} -->`;
  const startIndex = text.indexOf(startTag);
  const endIndex = text.indexOf(endTag);

  if (startIndex !== -1 && endIndex !== -1) {
    // Taglia la parte che ci interessa
    const rawMarkdown = text
      .substring(startIndex + startTag.length, endIndex)
      .trim();
    // Converte il Markdown in HTML pronto per il sito
    return marked.parse(rawMarkdown);
  }
  return "<p>Sezione non trovata nel README.</p>";
}

// Chiamata Fetch per leggere il file README.md in automatico
fetch("README.md")
  .then((response) => {
    if (!response.ok) throw new Error("README non trovato");
    return response.text();
  })
  .then((markdownText) => {
    // Popola dinamicamente i dati tagliando le sezioni
    detailsData.academic = extractSection(markdownText, "ACADEMIC");
    detailsData.projects = extractSection(markdownText, "PROJECTS");
    detailsData.experience = extractSection(markdownText, "EXPERIENCE");
  })
  .catch((error) => {
    console.error(error);
    const errorMsg =
      "<p>Errore nel caricamento del README. Verifica che il file sia nella stessa cartella.</p>";
    detailsData.academic = errorMsg;
    detailsData.projects = errorMsg;
    detailsData.experience = errorMsg;
  });

// --- LOGICA DELLA MODALE (Rimane identica a prima) ---
const modal = document.getElementById("details-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close-modal");
const readMoreBtns = document.querySelectorAll(".read-more-btn");

readMoreBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const topic = btn.getAttribute("data-topic");
    modalBody.innerHTML = detailsData[topic]; // Inserisce l'HTML generato dal README
    modal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});
