/**
 * Student Co - Reviews & Bookings Interactivity
 * Path: static/js/pages/create_review.js
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('review-form');
  const ratingSelect = document.getElementById('rating-select');
  const starWidget = document.getElementById('star-widget');
  const ratingLabel = document.getElementById('rating-label');
  const starButtons = starWidget ? starWidget.querySelectorAll('.star-btn') : [];
  const commentInput = document.getElementById('id_comment');
  const counterEl = document.getElementById('comment-counter');
  const submitBtn = form ? form.querySelector('.btn-submit-review') : null;

  const labels = {
    1: '1 - Very poor',
    2: '2 - Poor',
    3: '3 - Average',
    4: '4 - Good',
    5: '5 - Excellent'
  };

  function updateStars(val) {
    starButtons.forEach((btn) => {
      const btnVal = parseInt(btn.dataset.value, 10);
      if (btnVal <= val) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
    if (ratingLabel) {
      ratingLabel.textContent = labels[val] || 'Select a score';
    }
  }

  // Star hover and click behavior
  starButtons.forEach((btn) => {
    const val = parseInt(btn.dataset.value, 10);

    btn.addEventListener('mouseenter', () => {
      starButtons.forEach((b) => {
        const bVal = parseInt(b.dataset.value, 10);
        b.classList.toggle('hovered', bVal <= val);
      });
    });

    btn.addEventListener('click', () => {
      if (ratingSelect) {
        ratingSelect.value = val;
      }
      updateStars(val);
      clearError();
    });
  });

  starWidget?.addEventListener('mouseleave', () => {
    starButtons.forEach((b) => b.classList.remove('hovered'));
    const currentVal = parseInt(ratingSelect?.value || 0, 10);
    updateStars(currentVal);
  });

  // Character counter
  if (commentInput && counterEl) {
    commentInput.addEventListener('input', () => {
      const len = commentInput.value.length;
      counterEl.textContent = `${len} / 400`;
      if (len > 400) {
        counterEl.style.color = 'var(--danger)';
      } else {
        counterEl.style.color = 'var(--navy-500)';
      }
    });
  }

  function clearError() {
    const err = document.getElementById('rating-error');
    if (err) {
      err.textContent = '';
      err.classList.remove('active');
    }
  }

  function showError(msg) {
    const err = document.getElementById('rating-error');
    if (err) {
      err.textContent = msg;
      err.classList.add('active');
    }
  }

  form?.addEventListener('submit', (e) => {
    if (!ratingSelect || !ratingSelect.value) {
      e.preventDefault();
      showError('Please click a star to rate the provider.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Review...';
    }
  });
});
