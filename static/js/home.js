document.addEventListener('DOMContentLoaded', () => {
    // Smooth interaction when clicking quick category chips
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            chip.style.transform = 'scale(0.96)';
            setTimeout(() => { chip.style.transform = ''; }, 120);
        });
    });

    // Handle empty search validation
    const searchForm = document.querySelector('.hero-search-box');
    searchForm?.addEventListener('submit', (e) => {
        const queryInput = searchForm.querySelector('input[name="q"]');
        const campusInput = searchForm.querySelector('input[name="campus"]');

        if (!queryInput.value.trim() && !campusInput.value.trim()) {
            e.preventDefault();
            queryInput.focus();
            queryInput.placeholder = 'Please enter a service or skill...';
        }
    });
});
