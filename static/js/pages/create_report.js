/**
 * Student Co - Report User Form Interactivity
 * Path: static/js/pages/reports.js
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('report-form');
  if (!form) return;

  const reasonInput = document.getElementById('id_reason');
  const descInput = document.getElementById('id_description');
  const counterEl = document.getElementById('char-counter');
  const submitBtn = form.querySelector('.btn-submit-report');

  // Character Counter for Description
  if (descInput && counterEl) {
    descInput.addEventListener('input', () => {
      const len = descInput.value.length;
      counterEl.textContent = `${len} / 500`;
      if (len > 500) {
        counterEl.style.color = 'var(--danger)';
      } else {
        counterEl.style.color = 'var(--navy-500)';
      }
    });
  }

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

  reasonInput?.addEventListener('input', () => clearError(reasonInput, 'reason-error'));
  descInput?.addEventListener('input', () => clearError(descInput, 'desc-error'));

  form.addEventListener('submit', (e) => {
    let isValid = true;

    if (!reasonInput.value.trim()) {
      setError(reasonInput, 'reason-error', 'Please provide a reason for the report.');
      isValid = false;
    } else if (reasonInput.value.trim().length < 3) {
      setError(reasonInput, 'reason-error', 'Reason must be at least 3 characters.');
      isValid = false;
    }

    if (!descInput.value.trim()) {
      setError(descInput, 'desc-error', 'Please provide details explaining what occurred.');
      isValid = false;
    } else if (descInput.value.trim().length < 15) {
      setError(descInput, 'desc-error', 'Please provide a more detailed description (at least 15 characters).');
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      return;
    }

    const confirmSubmit = confirm('Are you sure you want to submit this report? Our safety team will review it.');
    if (!confirmSubmit) {
      e.preventDefault();
      return;
    }

    // Double-submit prevention
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Report...';
    }
  });
});
