/**
 * Student Co - Marketplace Add Service Interactivity
 * Path: static/js/pages/add_service.js
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('marketplace-service-form');
  if (!form) return;

  const titleInput = document.getElementById('title');
  const descInput = document.getElementById('description');
  const categorySelect = document.getElementById('category');
  const priceInput = document.getElementById('price');
  const submitBtn = form.querySelector('.btn-primary-action');

  function clearError(input, errorId) {
    if (input) input.classList.remove('input-error');
    const errEl = document.getElementById(errorId);
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('active');
    }
  }

  function setError(input, errorId, message) {
    if (input) input.classList.add('input-error');
    const errEl = document.getElementById(errorId);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('active');
    }
  }

  // Clear errors on user input
  titleInput?.addEventListener('input', () => clearError(titleInput, 'title-error'));
  descInput?.addEventListener('input', () => clearError(descInput, 'desc-error'));
  categorySelect?.addEventListener('change', () => clearError(categorySelect, 'category-error'));
  priceInput?.addEventListener('input', () => clearError(priceInput, 'price-error'));

  form.addEventListener('submit', (e) => {
    let isValid = true;

    // Title validation
    if (!titleInput.value.trim()) {
      setError(titleInput, 'title-error', 'Please enter a title for your service.');
      isValid = false;
    } else if (titleInput.value.trim().length < 5) {
      setError(titleInput, 'title-error', 'Title must be at least 5 characters long.');
      isValid = false;
    }

    // Description validation
    if (!descInput.value.trim()) {
      setError(descInput, 'desc-error', 'Please write a brief description of what you offer.');
      isValid = false;
    }

    // Category validation
    if (!categorySelect.value) {
      setError(categorySelect, 'category-error', 'Please select a category for this service.');
      isValid = false;
    }

    // Price validation
    const priceVal = parseFloat(priceInput.value);
    if (isNaN(priceVal) || priceVal <= 0) {
      setError(priceInput, 'price-error', 'Please enter a valid price in Rands (greater than 0).');
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      return;
    }

    // Prevent double submits
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Publishing...';
    }
  });
});
