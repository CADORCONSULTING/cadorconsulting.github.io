// Menu sur téléphone
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuBtn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }));
}

// Calculateur de seuil de rentabilité (page Le Point de Départ)
const calc = document.getElementById('calc-seuil');
if (calc) {
  const euros = n => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' €';
  const lire = id => parseFloat(String(document.getElementById(id).value).replace(/\s/g, '').replace(',', '.'));
  const out = document.getElementById('calc-resultat');
  const calculer = () => {
    const charges = lire('calc-charges'), reste = lire('calc-reste'), jours = lire('calc-jours');
    if (!(charges > 0) || !(reste > 0 && reste <= 100) || !(jours > 0 && jours <= 31)) {
      out.textContent = 'Indiquez vos charges du mois, ce qui vous reste sur 100 € vendus (entre 1 et 100) et vos jours ouvrés.';
      return;
    }
    const seuil = charges / (reste / 100);
    out.innerHTML = 'Pour ne pas perdre d’argent, vous devez vendre <strong>' + euros(seuil) + '</strong> par mois, soit environ <strong>' + euros(seuil / jours) + '</strong> par jour ouvré.';
  };
  calc.addEventListener('input', calculer);
  calculer();
}

// Onglets du point du mois (flèches gauche et droite au clavier)
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t));
  t.addEventListener('keydown', e => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; selectTab(n); n.focus(); }
  });
});
