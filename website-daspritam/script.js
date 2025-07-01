document.addEventListener("DOMContentLoaded", () => {
  const appContent = document.getElementById("app-content");
  const navLinks = document.querySelectorAll(".nav-link");

  // Oggetto che mappa i nomi delle sezioni al loro contenuto HTML
  const sectionsContent = {
    home: `
            <div class="section-content">
                <h2>Benvenuto nel Mio Portfolio</h2>
                <p>Sono un creativo e sviluppatore web basato in Italia. Realizzo siti web stimolanti con passione e dedizione per aiutare aziende e professionisti a crescere.</p>
                <p>Esplora i miei progetti e scopri come posso aiutarti a raggiungere i tuoi obiettivi digitali.</p>
                <a href="#progetti" class="button nav-link" data-section="projects" style="display:inline-block; margin-top: 20px; padding: 10px 20px; background-color: #00bcd4; color: white; border-radius: 5px;">Vedi i miei progetti</a>
            </div>
        `,
    about: `
            <div class="section-content">
                <h2>Chi Sono</h2>
                <p>Ciao! Mi chiamo [Il Tuo Nome] e sono un [La Tua Professione/Ruolo]. La mia passione è creare esperienze digitali intuitive e visivamente accattivanti. Dal design all'implementazione, mi dedico a ogni fase del processo per dare vita a idee uniche.</p>
                <p>Ho esperienza in [elenca 2-3 tecnologie o aree di competenza, es. HTML, CSS, JavaScript, Web Design Responsivo, UI/UX, Animazioni].</p>
                <p>Credo che ogni progetto sia un'opportunità per imparare e crescere, e mi impegno a fornire soluzioni di alta qualità che superino le aspettative dei clienti.</p>
            </div>
        `,
    projects: `
            <div class="section-content">
                <h2>I Miei Progetti</h2>
                <div class="project-grid">
                    <div class="project-item">
                        <h3>Progetto 1: Sito E-commerce</h3>
                        <p>Sviluppo frontend per un negozio online, con focus sull'usabilità e design moderno.</p>
                        <p>Tecnologie: HTML, CSS (Flexbox/Grid), JavaScript.</p>
                        <a href="#" target="_blank">Vedi Live</a>
                    </div>
                    <div class="project-item">
                        <h3>Progetto 2: Applicazione Mobile (Mockup)</h3>
                        <p>Design di UI/UX e prototipazione per un'applicazione di gestione delle attività.</p>
                        <p>Tecnologie: Figma, Principi di Design Mobile.</p>
                        <a href="#" target="_blank">Vedi Live</a>
                    </div>
                     <div class="project-item">
                        <h3>Progetto 3: Blog Personale</h3>
                        <p>Un blog semplice e responsivo per condividere pensieri e tutorial tecnici.</p>
                        <p>Tecnologie: HTML, CSS, JavaScript Vanilla.</p>
                        <a href="#" target="_blank">Vedi Live</a>
                    </div>
                </div>
            </div>
        `,
    contact: `
            <div class="section-content">
                <h2>Contattami</h2>
                <p>Sono disponibile per nuovi progetti e collaborazioni. Non esitare a contattarmi per discutere le tue idee o semplicemente per un saluto!</p>
                <p>Email: <a href="mailto:il.tuo.email@example.com">il.tuo.email@example.com</a></p>
                <p>LinkedIn: <a href="#" target="_blank">Il Mio Profilo LinkedIn</a></p>
                <p>GitHub: <a href="#" target="_blank">Il Mio Profilo GitHub</a></p>
                <p>Prenota una chiamata: <a href="https://calendly.com/devpritamdas/30min" target="_blank">Calendly (Esempio)</a></p>
            </div>
        `,
  };

  // Funzione per caricare il contenuto di una sezione
  function loadSection(sectionName) {
    const content = sectionsContent[sectionName] || sectionsContent.home; // Carica la sezione, o Home come fallback
    appContent.innerHTML = content; // Inietta l'HTML nella main area

    // Aggiorna la classe 'active' nella navbar
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.section === sectionName) {
        link.classList.add("active");
      }
    });

    // Aggiorna l'URL nella barra degli indirizzi senza ricaricare la pagina
    // Questo permette di usare i pulsanti Indietro/Avanti del browser e di condividere URL specifici
    history.pushState(null, "", `#${sectionName}`);

    // Scorre all'inizio del contenuto della sezione (simulazione smooth scroll)
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Se la sezione caricata contiene link con data-section (come il bottone "Vedi i miei progetti" nella Home)
    // dobbiamo ri-attaccare gli event listener per quei link.
    document.querySelectorAll("#app-content .nav-link").forEach((link) => {
      link.addEventListener("click", handleNavLinkClick);
    });
  }

  // Funzione per gestire il click sui link di navigazione
  function handleNavLinkClick(event) {
    event.preventDefault(); // Impedisce il comportamento di default del link (ricaricare la pagina o saltare all'ancora)
    const sectionToLoad = event.target.dataset.section;
    if (sectionToLoad) {
      loadSection(sectionToLoad);
    }
  }

  // Aggiungi un event listener ad ogni link di navigazione
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });

  // Gestisci la navigazione tramite i pulsanti Indietro/Avanti del browser
  window.addEventListener("popstate", () => {
    const sectionFromUrl = window.location.hash.substring(1) || "home";
    loadSection(sectionFromUrl);
  });

  // Carica la sezione iniziale al primo caricamento della pagina
  // Controlla se c'è un hash nell'URL (es. yoursite.com/#progetti)
  const initialSection = window.location.hash.substring(1) || "home";
  loadSection(initialSection);
});
