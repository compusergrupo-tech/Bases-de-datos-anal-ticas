
# MEGA PROMPT ENVT-PRO — Generador Universal de Sitios Web Premium (HTML/CSS/JS + CDNs)
**Versión**: 1.0  
**Diseñado para**: Cualquier IA generadora de código (ChatGPT, Gemini, Claude, etc.)  
**Salida esperada**: Código **HTML + CSS + JavaScript** puro, usando **CDNs** para librerías (Tailwind, GSAP, Swiper, AOS, FontAwesome, GLightbox, Lenis, etc.).  
**Idiomas**: Multilenguaje (ES / EN) — el prompt generará contenido en el/los idioma(s) solicitados.  
**Modo de selección**: Automático (detecta el tipo de sitio a partir del tema) + opción para que el usuario indique tipo y paleta de colores.

---

## Instrucciones de uso (rápido)
1. Pega el **Mega Prompt** (debajo) en tu IA favorita.  
2. Responde cuando la IA pregunte:  
   - **Nombre o tema del sitio:** (ej.: "Restaurante Mediterráneo Moderno")  
   - **Idiomas:** (ej.: "es", "en", o "es,en")  
   - **Modo:** "auto" (la IA selecciona tipo y paleta) o "manual" (tú indicas tipo y paleta)  
   - **Si manual:** tipo de sitio (corporativo, portfolio, eCommerce, SaaS, restaurante, clínica, inmobiliaria, etc.) y paleta HEX (3 colores separados por comas, ej.: `#0E0E10,#00FFFF,#8A2BE2`)  
3. La IA debe devolver **un único bloque en Markdown** con:  
   - Resumen del sitio (concepto, audiencia, tono).  
   - Stack y CDNs a usar.  
   - Estructura de archivos.  
   - Prompts secundarios por cada página (Home, About, Services, Gallery, Contact), cada página con **10 secciones** y **prompts listos** para generar HTML/CSS/JS.  
   - Textos de ejemplo (hero, servicios, about, testimonios, team bios, FAQs, metadatos SEO) en los idiomas solicitados.  
   - URLs sugeridas de imágenes (Unsplash / Pexels / Pixabay) — 2 opciones por sección.  
   - Snippets de código iniciales (ej. header nav con CDN links, hero section, init de Swiper y GSAP).  
   - Checklist de QA, SEO, accesibilidad y pasos de deploy.  

---

## MEGA PROMPT (Cópialo entero y pégalo en la IA)

> Actúa como un **arquitecto de producto web premium** (diseñador UX/UI + redactor + front-end dev) capaz de entregar **código HTML/CSS/JS puro** listo para producción. Responderás siempre en **Markdown** y entregarás todo en un único bloque organizado.
> 
> **Fase 1 — Preguntas iniciales (tú, IA)**:  
> - Solicita al usuario (en una sola línea, sin más explicación):  
>   1. "Nombre o tema del sitio:"  
>   2. "Idiomas (ej.: es, en, es,en):"  
>   3. "Modo (auto/manual):"  
>   4. "Si manual -> Tipo de sitio (ej.: corporativo, restaurante, portfolio, SaaS, inmobiliaria):"  
>   5. "Si manual -> Paleta HEX (3 colores separados por comas) o escribe 'auto' para que yo sugiera:"  
> 
> **Fase 2 — Generación completa (tras recibir respuestas)**:  
> Al recibir el nombre/tema y las opciones, genera **todo lo siguiente** en el mismo documento Markdown:
> 
> ### A) Resumen creativo del sitio
> - Nombre final (usar el nombre provisto).  
> - Tipo (si modo=auto, elige el tipo óptimo según el tema).  
> - Audiencia objetivo (3 bullets).  
> - Propuesta de valor (1 frase).  
> - Tono de marca (ej.: profesional, cálido, tecnológico).  
> 
> ### B) Paleta, tipografías y assets
> - Paleta HEX (3 colores primario/acento/fondo) — si el usuario escribió 'auto', sugiere según psicología del color para el tema.  
> - Tipografías Google Fonts (títulos y cuerpo con enlaces).  
> - Icon set sugerido (Remixicon / Tabler / FontAwesome).  
> 
> ### C) Stack y CDNs (lista exacta de `<link>` / `<script>` a incluir)
> - Tailwind via CDN (o CSS base si prefieres SCSS).  
> - GSAP (CDN).  
> - Swiper.js (CSS + JS CDNs).  
> - AOS (CSS + JS).  
> - GLightbox / Fancybox (para gallery).  
> - Lenis o small smoothscroll lib (CDN).  
> - Font Awesome (CDN) o SVG inline recomendación.  
> - Ejemplo de bloque HEAD con meta tags básicos y Open Graph (i18n-ready).
> 
> ### D) Estructura de archivos (breve)
> - Mostrar árbol de carpetas recomendado con `index.html`, `about.html`, `services.html`, `gallery.html`, `contact.html`, `/assets/{css,js,img}`.
> 
> ### E) PÁGINAS: Prompts y contenido (por cada página: Home, About Us, Services, Gallery, Contact)
> - **Para cada una** genera:
>   1. Un prompt técnico detallado (listo para pegar) que pida a la IA crear la página en **HTML/CSS/JS** usando CDNs indicados, animaciones GSAP/AOS, Swiper, GLightbox, y totalmente responsive.  
>   2. **10 secciones** enumeradas con: título de sección, propósito, elementos que debe contener (campos, CTAs, tipos de imagen), microinteracciones recomendadas (hover, reveal, counters), y texto de ejemplo (en los idiomas solicitados) listo para pegar.  
>   3. 2 URLs sugeridas por sección desde Unsplash/Pexels (formato: `https://unsplash.com/photos/<id>` o `https://www.pexels.com/photo/<id>/`) que encajen con la sección.  
> 
> ### F) Contenido de muestra (textos)
> - Genera contenidos completos (hero, subtítulos, párrafos, bullets, testimonios, bios, FAQs, metadescripciones, titles) en los idiomas solicitados.  
> - Incluye `meta title`, `meta description`, `og:title`, `og:description`, `og:image` (usar una de las imágenes sugeridas).
> 
> ### G) Snippets de código listos
> - Header con nav responsive y CDNs en `<head>`.  
> - Hero HTML + Tailwind classes (o CSS clásico si el usuario lo prefiere).  
> - JS init: Swiper init, GSAP ScrollTrigger example, AOS.init(), Lenis smoothscroll init, GLightbox init.  
> - Ejemplo de formulario contact POST con validación JS mínima y `aria` attributes.
> 
> ### H) Imágenes y licencias
> - Para cada imagen sugerida incluye: URL de vista, palabra clave para búsqueda, y nota de licencia (Unsplash/Pexels: libre para uso comercial, verificar atribución según caso).  
> 
> ### I) Checklist final de QA antes de publicar
> - SEO: titles, descriptions, robots, sitemap.  
> - Accesibilidad: roles ARIA, contrast ratio, keyboard nav.  
> - Rendimiento: lazy-load, WebP, preload fonts, Lighthouse target >= 90.  
> - Legal: imágenes con licencia, fonts con uso comercial.  
> - Deploy steps en Netlify/Vercel con comandos básicos.
> 
> ### J) Instrucciones opcionales para pedir código completo
> - Añade una sección final con un prompt adicional que el usuario pueda pegar para pedir **"Genera todos los archivos .html, .css y .js usando los CDNs listados y las imágenes sugeridas, comprímelos en un .zip y dame el manifest con rutas."**
> 
> **Formato de entrega:**  
> - Todo en **Markdown**.  
> - Usa subtítulos y listas con numeración clara.  
> - Entrega también un bloque final **"COPY & PASTE PROMPT"** que contenga un único prompt listo para ejecutar en otra IA para obtener los archivos.  
> 
> **Reglas adicionales:**  
> - Si el usuario pidió múltiples idiomas, entrega textos en ambos idiomas y añade `hreflang` y metatags para i18n.  
> - Las 10 secciones por página deben ser variadas (ej: hero, features, portfolio, testimonials, CTA, pricing, FAQ, team, timeline, blog feed).  
> - Prioriza claridad semántica, clases legibles y atributos `aria` donde aplique.  
> - Para selección de imágenes, provee al menos 2 opciones por sección; si no hay coincidencias exactas, sugiere keywords de búsqueda precisas.
> 
> **Inicio del proceso**: luego de pegar este mega prompt en la IA, espera a que pregunte las 5 respuestas iniciales solicitadas. Cuando el usuario las entregue, procede con la generación completa en un solo bloque Markdown.
> 
> ---  
> **Fin del Mega Prompt.**
