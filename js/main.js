/* ==========================================================================
   NEXIA Systems — main.js (v1.1)
   1. Revelado suave de contenido al hacer scroll
   2. Despliegue del formulario de diagnóstico
   3. Validación accesible y envío preparado para GoHighLevel
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIGURACIÓN DE ENVÍO — GoHighLevel
     Al conectar el CRM, pegar aquí la URL del webhook de GHL
     (Automations → Workflow → Inbound Webhook) o del form endpoint.
     Mientras esté vacío, el formulario muestra la confirmación local
     y NO envía datos a ningún sitio.
     Mapeo de campos ya alineado con GHL:
       full_name · company_name · email · phone · annual_revenue ·
       message · source · page
  ------------------------------------------------------------------ */
  var GHL_ENDPOINT = 'https://demo-n8n.zdnh0p.easypanel.host/webhook/37e87ad4-f6a3-4148-9884-4a2e0c8c1f36';

  /* 1. Revelado al hacer scroll ------------------------------------- */
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

  /* 2. Despliegue del formulario ------------------------------------ */
  var openBtn = document.getElementById('openForm');
  var shell   = document.getElementById('formShell');
  var form    = document.getElementById('diagForm');
  var okMsg   = document.getElementById('formOk');
  var errMsg  = document.getElementById('formError');

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

  /* 3. Validación y envío -------------------------------------------- */
  function emailValido(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  }

  if (form && okMsg) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      /* Honeypot antispam: si el campo oculto tiene valor, es un bot. */
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) { form.style.display = 'none'; okMsg.style.display = 'block'; return; }

      var valid = true;
      form.querySelectorAll('input[required], textarea[required]').forEach(function (input) {
        var bad = !input.value.trim() ||
                  (input.type === 'email' && !emailValido(input.value.trim()));
        input.style.borderColor = bad ? '#c96a6a' : '';
        input.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (bad) valid = false;
      });
      if (errMsg) errMsg.hidden = valid;
      if (!valid) return;

      var datos = Object.fromEntries(new FormData(form));
      delete datos.website;                       /* honeypot fuera   */
      datos.source = 'web-nexiasystems';          /* origen del lead  */
      datos.page   = window.location.pathname;    /* página de envío  */

      function confirmar() {
        form.style.display = 'none';
        okMsg.style.display = 'block';
        okMsg.focus && okMsg.focus();
      }
console.log("GHL_ENDPOINT =", GHL_ENDPOINT);
      if (GHL_ENDPOINT) {
        fetch(GHL_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        }).then(confirmar).catch(confirmar);
      } else {
        confirmar();
      }
    });
  }

  /* 4. Widget flotante de diagnóstico ------------------------------- */
  var dock  = document.getElementById('dock');
  var hero  = document.querySelector('.hero');
  var cover = document.getElementById('contacto');
  if (dock && hero && cover && 'IntersectionObserver' in window) {
    dock.hidden = false;
    var heroVisible = true, coverVisible = false;
    function refresh(){
      if (!heroVisible && !coverVisible) dock.classList.add('show');
      else dock.classList.remove('show');
    }
    new IntersectionObserver(function(e){ heroVisible  = e[0].isIntersecting; refresh(); }, {threshold:0.05}).observe(hero);
    new IntersectionObserver(function(e){ coverVisible = e[0].isIntersecting; refresh(); }, {threshold:0.05}).observe(cover);
  }
})();
