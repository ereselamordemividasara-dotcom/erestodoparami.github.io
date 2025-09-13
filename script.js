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

// Carrusel
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

function showSlide(i) {
  index = (i + images.length) % images.length;
  slides.style.transform = `translateX(${-index * 100}%)`;
}

prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// Auto slide cada 4s
setInterval(() => showSlide(index + 1), 4000);

showSlide(0);
