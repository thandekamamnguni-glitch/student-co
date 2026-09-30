/**
 * Student Co - Respond to Request Form Handling
 * Path: static/js/pages/respond.js
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('respond-request-form');
  if (!form) return;

  const messageInput = document.getElementById('id_message');
  const priceInput = document.getElementById('id_price');
  const submitBtn = form.querySelector('.btn-submit-response');

  function clearError(input, errorId) {
    if (input) input.classList.remove('input-error');
    const err = document.getElementById(errorId);
    if (err) {
      err.textContent = '';
      err.classList.remove('active');
    }
  }

  function setError(input, errorId, msg) {
    if (input) input.classList.add('input-error');
    const err = document.getElementById(errorId);
    if (err) {
      err.textContent = msg;
      err.classList.add('active');
    }
  }

  messageInput?.addEventListener('input', () => clearError(messageInput, 'message-error'));
  priceInput?.addEventListener('input', () => clearError(priceInput, 'price-error'));

  form.addEventListener('submit', (e) => {
    let isValid = true;
    const msgVal = messageInput.value.trim();

    if (!msgVal) {
      setError(messageInput, 'message-error', 'Please write a response message for the client.');
      isValid = false;
    } else if (msgVal.length < 5) {
      setError(messageInput, 'message-error', 'Please provide a clearer response (at least 5 characters).');
      isValid = false;
    }

    const price = parseFloat(priceInput.value);
    if (isNaN(price) || price <= 0) {
      setError(priceInput, 'price-error', 'Please enter a valid price quote greater than 0.');
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Quote...';
    }
  });
});
