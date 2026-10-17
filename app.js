const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  navigation.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});

const sections = [...document.querySelectorAll('main section[id]')];
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-30% 0px -58% 0px' });

  sections.forEach((section) => observer.observe(section));
}


const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const nameField = document.querySelector('#contact-name');
  const messageField = document.querySelector('#contact-message');
  const contactStatus = document.querySelector('#contact-status');
  const whatsappNumber = '393470032427';

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameField.value.trim();
    const message = messageField.value.trim();

    if (!name || !message) {
      contactStatus.textContent = 'Inserisci il tuo nome e un messaggio prima di continuare.';
      (!name ? nameField : messageField).focus();
      return;
    }

    const text = `Ciao Alberto, sono ${name}.\n\n${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    const openedWindow = window.open(whatsappUrl, '_blank');
    if (openedWindow) openedWindow.opener = null;

    contactStatus.replaceChildren();
    contactStatus.append(document.createTextNode('Se WhatsApp non si apre, '));
    const fallbackLink = document.createElement('a');
    fallbackLink.href = whatsappUrl;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    fallbackLink.textContent = 'apri questo collegamento';
    contactStatus.append(fallbackLink, document.createTextNode(' e rivedi il messaggio prima di inviarlo.'));
  });
}
