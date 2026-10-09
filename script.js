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
