document.addEventListener('DOMContentLoaded', () => {
    // Add smooth ripple feedback to action buttons
    const reviewButtons = document.querySelectorAll('.card-actions .btn');

    reviewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btn.style.opacity = '0.75';
        });
    });
});
