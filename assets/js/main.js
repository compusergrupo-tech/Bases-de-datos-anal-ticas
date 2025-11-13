// assets/js/main.js

document.addEventListener('DOMContentLoaded', function () {
  // --- INICIALIZACIÓN DE LIBRERÍAS ---

  // 1. AOS (Animate On Scroll)
  // Anima los elementos cuando aparecen en el viewport.
  try {
    AOS.init({
      duration: 800, // Duración de la animación en ms
      once: true,    // La animación ocurre solo una vez
      offset: 50,    // Margen para disparar la animación antes de que el elemento sea visible
    });
  } catch (e) {
    console.error('Error inicializando AOS:', e);
  }

  // 2. Swiper.js (Carruseles)
  // Para el carrusel de contenido destacado.
  try {
    const swiper = new Swiper('.swiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }
    });
  } catch (e) {
    console.error('Error inicializando Swiper:', e);
  }

  // 3. GLightbox (Galerías de Imágenes y Videos)
  // Para las galerías de recursos.
  try {
    const lightbox = GLightbox({
      selector: '.glightbox'
    });
  } catch (e) {
    console.error('Error inicializando GLightbox:', e);
  }

  // 4. Lenis (Smooth Scroll)
  // Mejora la experiencia de navegación con un scroll suave.
  try {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (e) {
    console.error('Error inicializando Lenis:', e);
  }

  // 5. GSAP (GreenSock Animation Platform)
  // Para animaciones complejas como los contadores numéricos.
  try {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.counter').forEach(counter => {
      const target = +counter.getAttribute('data-target');
      gsap.from(counter, {
        textContent: 0,
        duration: 2.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: counter,
          start: 'top bottom-=100', // Inicia la animación cuando el elemento está a 100px del fondo
          toggleActions: 'play none none none',
        },
        onUpdate: function() {
            counter.textContent = Math.ceil(this.targets()[0].textContent);
        }
      });
    });
  } catch (e) {
    console.error('Error inicializando GSAP:', e);
  }

  // --- LÓGICA PERSONALIZADA ---

  // Menú de navegación móvil
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Formulario de contacto (validación simple)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Aquí iría la lógica de envío (ej. fetch a una API)
      // Por ahora, solo mostramos un mensaje de éxito.
      const formContainer = this.parentNode;
      formContainer.innerHTML = `
        <div class="text-center p-8 border-2 border-dashed border-green-300 bg-green-50 rounded-lg">
          <h3 class="text-2xl font-bold text-green-800">¡Gracias por tu mensaje!</h3>
          <p class="mt-2 text-green-700">Nos pondremos en contacto contigo pronto.</p>
        </div>
      `;
    });
  }
});
