document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const confirmBtn = document.getElementById('confirm-btn');

    bookingForm?.addEventListener('submit', () => {
        if (confirmBtn) {
            // Prevent double submissions and give visual feedback
            confirmBtn.disabled = true;
            confirmBtn.style.opacity = '0.75';
            confirmBtn.style.cursor = 'not-allowed';
            confirmBtn.innerHTML = '<span>Confirming booking...</span>';
        }
    });
});
