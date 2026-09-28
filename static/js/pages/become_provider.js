document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('provider-form');
    const nameInput = document.getElementById('business_name');
    const descTextarea = document.getElementById('description');
    const charCounter = document.getElementById('char-count');
    const MAX_CHARS = 800;

    // Live character counter for description
    function updateCharCount() {
        if (!descTextarea || !charCounter) return;
        const currentLength = descTextarea.value.length;
        charCounter.textContent = `${currentLength} / ${MAX_CHARS}`;
        if (currentLength > MAX_CHARS) {
            charCounter.style.color = '#dc2626';
        } else {
            charCounter.style.color = '';
        }
    }

    descTextarea?.addEventListener('input', updateCharCount);
    updateCharCount(); // initial state

    // Error handling helpers
    function setFieldError(input, errorElId, message) {
        input.classList.add('has-error');
        const errEl = document.getElementById(errorElId);
        if (errEl) {
            errEl.textContent = message;
            errEl.classList.add('active');
        }
    }

    function clearFieldError(input, errorElId) {
        input.classList.remove('has-error');
        const errEl = document.getElementById(errorElId);
        if (errEl) {
            errEl.textContent = '';
            errEl.classList.remove('active');
        }
    }

    nameInput?.addEventListener('input', () => clearFieldError(nameInput, 'name-error'));
    descTextarea?.addEventListener('input', () => clearFieldError(descTextarea, 'desc-error'));

    // Client-side validation before submit
    form?.addEventListener('submit', (e) => {
        let isValid = true;

        if (!nameInput.value.trim()) {
            setFieldError(nameInput, 'name-error', 'Please provide a business or service name.');
            isValid = false;
        }

        if (!descTextarea.value.trim()) {
            setFieldError(descTextarea, 'desc-error', 'Please provide a description of the services you offer.');
            isValid = false;
        } else if (descTextarea.value.trim().length < 20) {
            setFieldError(descTextarea, 'desc-error', 'Please write at least 20 characters describing your service.');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }
    });
});
