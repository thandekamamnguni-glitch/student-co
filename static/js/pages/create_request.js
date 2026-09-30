// Request Service Form Validation & Counter
document.addEventListener('DOMContentLoaded', () => {
  const requestForm = document.getElementById('request-service-form');
  if (!requestForm) return;

  const messageInput = document.getElementById('message');
  const counterEl = document.getElementById('char-counter');
  const submitBtn = requestForm.querySelector('.btn-primary-action');

  // Character counter
  if (messageInput && counterEl) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      counterEl.textContent = `${len} / 600`;
      if (len > 600) {
        counterEl.style.color = 'var(--danger, #dc2626)';
      } else {
        counterEl.style.color = 'var(--navy-500, #64748b)';
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

  messageInput?.addEventListener('input', () => clearError(messageInput, 'message-error'));

  requestForm.addEventListener('submit', (e) => {
    let isValid = true;
    const msgVal = messageInput.value.trim();

    if (!msgVal) {
      setError(messageInput, 'message-error', 'Please write a message explaining what you need.');
      isValid = false;
    } else if (msgVal.length < 10) {
      setError(messageInput, 'message-error', 'Your message is a bit short. Please provide at least 10 characters.');
      isValid = false;
    } else if (msgVal.length > 600) {
      setError(messageInput, 'message-error', 'Your message exceeds the 600-character limit.');
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      return;
    }

    // Double-submit protection
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Request...';
    }
  });
});
