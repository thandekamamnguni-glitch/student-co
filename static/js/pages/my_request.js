/**
 * Student Co - My Service Requests Interactivity
 * Path: static/js/pages/my_request.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Confirm prompt before proceeding to booking confirmation
  const bookingButtons = document.querySelectorAll('.btn-book-response');
  bookingButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.response-card');
      const providerName = card?.querySelector('.provider-name')?.textContent.trim() || 'this provider';
      const price = card?.querySelector('.price-val')?.textContent.trim() || '';

      const confirmMsg = `Proceed to confirm your booking with ${providerName}${price ? ` for ${price}` : ''}?`;
      if (!confirm(confirmMsg)) {
        e.preventDefault();
      }
    });
  });

  // 2. Highlight matching card on hover
  const requestCards = document.querySelectorAll('.request-card');
  requestCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--navy-300)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--navy-200)';
    });
  });
});
