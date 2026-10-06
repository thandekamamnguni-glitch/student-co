/**
 * Student Co - Register page: password toggle, validation, submit state
 * Path: static/js/pages/register.js
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  if (!form) return;

  const submitBtn = form.querySelector('.btn-submit');

  // Password show/hide
  form.querySelectorAll('.btn-toggle-pwd').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.password-wrapper')?.querySelector('input');
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? 'Hide' : 'Show';
    });
  });

  // Error helpers (look up the span by data-error-for)
  function setError(name, message) {
    const err = form.querySelector('[data-error-for="' + name + '"]');
    const input = form.elements[name];
    const el = input && input.length ? null : input; // radio groups have no single input
    if (err) {
      err.textContent = message || '';
      err.classList.toggle('active', !!message);
    }
    if (el) el.classList.toggle('input-error', !!message);
  }

  // Clear an error when the user edits that field
  ['username', 'email', 'password', 'confirm_password'].forEach((name) => {
    const input = form.elements[name];
    if (input) input.addEventListener('input', () => setError(name, ''));
  });
  form.querySelectorAll('input[name="account_type"]').forEach((r) =>
    r.addEventListener('change', () => setError('account_type', ''))
  );

  form.addEventListener('submit', (e) => {
    let ok = true;

    if (!form.querySelector('input[name="account_type"]:checked')) {
      setError('account_type', 'Choose how you will use Student Co.');
      ok = false;
    }

    if (form.elements['username'].value.trim().length < 3) {
      setError('username', 'Username must be at least 3 characters.');
      ok = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.elements['email'].value.trim())) {
      setError('email', 'Please enter a valid email address.');
      ok = false;
    }

    if (form.elements['password'].value.length < 6) {
      setError('password', 'Password must be at least 6 characters.');
      ok = false;
    }

    if (form.elements['password'].value !== form.elements['confirm_password'].value) {
      setError('confirm_password', 'Passwords do not match.');
      ok = false;
    }

    if (!ok) {
      e.preventDefault();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating Account...';
    }
  });
});
