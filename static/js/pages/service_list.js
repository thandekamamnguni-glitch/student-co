// Auto-submit search form when category is selected
document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('category-select');
  const searchForm = document.getElementById('search-form');

  if (categorySelect && searchForm) {
    categorySelect.addEventListener('change', () => {
      searchForm.submit();
    });
  }
});
