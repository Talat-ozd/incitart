/**
 * İnciTart v2 – Scroll reveal & form handling
 * Vanilla JS, no dependencies
 */

(function () {
  "use strict";

  // ----- Scroll Reveal (Intersection Observer) -----
  const revealSelector = "[data-reveal]";
  const revealOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.15,
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

  function initReveal() {
    const elements = document.querySelectorAll(revealSelector);
    elements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // ----- Header scroll state -----
  const header = document.getElementById("main-header");
  if (header) {
    let lastScroll = 0;
    function onScroll() {
      const current = window.scrollY || document.documentElement.scrollTop;
      if (current > 80) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      lastScroll = current;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ----- Contact form -----
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');

      let valid = true;

      [nameInput, emailInput, messageInput].forEach(function (input) {
        if (!input) return;
        if (!input.value.trim()) {
          valid = false;
          input.setAttribute("aria-invalid", "true");
          input.style.borderColor = "#D21F3C";
        } else {
          input.removeAttribute("aria-invalid");
          input.style.borderColor = "";
        }
      });

      if (!valid) {
        return;
      }

      // Simulate submit (replace with real API call)
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Gönderiliyor…";

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Gönderildi";
        form.reset();
        setTimeout(function () {
          submitBtn.textContent = originalText;
        }, 2000);
      }, 800);
    });
  }

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ----- Products tabs: switch panel on tab click -----
  (function () {
    const tabs = document.querySelectorAll(".products__tab[data-products-tab]");
    const panels = document.querySelectorAll(".products__panel");
    if (!tabs.length || !panels.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        const targetId = "panel-" + tab.getAttribute("data-products-tab");
        tabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        panels.forEach(function (p) {
          p.classList.remove("is-active");
          p.hidden = true;
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        const panel = document.getElementById(targetId);
        if (panel) {
          panel.classList.add("is-active");
          panel.hidden = false;
        }
      });
    });
  })();

  // ----- Init -----
  initReveal();
})();
