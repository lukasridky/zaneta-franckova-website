'use strict';
const artworks = window.ARTWORKS;
const grid = document.querySelector('#artworks');
const dialog = document.querySelector('#art-dialog');
let returnFocus;
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function imageFor(work) {
  const image = el('img');
  image.src = work.image;
  image.alt = `${work.title} — zástupný vizuál, nejde o dílo Žanet Franckové`;
  image.width = 800; image.height = 1000;
  image.loading = 'lazy';
  return image;
}
function showDetail(work, trigger) {
  returnFocus = trigger;
  const content = document.querySelector('#detail-content');
  content.replaceChildren(imageFor(work));
  const copy = el('div', 'detail-copy');
  copy.append(el('p', 'eyebrow', 'ZÁSTUPNÁ UKÁZKA / NEPRODEJNÉ'));
  const heading = el('h2', '', work.title); heading.id = 'detail-title';
  copy.append(heading, el('p', '', `${work.dimensions} · ukázkové rozměry`), el('p', '', work.medium), el('p', '', work.description));
  const link = el('a', 'button', 'Připravit dotaz ↗'); link.href = '#kontakt';
  link.addEventListener('click', () => {
    dialog.close();
    document.querySelector('#interest').value = 'Originální obraz';
    document.querySelector('#message').value = `Dobrý den, zajímá mě budoucí galerie originálů (prohlížel/a jsem zástupnou ukázku ${work.title}). `;
    document.querySelector('#message').focus();
  });
  copy.append(link); content.append(copy); dialog.showModal();
}
function render(filter = 'all') {
  grid.replaceChildren();
  const filtered = artworks.filter(work => filter === 'all' || work.category === filter);
  filtered.forEach((work, i) => {
    const article = el('article', 'art-card');
    const button = el('button', 'art-open'); button.type = 'button';
    button.setAttribute('aria-label', `Otevřít detail: ${work.title}, zástupná ukázka`);
    const frame = el('div', `art-frame frame-${work.id}`); frame.append(imageFor(work), el('span', 'art-view', 'Prohlédnout ↗'));
    button.append(frame);
    button.addEventListener('click', () => showDetail(work, button));
    const meta = el('div', 'art-meta'); meta.append(el('h3', '', work.title), el('span', '', `0${artworks.indexOf(work) + 1}`));
    article.append(button, meta, el('p', 'small', `${work.dimensions} · ukázkové rozměry`), el('p', 'art-status', work.category === 'available' ? '○ Volné — pouze ukázka' : '— Archiv — pouze ukázka'));
    grid.append(article);
  });
  document.querySelector('#gallery-count').textContent = `${filtered.length} / ${artworks.length} ukázek`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  render(button.dataset.filter);
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => returnFocus?.focus());
document.querySelector('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  document.querySelector('#draft-text').value = `Dobrý den,\n\n${form.elements.message.value.trim()}\n\nTéma: ${form.elements.interest.value}\n\nS pozdravem\n${form.elements.name.value.trim()}`;
  document.querySelector('#draft').hidden = false;
  document.querySelector('#copy-status').textContent = 'Text je připravený. Zpráva nebyla odeslána. Ověřený kontakt zatím připravujeme.';
  document.querySelector('#draft-text').focus();
});
document.querySelector('#copy-draft').addEventListener('click', async () => {
  const field = document.querySelector('#draft-text');
  try { await navigator.clipboard.writeText(field.value); document.querySelector('#copy-status').textContent = 'Text zkopírován. Zpráva nebyla odeslána.'; }
  catch { field.focus(); field.select(); document.querySelector('#copy-status').textContent = 'Označený text zkopírujte pomocí Ctrl+C nebo nabídky zařízení. Zpráva nebyla odeslána.'; }
});
render();
