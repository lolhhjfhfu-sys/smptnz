const modal = document.getElementById('seasonModal');
const openButtons = [document.getElementById('seasonBtn'), document.getElementById('seasonBtn2')];
const closeEls = [document.getElementById('modalClose'), document.getElementById('modalX')];

function openModal(){
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
openButtons.forEach(b => b && b.addEventListener('click', openModal));
closeEls.forEach(b => b && b.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if(other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});

const copyBtn = document.getElementById('copyIp');
const ip = document.getElementById('serverIp').textContent.trim();
const toast = document.getElementById('toast');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(ip);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = ip;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
});


// Scroll reveal animations
const revealTargets = document.querySelectorAll(
  '.info-section > *, .feature, .season-banner > *, .faq-section > *, .faq-item, .telegram-section > *, footer'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;
    entry.target.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));
