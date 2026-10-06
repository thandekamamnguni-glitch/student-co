document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('user-menu-trigger');
  const menu = document.getElementById('user-dropdown');
  if (!trigger || !menu) return;

  function setOpen(open) {
    menu.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(menu.hidden);
  });

  // click outside closes it
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !menu.contains(e.target)) setOpen(false);
  });

  // Escape closes it
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
});