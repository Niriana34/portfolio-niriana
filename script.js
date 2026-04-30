const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    cursor.style.transform = 'translate(-50%, -50%)';
  });

  (function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    ring.style.transform = 'translate(-50%, -50%)';
    requestAnimationFrame(animRing);
  })();
}


/* NAV SCROLL */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* PAGE NAVIGATION */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  const target = document.getElementById(id);
  if (!target) {
    console.warn(`showPage: page "${id}" introuvable`);
    return;
  }

  target.style.display = 'block';
  // trigger reflow
  target.offsetHeight;
  target.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });

  window.scrollTo(0, 0);

  // animate skill bars when bio opens
  if (id === 'bio') {
    setTimeout(() => {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.classList.add('animated');
        bar.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    }, 300);
  }
}
window.showPage = showPage;

/* MOBILE MENU */
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('open');
}
window.toggleMenu = toggleMenu;

/* PROJECT FILTER */
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.project-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat.includes(cat)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
window.filterProjects = filterProjects;

/* PROJECT MODAL DATA */
const projects = {
  atrika: {
    cat: 'Identité visuelle',
    title: 'Design - Social Media design',
    text: "Création complète des visuelle pour réseaux sociaux de Atrika Association, création des templates pour les posts et stories, ainsi que des éléments graphiques pour les événements et campagnes de sensibilisation.",
    year: '2025',
    /*client: '',*/
    services: 'Logo, Print, Social, badge',
    img: 'img/pj1.png'
  },
};

/* OPEN MODAL */
function openModal(id) {
  const p = projects[id];
  if (!p) return;

  const modalCat = document.getElementById('modalCat');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalYear = document.getElementById('modalYear');
  const modalClient = document.getElementById('modalClient');
  const modalServices = document.getElementById('modalServices');
  const modalVisual = document.getElementById('modalVisual');
  const modalOverlay = document.getElementById('modalOverlay');

  if (!modalCat || !modalTitle || !modalText || !modalYear || !modalClient || !modalServices || !modalVisual || !modalOverlay) return;

  modalCat.textContent = p.cat;
  modalTitle.textContent = p.title;
  modalText.textContent = p.text;
  modalYear.textContent = p.year;
  modalClient.textContent = p.client;
  modalServices.textContent = p.services;

  const img = document.createElement('img');
  img.src = p.img;
  img.alt = p.title;
  img.style.maxWidth = '100%';
  img.style.borderRadius = '8px';
  modalVisual.innerHTML = '';
  modalVisual.appendChild(img);

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openModal = openModal;

function closeModal(e) {
  const modalOverlay = document.getElementById('modalOverlay');
  if (!modalOverlay) return;

  if (e && e.target !== modalOverlay && e.type !== 'click') return;
  if (e && e.target !== modalOverlay) return;

  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeModal = closeModal;

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }
});

const modalCloseButton = document.querySelector('.modal-close');
if (modalCloseButton) {
  modalCloseButton.addEventListener('click', () => {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  });
}

/* CONTACT FORM */
function submitForm() {
  const nameEl = document.getElementById('f-name');
  const emailEl = document.getElementById('f-email');
  const messageEl = document.getElementById('f-message');
  const successEl = document.getElementById('formSuccess');

  if (!nameEl || !emailEl || !messageEl || !successEl) return;

  const name = nameEl.value;
  const email = emailEl.value;
  const msg = messageEl.value;

  if (!name || !email || !msg) {
    alert('Veuillez remplir les champs obligatoires (*)');
    return;
  }

  const recipient = 'nirianavoharu@gmail.com';
  const subject = encodeURIComponent(`Nouveau message de ${name}`);
  const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

  // Simulate email sending (in a real app, this would be an API call)
  console.log('Envoi du message:', { recipient, subject, body });

  successEl.classList.add('show');
  // reset
  ['f-name','f-lastname','f-email','f-company','f-message'].forEach(id => {
    const field = document.getElementById(id);
    if (field) field.value = '';
  });
}
window.submitForm = submitForm;

/* CV DOWNLOAD */
function downloadCV() {
  // In a real site, this would download an actual PDF
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem;
    background: var(--accent); color: var(--bg);
    padding: 1rem 1.5rem;
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    z-index: 9999;
    animation: slideIn 0.4s ease forwards;
  `;
  notification.textContent = '✓ Téléchargement du CV en cours…';
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}
window.downloadCV = downloadCV;

/* INIT — show home */
showPage('home');