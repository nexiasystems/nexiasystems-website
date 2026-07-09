# NEXIA Systems — Web corporativa v1.0

Proyecto estático listo para producción. Sin dependencias, sin build.

## Estructura
```
nexia-web/
├── index.html        Página completa (HTML5 semántico, SEO, OG, Schema.org)
├── css/styles.css    Sistema visual completo
├── js/main.js        Revelado al scroll + formulario de diagnóstico
├── assets/emy.jpg    Fotografía oficial (B/N, optimizada)
└── README.md
```

## Cómo verla
Abrir `index.html` en el navegador, o en VS Code con la extensión Live Server.

## Antes de publicar
1. **Formulario**: conectar el envío real en `js/main.js` (bloque "CONEXIÓN DE ENVÍO").
2. **Dominio**: sustituir `https://nexiasystems.com/` en `index.html` (canonical, OG, Schema) por el dominio real.
3. **LinkedIn**: poner la URL real del perfil en el footer.
4. **Legales**: crear `aviso-legal.html` y `privacidad.html` (enlazadas en el footer).
5. **Idiomas**: descomentar los `hreflang` de `index.html` cuando existan `/en/` y `/ca/`.

## Despliegue
Cualquier hosting estático: Vercel, Netlify, Cloudflare Pages o un servidor propio.
Arrastrar la carpeta o `vercel deploy` / `netlify deploy`. Sin configuración adicional.
