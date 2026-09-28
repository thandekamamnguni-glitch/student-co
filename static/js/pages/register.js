/**
 * Student Co - Register & Password Toggle Functionality
 * Path: static/js/pages/accounts.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Password toggles
  const toggleButtons = document.querySelectorAll('.btn-toggle-pwd');
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.password-wrapper');
      const input = wrapper ? wrapper.querySelector('input') : null;
      if (!input) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.textContent = isPassword ? 'Hide' : 'Show';
    });
  });

  // 2. Validation & Submission
  const registerForm = document.getElementById('register-form');
  if (!registerForm) return;

  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm_password');
  const submitBtn = registerForm.querySelector('.btn-submit');

  function clearError(input, errorId) {
    if (input) input.classList.remove('input-error');
    const err = document.getElementById(errorId);
    if (err) {
      err.textContent = '';
      err.classList.remove('active');
    }
  }

  function setError(input, errorId, message) {
    if (input) input.classList.add('input-error');
    const err = document.getElementById(errorId);
    if (err) {
      err.textContent = message;
      err.classList.add('active');
    }
  }

  [
    [usernameInput, 'username-error'],
    [emailInput, 'email-error'],
    [passwordInput, 'password-error'],
    [confirmPasswordInput, 'confirm-error'],
  ].forEach(([input, errorId]) => {
    if (input) {
      input.addEventListener('input', () => clearError(input, errorId));
    }
  });

  registerForm.addEventListener('submit', (e) => {
    let isValid = true;

    if (usernameInput && usernameInput.value.trim().length < 3) {
      setError(usernameInput, 'username-error', 'Username must be at least 3 characters.');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, 'email-error', 'Please enter a valid email address.');
      isValid = false;
    }

    if (passwordInput && passwordInput.value.length < 6) {
      setError(passwordInput, 'password-error', 'Password must be at least 6 characters.');
      isValid = false;
    }

    if (
      passwordInput &&
      confirmPasswordInput &&
      passwordInput.value !== confirmPasswordInput.value
    ) {
      setError(confirmPasswordInput, 'confirm-error', 'Passwords do not match.');
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating Account...';
    }
  });
});
