// ── NAVBAR: adiciona sombra ao rolar ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        nav.style.boxShadow = '0 4px 30px rgba(92,61,46,0.12)';
    } else {
        nav.style.boxShadow = '0 2px 20px rgba(92,61,46,0.06)';
    }
});

// ── FADE-IN ao entrar na viewport ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.menu-card, .step, .about-icon, .order-box').forEach(el => {
    el.classList.add('fade-item');
    observer.observe(el);
});

// Adiciona estilos de fade dinamicamente
const style = document.createElement('style');
style.textContent = `
    .fade-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .menu-card.fade-item { transition-delay: calc(var(--i, 0) * 0.08s); }
`;
document.head.appendChild(style);

// Aplica delay escalonado nos cards
document.querySelectorAll('.menu-card').forEach((card, i) => {
    card.style.setProperty('--i', i);
});

// ── LINK ATIVO no navbar conforme scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
            current = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--deep-rose)';
        }
    });
});
