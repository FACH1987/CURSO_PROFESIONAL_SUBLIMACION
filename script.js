const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
const emailNotification = {
  serviceId: 'service_z9rugul',
  templateId: 'template_7wt5iap',
  publicKey: 'iZ25pwoH0YmNCoyJ9',
};

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('nav-open'));
});

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || new URL(link.href).hostname !== 'go.hotmart.com') return;

  if (Object.values(emailNotification).some((value) => value.startsWith('TU_'))) {
    console.warn('Configura EmailJS para recibir notificaciones de clics.');
    return;
  }

  window.emailjs.send(emailNotification.serviceId, emailNotification.templateId, {
    link_text: link.textContent.trim().replace(/\s+/g, ' '),
    link_url: link.href,
    clicked_at: new Date().toLocaleString('es-ES'),
  }, { publicKey: emailNotification.publicKey }).catch((error) => {
    console.error('No se pudo enviar la notificación del clic:', error);
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealTargets = document.querySelectorAll(
    '.section-grid, .feature-band, .gallery-card, .stories-heading, .testimonial, .final-cta'
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => {
    target.classList.add('scroll-reveal');
    revealObserver.observe(target);
  });
}
