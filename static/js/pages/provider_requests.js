// Provider Customer Requests - card highlights & tracking
document.addEventListener('DOMContentLoaded', () => {
  const actionButtons = document.querySelectorAll('.request-card-footer .btn-action-primary');
  actionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.style.opacity = '0.7';
      btn.textContent = 'Opening...';
    });
  });
});
