document.addEventListener('DOMContentLoaded', () => {
    // Interactive hover feedback & ripple for action tiles
    const tiles = document.querySelectorAll('.action-tile');

    tiles.forEach(tile => {
        tile.addEventListener('mouseenter', () => {
            tile.style.borderColor = 'var(--green-500, #12b47f)';
        });
        tile.addEventListener('mouseleave', () => {
            if (!tile.classList.contains('highlight-tile')) {
                tile.style.borderColor = '';
            }
        });
    });
});
