document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('profile_picture');
    const fileNameDisplay = document.getElementById('file-name');
    const previewImg = document.getElementById('avatar-preview');
    const fallbackAvatar = document.getElementById('avatar-fallback');

    fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Display selected file name
        fileNameDisplay.textContent = file.name;

        // Live image preview
        const reader = new FileReader();
        reader.onload = (event) => {
            if (previewImg) {
                previewImg.src = event.target.result;
                previewImg.style.display = 'block';
            }
            if (fallbackAvatar) {
                fallbackAvatar.style.display = 'none';
            }
        };
        reader.readAsDataURL(file);
    });
});
