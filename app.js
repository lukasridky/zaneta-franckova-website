'use strict';
const works = window.ARTWORKS || [];
const cards = document.querySelector('.cards');
if (cards) {
  const selectedIds = cards.dataset.previewIds?.split(',');
  const visibleWorks = selectedIds ? selectedIds.map(id => works.find(work => work.id === id)).filter(Boolean) : works;
  const template = cards.querySelector('article').cloneNode(true);
  cards.replaceChildren(...visibleWorks.map((work, index) => {
    const card = template.cloneNode(true);
    card.dataset.category = work.category;
    const link = card.querySelector('.art-image');
    link.href = 'detail.html?id=' + encodeURIComponent(work.id);
    link.className = 'art-image ' + ['sand','sage','rose'][index % 3];
    const img = card.querySelector('img');
    img.src = work.image; img.alt = work.alt; img.loading = "lazy";
    card.querySelector(".art-image > span").textContent = work.images.length > 1 ? "Prohlédnout sérii · " + work.images.length + " obrazy ↗" : "Prohlédnout obraz ↗";
    card.querySelector('h3').textContent = work.title;
    card.querySelector('.card-heading span').textContent = String(index + 1).padStart(2,'0');
    card.querySelector('p').textContent = work.caption;
    return card;
  }));
}
const buttons = document.querySelectorAll('[data-filter]');
function filterGallery(filter) {
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
    if (!card.hidden) count++;
  });
  const counter = document.querySelector('#count');
  if (counter) counter.textContent = count + ' / ' + works.length;
}
buttons.forEach(button => button.addEventListener('click', () => {
  buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  filterGallery(button.dataset.filter);
}));
filterGallery('all');
const detailImage = document.querySelector('#detail-image');
if (detailImage) {
  const id = new URLSearchParams(location.search).get('id');
  const work = works.find(item => item.id === id) || works[0];
  if (work) {
    detailImage.src = work.image; detailImage.alt = work.alt;
    document.querySelector('#full-image').href = work.image;
    document.querySelector('#detail-title').textContent = work.title;
    const strip = document.querySelector('#series-images');
    if (strip && work.images.length > 1) {
      strip.hidden = false;
      work.images.forEach((image,index) => {
        const button = document.createElement('button'); button.type = 'button';
        button.setAttribute('aria-label',work.title + ' — část ' + (index+1));
        button.setAttribute('aria-pressed',String(index===0));
        const thumb = document.createElement('img'); thumb.src=image.src;thumb.alt=image.alt;
        button.append(thumb);
        button.addEventListener('click',()=>{detailImage.src=image.src;detailImage.alt=image.alt;document.querySelector('#full-image').href=image.src;strip.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));});
        strip.append(button);
      });
    }
    document.querySelector('#detail-kind').textContent = work.images.length>1 ? 'SÉRIE / '+work.images.length+' OBRAZY' : 'MALBA / '+work.year;
    const contact=document.querySelector('#art-contact');contact.href='https://www.instagram.com/zanet.franckova/';
    document.querySelector('#contact-hint').textContent = 'Napište mi na Instagramu a uveďte název „'+work.title+'“. Ráda vám sdělím dostupnost i další informace.';
    document.querySelector('#detail-story').textContent = work.story;
    document.querySelectorAll('.details-list dd').forEach((item,index) => {
      item.textContent = work[['year','technique','dimensions','framing','availability','price'][index]];
    });
    document.title = work.title + ' — Žaneta Francková';
  }
}
