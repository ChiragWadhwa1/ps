// --- Theme Management ---
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const htmlEl = document.documentElement;

// Set light mode as default, only use dark if explicitly saved
if (localStorage.getItem('theme') === 'dark') {
    htmlEl.classList.add('dark');
    htmlEl.classList.remove('light');
    lightIcon.classList.add('hidden');
    darkIcon.classList.remove('hidden');
} else {
    htmlEl.classList.add('light');
    htmlEl.classList.remove('dark');
    darkIcon.classList.add('hidden');
    lightIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', () => {
    htmlEl.classList.toggle('dark');
    htmlEl.classList.toggle('light');
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');
    if (htmlEl.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

const toggleMenu = () => {
    mobileMenu.classList.toggle('is-open');
    document.body.classList.toggle('menu-open');
};

mobileMenuButton.addEventListener('click', toggleMenu);
mobileNavLinks.forEach(link => link.addEventListener('click', toggleMenu));

// --- Header Scroll Effect ---
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// --- WhatsApp Form Submission ---
document.getElementById('whatsapp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // IMPORTANT: Replace with your actual WhatsApp number including the country code (without '+').
    const psychologistWhatsAppNumber = '910000000000'; 
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    let fullMessage = `Hello, my name is ${name}.\nMy phone number is ${phone}.\n\nInquiry: ${message}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappURL = `https://wa.me/${psychologistWhatsAppNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
});

// --- Scroll Animations ---
const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
fadeInElements.forEach(el => observer.observe(el));

// --- Interactive Sparkle Canvas ---
const canvas = document.getElementById('interactive-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let isDarkMode = () => document.documentElement.classList.contains('dark');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
        this.color = isDarkMode() ? `rgba(45, 212, 191, ${this.life})` : `rgba(20, 184, 166, ${this.life})`;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        this.life -= 0.025;
        this.color = isDarkMode() ? `rgba(45, 212, 191, ${this.life})` : `rgba(20, 184, 166, ${this.life})`;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animateParticles);
}

canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (particles.length < 100) { // Limit total particles for performance
         for (let i = 0; i < 2; i++) {
            particles.push(new Particle(x, y));
        }
    }
});

window.addEventListener('resize', resizeCanvas);

themeToggleBtn.addEventListener('click', () => { 
    setTimeout(() => { 
        isDarkMode = () => document.documentElement.classList.contains('dark'); 
    }, 50); 
});

resizeCanvas();
animateParticles();
