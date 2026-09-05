/* === HENRIQUE JUDSON — Scroll-Driven Video + Landing Page ===
   Original canvas logic preserved 100%.
   Landing page revealed only after last frame is held.
============================================================= */

const canvas = document.getElementById('video-canvas');
const ctx = canvas.getContext('2d');
const videoSection = document.getElementById('video-section');
const landingPage = document.getElementById('landing-page');
const navbar = document.getElementById('navbar');

const scrollCards = document.querySelectorAll('.scroll-card');
const endBanner = document.getElementById('video-end-banner');


let frameCount = 0;
const images = [];
let imagesLoaded = 0;
let videoComplete = false;

// ── Pixels per frame (controls scroll "speed" of animation)
// We use 8px per frame → total scroll = frameCount * 8
const PX_PER_FRAME = 8;

// ── Set initial canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ── Preload all frames (original logic, unchanged)
function preloadImages() {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    const idx = String(i).padStart(4, '0');
    img.src = `frames/frame_${idx}.webp`;
    images.push(img);

    img.onload = () => {
      imagesLoaded++;

      // Draw first frame immediately on first load
      if (imagesLoaded === 1) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
      }
    };
  }
}

// ── Draw a specific frame index (clamped, original logic)
function drawFrame(index) {
  const i = Math.min(frameCount - 1, Math.max(0, index));
  const img = images[i];
  if (img && img.complete && img.naturalWidth > 0) {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}

// ── Scroll handler (original logic + landing page reveal)
let rafId = null;

window.addEventListener('scroll', () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;

    const scrollTop = document.documentElement.scrollTop;
    const videoScrollHeight = videoSection.offsetHeight - window.innerHeight;

    if (scrollTop <= videoScrollHeight) {
      // ── Video section: map scroll → frame
      const scrollFraction = scrollTop / videoScrollHeight;
      const frameIndex = Math.floor(scrollFraction * frameCount);
      drawFrame(frameIndex);

      // ── Animate scroll cards based on scroll fraction
      scrollCards.forEach(card => {
        const start = parseFloat(card.dataset.start);
        const end = parseFloat(card.dataset.end);
        if (scrollFraction >= start && scrollFraction <= end) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      // ── Show end banner near the very end of scroll
      if (scrollFraction >= 0.92) {
         endBanner.classList.add('visible');
      } else {
         endBanner.classList.remove('visible');
      }

      // ── Check if we've reached the last frame zone (last 10px of scroll)
      if (!videoComplete && scrollTop >= videoScrollHeight - 10) {
        drawFrame(frameCount - 1); // hold last frame
        revealLandingPage();
      }
    } else {
      // ── Past video section: hold last frame, landing page is visible
      drawFrame(frameCount - 1);

      if (!videoComplete) {
        revealLandingPage();
      }

      // ── Navbar scrolled style
      navbar.classList.add('scrolled');
    }

    // ── Remove navbar scrolled style when near top of landing
    if (scrollTop < videoScrollHeight + 100) {
      navbar.classList.remove('scrolled');
    }
  });
});

// ── Reveal landing page and navbar after video completes
function revealLandingPage() {
  if (videoComplete) return;
  videoComplete = true;

  // Small delay to let last frame "breathe"
  setTimeout(() => {
    landingPage.classList.add('visible');
    navbar.classList.add('visible');

    // Trigger scroll reveals for all .reveal elements
    initRevealObserver();
  }, 300);
}

// ── IntersectionObserver for .reveal elements
function initRevealObserver() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => observer.observe(el));
}

// ── Custom cursor
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-card, .bento-card, .gallery-item').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(2.5)';
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'rgba(201,152,114,0.9)';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(201,152,114,0.6)';
  });
});

// ── Grid cursor canvas (ambient)
const gridCanvas = document.getElementById('cursor-grid-canvas');
const gctx = gridCanvas.getContext('2d');
gridCanvas.width = window.innerWidth;
gridCanvas.height = window.innerHeight;

let gmx = window.innerWidth / 2;
let gmy = window.innerHeight / 2;
document.addEventListener('mousemove', (e) => { gmx = e.clientX; gmy = e.clientY; });

function drawGrid() {
  gctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
  const cols = 16;
  const rows = 10;
  const cw = gridCanvas.width / cols;
  const ch = gridCanvas.height / rows;

  for (let c = 0; c <= cols; c++) {
    for (let r = 0; r <= rows; r++) {
      const x = c * cw;
      const y = r * ch;
      const dist = Math.sqrt((x - gmx) ** 2 + (y - gmy) ** 2);
      const radius = 200;
      const alpha = Math.max(0, 0.12 - (dist / radius) * 0.12);
      if (alpha > 0) {
        gctx.beginPath();
        gctx.arc(x, y, 1.5, 0, Math.PI * 2);
        gctx.fillStyle = `rgba(201, 152, 114, ${alpha})`;
        gctx.fill();
      }
    }
  }
  requestAnimationFrame(drawGrid);
}
drawGrid();

window.addEventListener('resize', () => {
  gridCanvas.width = window.innerWidth;
  gridCanvas.height = window.innerHeight;
});

// ── Drift wall animation: duplicate content for seamless loop
document.querySelectorAll('.drift-track').forEach((track) => {
  const clone = track.innerHTML;
  track.innerHTML += clone; // duplicate for seamless loop
});

// ── Navbar scroll handler
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  if (scrollTop > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Load info.json and start
fetch('info.json')
  .then((res) => res.json())
  .then((data) => {
    frameCount = data.frameCount || 462;

    // Set video section height dynamically based on real frame count
    videoSection.style.height = (frameCount * PX_PER_FRAME) + window.innerHeight + 'px';

    preloadImages();
  })
  .catch((err) => {
    console.error('Error loading info.json:', err);
    // Fallback
    frameCount = 462;
    videoSection.style.height = (frameCount * PX_PER_FRAME) + window.innerHeight + 'px';
    preloadImages();
  });

window.addEventListener('resize', () => {
  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    // Redraw current frame on resize
    const scrollTop = document.documentElement.scrollTop;
    const videoScrollHeight = (frameCount * PX_PER_FRAME);
    const fraction = Math.min(1, scrollTop / videoScrollHeight);
    drawFrame(Math.floor(fraction * frameCount));
  }
});

// ── Circular Text Logic
document.querySelectorAll('.circular-text').forEach(el => {
  const text = el.getAttribute('data-text');
  if (!text) return;
  const letters = text.split('');
  el.innerHTML = '';
  letters.forEach((letter, i) => {
    const span = document.createElement('span');
    span.innerText = letter;
    const rotationDeg = (360 / letters.length) * i;
    const factor = Math.PI / letters.length;
    const x = factor * i;
    const y = factor * i;
    span.style.transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;
    el.appendChild(span);
  });
});

