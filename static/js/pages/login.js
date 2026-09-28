/**
 * Student Co - Login Interactivity & Form Handling
 * Path: static/js/pages/login.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Password Visibility Toggle
  const toggleBtn = document.querySelector('[data-password-toggle]');
  const passwordInput = document.getElementById('id_password');

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
      toggleBtn.setAttribute(
        'aria-label',
        isPassword ? 'Hide password' : 'Show password'
      );
    });
  }

  // 2. Toast Notifications for "Forgot password" & "Google login"
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.removeAttribute('hidden');
    toastEl.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => toastEl.setAttribute('hidden', ''), 200);
    }, 2800);
  }

  const soonTriggers = document.querySelectorAll('[data-soon]');
  soonTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const rawText = trigger.textContent.trim().replace(/\?$/, '');
      showToast(`${rawText} is coming soon!`);
    });
  });

  // 3. Client-side Form Validation and double-submit block
  const form = document.querySelector('[data-auth-form]');
  const submitBtn = form ? form.querySelector('.auth-submit') : null;

  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      const usernameInput = document.getElementById('id_username');
      const userVal = usernameInput ? usernameInput.value.trim() : '';
      const passVal = passwordInput ? passwordInput.value.trim() : '';

      // Reset inline errors
      document.querySelectorAll('.field-error').forEach((el) => {
        el.textContent = '';
      });

      let hasError = false;

      if (!userVal) {
        setFieldError('username', 'Please enter your email or username.');
        hasError = true;
      }

      if (!passVal) {
        setFieldError('password', 'Please enter your password.');
        hasError = true;
      }

      if (hasError) {
        e.preventDefault();
        return;
      }

      // Prevent double submits
      submitBtn.disabled = true;
      submitBtn.textContent = 'Logging in...';
    });
  }

  function setFieldError(fieldName, msg) {
    const errorEl = document.querySelector(`[data-error-for="${fieldName}"]`);
    if (errorEl) {
      errorEl.textContent = msg;
    }
  }
});
