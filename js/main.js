/* ==========================================================================
   NEXIA Systems — main.js
   1. Revelado suave de contenido al hacer scroll (IntersectionObserver)
   2. Despliegue del formulario de diagnóstico en la pantalla de cierre
   3. Validación mínima y confirmación
   NOTA: el envío real del formulario debe conectarse en el punto marcado
   con "CONEXIÓN DE ENVÍO" (endpoint propio, Formspree, Make, CRM, etc.)
   ========================================================================== */

(function () {
  'use strict';

  /* 1. Revelado al hacer scroll ------------------------------------------ */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.rv').forEach(function (el) {
    observer.observe(el);
  });

  /* 2. Formulario de diagnóstico ----------------------------------------- */
  var openBtn = document.getElementById('openForm');
  var shell   = document.getElementById('formShell');
  var form    = document.getElementById('diagForm');
  var okMsg   = document.getElementById('formOk');

  if (openBtn && shell) {
    openBtn.addEventListener('click', function () {
      shell.classList.add('open');
      openBtn.style.display = 'none';
      setTimeout(function () {
        var first = document.getElementById('f1');
        if (first) first.focus();
      }, 400);
    });
  }

  /* 3. Validación y confirmación ------------------------------------------ */
  if (form && okMsg) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      var valid = true;
      form.querySelectorAll('input').forEach(function (input) {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#a04040';
        } else {
          input.style.borderColor = '';
        }
      });
      if (!valid) return;

      /* --- CONEXIÓN DE ENVÍO -------------------------------------------
         Sustituir este bloque por el envío real, por ejemplo:

         fetch('https://TU-ENDPOINT', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(Object.fromEntries(new FormData(form)))
         }).then(function () { ... });
      ------------------------------------------------------------------- */

      form.style.display = 'none';
      okMsg.style.display = 'block';
    });
  }
})();
