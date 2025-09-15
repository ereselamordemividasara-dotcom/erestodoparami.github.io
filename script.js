// Referencias
const overlay = document.getElementById("overlay");
const heartBtn = document.getElementById("heartBtn");
const closeBtn = document.getElementById("closeBtn");
const typedEl = document.getElementById("typed");
const dedicatoriaEl = document.getElementById("typedDedicatoria");
const sigEl = document.getElementById("sig");
const confettiCanvas = document.getElementById("confetti");
const bgMusic = document.getElementById("bgMusic");

// Mensajes
const mensaje = "Desde que entraste en mi vida, los días tienen más color, las noches más estrellas y mi corazón más motivos para sonreír. ❤️";
const dedicatoria = "Esta tarjeta es solo un reflejo de lo mucho que significas para mí.\nEres mi inspiración, mi alegría y mi razón de soñar cada día.\nGracias por existir y llenar mi vida de magia. 💖";
const firma = "- Con todo mi amor";

// Efecto máquina de escribir
let typewriterTimers = [];

function runTypewriter(el, text, speed = 50, callback) {
  el.textContent = "";
  let i = 0;

  // Limpiar timers anteriores
  typewriterTimers.forEach(t => clearTimeout(t));
  typewriterTimers = [];

  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      const t = setTimeout(type, speed);
      typewriterTimers.push(t);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// Confeti
let confettiAnimation;

function startConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  const width = confettiCanvas.width;
  const height = confettiCanvas.height;

  const confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 0.5 + 0.5,
      color: `hsl(${Math.random() * 360},100%,50%)`
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let f of confetti) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI);
      ctx.fillStyle = f.color;
      ctx.fill();
      f.y += f.d * 4;
      if (f.y > height) f.y = 0;
    }
    confettiAnimation = requestAnimationFrame(draw);
  }

  cancelAnimationFrame(confettiAnimation);
  draw();
}

function stopConfetti() {
  cancelAnimationFrame(confettiAnimation);
  const ctx = confettiCanvas.getContext("2d");
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

// Abrir overlay
heartBtn.addEventListener("click", () => {
  // Limpiar textos y timers previos
  typedEl.textContent = "";
  dedicatoriaEl.textContent = "";
  sigEl.textContent = "";
  typewriterTimers.forEach(t => clearTimeout(t));
  typewriterTimers = [];

  // Reiniciar música
  bgMusic.pause();
  bgMusic.currentTime = 0;

  // Abrir overlay
  overlay.classList.add("open");

  // Reproducir música
  bgMusic.play();

  // Iniciar confeti
  startConfetti();

  // Iniciar máquina de escribir
  runTypewriter(typedEl, mensaje, 65, () => {
    runTypewriter(dedicatoriaEl, dedicatoria, 60, () => {
      runTypewriter(sigEl, firma, 70);
    });
  });
});

// Cerrar overlay
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("open");

  // Detener música
  bgMusic.pause();
  bgMusic.currentTime = 0;

  // Detener confeti
  stopConfetti();

  // Limpiar timers
  typewriterTimers.forEach(t => clearTimeout(t));
  typewriterTimers = [];
});

// Carrusel infinito fluido (sin saltos)
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 1; 
let autoSlide;
const interval = 4000;

// Clonar primera y última imagen
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slides.appendChild(firstClone);
slides.insertBefore(lastClone, slides.firstChild);

// Recontar imágenes con clones
const slideImages = document.querySelectorAll('.slides img');
const totalSlides = slideImages.length;

// Colocar inicio en la primera imagen real
slides.style.transform = `translateX(${-index * 100}%)`;

// Función mostrar slide
function showSlide() {
  slides.style.transition = "transform 0.6s ease";
  slides.style.transform = `translateX(${-index * 100}%)`;
}

// Reset al llegar a clon
slides.addEventListener("transitionend", () => {
  const current = slideImages[index];
  if (current.id === "first-clone") {
    slides.style.transition = "none";
    index = 1;
    slides.style.transform = `translateX(${-index * 100}%)`;
  }
  if (current.id === "last-clone") {
    slides.style.transition = "none";
    index = totalSlides - 2;
    slides.style.transform = `translateX(${-index * 100}%)`;
  }
});

// Botones
nextBtn.addEventListener("click", () => {
  if (index >= totalSlides - 1) return;
  index++;
  showSlide();
});

prevBtn.addEventListener("click", () => {
  if (index <= 0) return;
  index--;
  showSlide();
});

// Auto slide infinito
function startAutoSlide() {
  autoSlide = setInterval(() => {
    index++;
    showSlide();
  }, interval);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Pausar auto slide con hover
slides.addEventListener("mouseenter", stopAutoSlide);
slides.addEventListener("mouseleave", startAutoSlide);

// Iniciar carrusel
startAutoSlide();
