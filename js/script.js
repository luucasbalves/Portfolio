/* ==========================================================================
   PORTFÓLIO ONE PAGE — SCRIPT JS
   Efeitos e comportamentos da página:
   1. Atualização dos links de WhatsApp em um único lugar
   2. Intersection Observer (Reveal on Scroll) para classes .reveal
   3. Preenchimento progressivo da "Linha de Costura" (.thread-spine__fill)
   4. Efeito do Header no scroll (.is-scrolled)
   5. Controle do botão flutuante do WhatsApp
   6. Efeito magnético suave nos botões CTA
   7. Ano dinâmico no Footer
   ========================================================================== */

// --------------------------------------------------------------------------
// CONFIGURAÇÕES GERAIS
// Edite apenas o número abaixo (com DDD, somente números)
// --------------------------------------------------------------------------
const WHATSAPP_NUMBER = "5547991724416"; 
const WHATSAPP_DEFAULT_MESSAGE = "Olá! Vim pelo seu site e gostaria de um orçamento para modernizar a minha empresa.";

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initScrollObserver();
  initThreadSpine();
  initHeaderAndFloatingBtn();
  initMagneticButtons();
  setCurrentYear();
});

/* --------------------------------------------------------------------------
   1. ATUALIZADOR GLOBAL DE LINKS DO WHATSAPP
   -------------------------------------------------------------------------- */
function initWhatsAppLinks() {
  const encodedMsg = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

  // Seleciona todos os botões marcados com a classe .js-whatsapp
  const waButtons = document.querySelectorAll(".js-whatsapp");
  waButtons.forEach((btn) => {
    btn.setAttribute("href", waUrl);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });
}

/* --------------------------------------------------------------------------
   2. REVEAL ON SCROLL (Intersection Observer)
   Aplica a classe .is-visible para revelar os elementos com fade/slide
   -------------------------------------------------------------------------- */
function initScrollObserver() {
  const reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    // Fallback caso o navegador seja muito antigo
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Deixa de observar o elemento após ser exibido
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach((el) => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   3. LINHA DE COSTURA (Acompanha a porcentagem do scroll da página)
   -------------------------------------------------------------------------- */
function initThreadSpine() {
  const threadFill = document.getElementById("threadFill");
  if (!threadFill) return;

  function updateThread() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight) * 100;
      threadFill.style.height = `${Math.min(100, Math.max(0, progress))}%`;
    }
  }

  window.addEventListener("scroll", updateThread, { passive: true });
  updateThread();
}

/* --------------------------------------------------------------------------
   4. EFEITOS NO HEADER E EXIBIÇÃO DO BOTÃO FLUTUANTE
   -------------------------------------------------------------------------- */
function initHeaderAndFloatingBtn() {
  const siteHeader = document.getElementById("siteHeader");
  const floatingWhatsapp = document.getElementById("floatingWhatsapp");

  function onScroll() {
    const scrollY = window.scrollY;

    // Header com fundo desfocado e compacto ao rolar
    if (siteHeader) {
      if (scrollY > 50) {
        siteHeader.classList.add("is-scrolled");
      } else {
        siteHeader.classList.remove("is-scrolled");
      }
    }

    // Exibe o botão flutuante após rolar a Hero section
    if (floatingWhatsapp) {
      if (scrollY > 350) {
        floatingWhatsapp.classList.add("is-visible");
      } else {
        floatingWhatsapp.classList.remove("is-visible");
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   5. EFEITO MAGNÉTICO NOS BOTÕES (Desktops com ponteiro fino)
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  // Executa o efeito apenas em dispositivos com suporte a hover preciso (mouse)
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const magneticBtns = document.querySelectorAll(".magnetic");

    magneticBtns.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Deslocamento suave do botão acompanhando o cursor
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px)";
      });
    });
  }
}

/* --------------------------------------------------------------------------
   6. ANO ATUAL DINÂMICO
   -------------------------------------------------------------------------- */
function setCurrentYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
