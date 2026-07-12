# NEXIA Systems — Web corporativa v1.2

Proyecto estático listo para producción. Sin dependencias, sin build.

## Estructura
```
nexia-web/
├── index.html        Home completa (HTML5 semántico, SEO, OG, Schema.org)
├── aviso-legal.html  Aviso Legal (LSSI-CE)
├── privacidad.html   Política de Privacidad (RGPD / LOPDGDD)
├── cookies.html      Política de Cookies
├── en/index.html     Home en inglés
├── ca/index.html     Home en catalán
├── css/styles.css    Sistema visual completo
├── js/main.js        Revelado al scroll + formulario (preparado para GoHighLevel)
├── assets/emy.jpg    Fotografía oficial (B/N, optimizada)
├── robots.txt        Indexación + referencia al sitemap
├── sitemap.xml       Mapa del sitio (4 URLs)
└── README.md
```

## Cómo verla
Abrir `index.html` en el navegador, o en VS Code con Live Server.

## Auditoría de CTAs (v1.1)
| CTA | Ubicación | Destino | Estado |
|---|---|---|---|
| Solicitar diagnóstico | Navegación | #contacto | Funciona |
| Solicitar un Diagnóstico Estratégico | Hero | #contacto | Funciona |
| Quiero entender mi empresa | Tras resultados | #contacto | Funciona |
| Solicitar un Diagnóstico Estratégico | Cierre | Despliega el formulario | Funciona |
| Enviar | Formulario | GoHighLevel (pendiente de webhook) | Documentado abajo |

## Conectar GoHighLevel
1. En GHL: Automations → Workflow → trigger **Inbound Webhook** → copiar la URL.
2. Pegarla en `js/main.js`, constante `GHL_ENDPOINT` (línea ~20).
3. Campos enviados (JSON): `full_name`, `company_name`, `email`, `phone`,
   `annual_revenue` (opcional), `message`, `source`, `page`.
4. Mientras `GHL_ENDPOINT` esté vacío, el formulario muestra la confirmación
   local y no envía datos a ningún sitio.
Incluye honeypot antispam (campo oculto `website`) y validación de email.

## Idiomas (ES · EN · CA)
- Multiidioma ACTIVO: `/` (español), `/en/` (inglés), `/ca/` (catalán).
- Selector funcional en nav y footer de todas las páginas; `hreflang`
  (incl. `x-default`) en las tres homes y en `sitemap.xml`.
- Las páginas legales se mantienen en español (idioma contractual).

## Widget flotante
- Botón fijo "Solicitar diagnóstico" que aparece al salir del hero y
  desaparece al llegar al cierre. Sin dependencias, definido en
  `styles.css` (bloque .dock) y `main.js` (sección 4).

## Antes de publicar
1. **Formulario**: pegar el webhook de GoHighLevel en `js/main.js`.
2. **Legales**: completar NIF y domicilio en `aviso-legal.html` y
   `privacidad.html` (marcados en turquesa). Revisión por asesoría legal
   recomendada antes de publicar.
3. **Logo oficial**: la cabecera usa un monograma SVG creado para la marca.
   Si existe un logotipo oficial en vectorial, sustituir el `<svg class="logo-mark">`
   de las cuatro páginas.
4. **Email**: el footer usa emy@nexiasystems.es; las páginas legales usan
   info@nexiasystems.es como canal de contacto y ejercicio de derechos.
   Unificar si procede.

## Despliegue
Cualquier hosting estático: Vercel, Netlify, Cloudflare Pages o servidor propio.
Subir la carpeta completa. Sin configuración adicional.
