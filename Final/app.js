// ====================================
// MENÚ MÓVIL
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Cambiar icono del menú
      const icon = navToggle.querySelector('span');
      if (icon) {
        icon.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
      }
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('span');
        if (icon) icon.textContent = '☰';
      });
    });
  }
});

// ====================================
// MARCAR PÁGINA ACTIVA EN NAVEGACIÓN
// ====================================
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveNav);

// ====================================
// ANIMACIONES AL SCROLL
// ====================================
function animateOnScroll() {
  const elements = document.querySelectorAll('.card, .stat-box, .timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

document.addEventListener('DOMContentLoaded', animateOnScroll);

// ====================================
// CONTADOR ANIMADO (para estadísticas)
// ====================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = Math.floor(target).toLocaleString('es-AR');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString('es-AR');
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        entry.target.classList.add('counted');
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', initCounters);

// ====================================
// FILTROS DE PROYECTOS
// ====================================
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remover clase active de todos los botones
      filterBtns.forEach(b => b.classList.remove('active'));
      // Agregar clase active al botón clickeado
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initProjectFilters);

// ====================================
// CALCULADORA DE IMPACTO
// ====================================
function initImpactCalculator() {
  const calcForm = document.getElementById('impact-calculator-form');
  
  if (!calcForm) return;

  calcForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const donation = parseFloat(document.getElementById('donation-amount').value);
    const resultDiv = document.getElementById('impact-result');
    
    if (isNaN(donation) || donation <= 0) {
      resultDiv.innerHTML = '<p style="color: red;">Por favor ingresa un monto válido</p>';
      return;
    }

    // Cálculos de impacto (valores aproximados)
    const treesPlanted = Math.floor(donation / 500);
    const co2Absorbed = Math.floor(treesPlanted * 22); // kg de CO2 por árbol/año
    const m2Restored = Math.floor(donation / 100);

    resultDiv.innerHTML = `
      <div class="impact-results">
        <h3 style="color: var(--verde-bosque); margin-bottom: 1.5rem;">Tu impacto estimado:</h3>
        <div class="stats-container">
          <div class="stat-box">
            <div class="stat-number" style="color: var(--verde-bosque);">🌳 ${treesPlanted}</div>
            <div class="stat-label">Árboles nativos</div>
          </div>
          <div class="stat-box">
            <div class="stat-number" style="color: var(--verde-bosque);">💨 ${co2Absorbed} kg</div>
            <div class="stat-label">CO₂ absorbido/año</div>
          </div>
          <div class="stat-box">
            <div class="stat-number" style="color: var(--verde-bosque);">🌿 ${m2Restored} m²</div>
            <div class="stat-label">Área restaurada</div>
          </div>
        </div>
        <p style="text-align: center; margin-top: 2rem; font-size: 1.1rem;">
          Con tu aporte de <strong>$${donation.toLocaleString('es-AR')}</strong>, 
          estarás contribuyendo a restaurar el equilibrio de nuestros espacios urbanos.
        </p>
      </div>
    `;
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

document.addEventListener('DOMContentLoaded', initImpactCalculator);

// ====================================
// VALIDACIÓN DE FORMULARIOS
// ====================================
function validateForm(formId) {
  const form = document.getElementById(formId);
  
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = 'red';
        
        setTimeout(() => {
          input.style.borderColor = '';
        }, 3000);
      }
    });

    if (isValid) {
      // Mostrar mensaje de éxito
      const successMsg = document.createElement('div');
      successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--verde-bosque);
        color: white;
        padding: 2rem 3rem;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        font-size: 1.2rem;
      `;
      successMsg.innerHTML = '✓ ¡Formulario enviado exitosamente!<br><small>Nos pondremos en contacto pronto.</small>';
      document.body.appendChild(successMsg);

      setTimeout(() => {
        successMsg.remove();
        form.reset();
      }, 3000);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  validateForm('contact-form');
  validateForm('volunteer-form');
  validateForm('donation-form');
});

// ====================================
// GALERÍA DE IMÁGENES (LIGHTBOX SIMPLE)
// ====================================
function initGallery() {
  const galleryImages = document.querySelectorAll('.gallery-image');
  
  if (galleryImages.length === 0) return;

  galleryImages.forEach(img => {
    img.style.cursor = 'pointer';
    
    img.addEventListener('click', function() {
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        padding: 2rem;
      `;
      
      const imgClone = this.cloneNode();
      imgClone.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0,0,0,0.5);
      `;
      
      lightbox.appendChild(imgClone);
      document.body.appendChild(lightbox);
      
      lightbox.addEventListener('click', () => lightbox.remove());
    });
  });
}

document.addEventListener('DOMContentLoaded', initGallery);

// ====================================
// SCROLL SUAVE PARA ANCLAS
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href !== '#' && href.length > 1) {
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});