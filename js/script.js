AOS.init({
  duration: 900,
  once: true
});

// Formulario de contacto
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !correo || !mensaje) {
      alert("Por favor completa todos los campos.");
      return;
    }

    alert("Mensaje enviado correctamente. Esta es una simulación frontend.");
    contactForm.reset();
  });
}

// Sistema de galería 
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");
const closeModal = document.querySelector(".close-modal");
const images = document.querySelectorAll(".gallery-img");
const prevBtn = document.querySelector(".modal-prev");
const nextBtn = document.querySelector(".modal-next");

let currentImageIndex = 0;
let currentImages = [];

const allImages = Array.from(images);

//clic para abrir modal en la imagen
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    // Obtener todas las imágenes del mismo álbum
    const album = img.dataset.album;
    if (album) {
      currentImages = allImages.filter(i => i.dataset.album === album);
      currentImageIndex = currentImages.indexOf(img);
    } else {
      currentImages = allImages;
      currentImageIndex = index;
    }
    
    showImage(currentImageIndex);
    modal.style.display = "flex";
  });
});

// mostrar imagen
function showImage(index) {
  if (currentImages.length === 0) return;
  
  const img = currentImages[index];
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  
  // Caption
  if (modalCaption) {
    modalCaption.textContent = img.alt || `Imagen ${index + 1} de ${currentImages.length}`;
  }
}

// Navegación anterior
if (prevBtn) {
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentImageIndex);
  });
}

// Navegación siguiente
if (nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    showImage(currentImageIndex);
  });
}

// Cerrar modal
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowLeft") {
      currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
      showImage(currentImageIndex);
    } else if (e.key === "ArrowRight") {
      currentImageIndex = (currentImageIndex + 1) % currentImages.length;
      showImage(currentImageIndex);
    } else if (e.key === "Escape") {
      modal.style.display = "none";
    }
  }
});

// Animaciones 
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroShapes = document.querySelectorAll('.hero-shape');
  
  heroShapes.forEach((shape, index) => {
    const speed = index === 0 ? 0.5 : 0.3;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Cerrar menú móvil solo si está abierto sino pues no se necesita
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    }
  });
});
