/**
 * İncitart Landing Page – Vanilla JS
 * - Intersection Observer: reveal on scroll
 * - Navbar: solid background on scroll
 * - Menu tabs: switch panel on click
 * - Form: prevent default, show feedback
 */

(function () {
  'use strict';

  // ----- Navbar: add .scrolled when user has scrolled -----
  const nav = document.getElementById('main-nav');
  if (nav) {
    const onScroll = function () {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  // ----- Intersection Observer: reveal on scroll -----
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ----- Menu tabs: switch panel on tab click -----
  (function () {
    var tabs = document.querySelectorAll('.menu__tab[data-menu-tab]');
    var panels = document.querySelectorAll('.menu__panel');
    if (!tabs.length || !panels.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var targetId = 'panel-' + tab.getAttribute('data-menu-tab');
        tabs.forEach(function (t) {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(function (p) {
          p.classList.remove('is-active');
          p.hidden = true;
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        var panel = document.getElementById(targetId);
        if (panel) {
          panel.classList.add('is-active');
          panel.hidden = false;
        }
      });
    });
  })();

  // ----- Inquiry form: prevent default, show feedback -----
  const form = document.getElementById('inquiry-form');
  const feedbackEl = document.getElementById('form-feedback');
  if (form && feedbackEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      feedbackEl.hidden = false;
      feedbackEl.className = 'contact__form-feedback';
      if (!form.checkValidity()) {
        feedbackEl.textContent = 'Lütfen tüm alanları doğru şekilde doldurun.';
        feedbackEl.classList.add('error');
        return;
      }
      // Design site: no backend – show success message only
      feedbackEl.textContent = 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.';
      feedbackEl.classList.add('success');
      form.reset();
    });
  }
})();
