/* ══════════════════════════════════════════
   POTE CHIQ BAKERY — script.js
   ══════════════════════════════════════════ */

/**
 * goTab(name)
 * Troca a aba ativa — funciona tanto na bottom bar (mobile)
 * quanto nas desktop tabs (topo no PC).
 * @param {string} name  — 'home' | 'cardapio' | 'pedir' | 'sobre'
 */
function goTab(name) {
  // ── desativa tudo ──
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.dtab').forEach(b => b.classList.remove('active'));

  // ── ativa a página ──
  const page = document.getElementById('page-' + name);
  if (page) {
    page.scrollTop = 0;          // volta ao topo ao trocar aba
    page.classList.add('active');
  }

  // ── ativa botão na bottom bar (mobile) ──
  const mobileBtn = document.getElementById('tab-' + name);
  if (mobileBtn) mobileBtn.classList.add('active');

  // ── ativa botão na desktop nav ──
  const desktopBtn = document.getElementById('dtab-' + name);
  if (desktopBtn) desktopBtn.classList.add('active');
}

/* ─── Efeito ripple nos botões de navegação ─── */
function addRipple(btn) {
  btn.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    const d = Math.max(this.offsetWidth, this.offsetHeight);
    const r = this.getBoundingClientRect();

    circle.style.cssText = `
      position:absolute;
      border-radius:50%;
      background:rgba(224,122,150,0.28);
      width:${d}px; height:${d}px;
      left:${e.clientX - r.left - d / 2}px;
      top:${e.clientY - r.top  - d / 2}px;
      transform:scale(0);
      animation:rippleAnim 0.55s linear;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow  = 'hidden';
    this.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  });
}

/* ─── Navbar: sombra ao rolar dentro de cada página ─── */
function initScrollShadow() {
  const nav = document.querySelector('.topnav');
  document.querySelectorAll('.page').forEach(page => {
    page.addEventListener('scroll', () => {
      nav.style.boxShadow = page.scrollTop > 20
        ? '0 4px 30px rgba(92,61,46,0.14)'
        : '0 2px 20px rgba(92,61,46,0.07)';
    });
  });
}

/* ─── Animação de entrada com IntersectionObserver ─── */
function initFadeObserver() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(4); opacity: 0; }
    }
    .obs-item {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .obs-item.obs-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('obs-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Observa cards e chips que não têm animação CSS própria
  document.querySelectorAll('.chip, .add-item').forEach((el, i) => {
    el.classList.add('obs-item');
    el.style.transitionDelay = `${i * 0.06}s`;
    observer.observe(el);
  });
}

/* ─── Logo: pequena animação de balanço ao hover ─── */
function initLogoWiggle() {
  const logo = document.querySelector('.hero-logo');
  if (!logo) return;
  logo.addEventListener('mouseenter', () => {
    logo.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    logo.style.transform  = 'scale(1.07) rotate(4deg)';
  });
  logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'scale(1) rotate(0deg)';
  });
}

/* ─── Inicialização ─── */
document.addEventListener('DOMContentLoaded', () => {
  // Ripple em todos os botões de navegação
  document.querySelectorAll('.tab-btn, .dtab, .btn-primary, .btn-secondary').forEach(addRipple);

  initScrollShadow();
  initFadeObserver();
  initLogoWiggle();

  // Garante que a aba home começa ativa
  goTab('home');
});
