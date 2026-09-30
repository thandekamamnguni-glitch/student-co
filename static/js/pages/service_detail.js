// Confirmation for report link to prevent accidental clicks
document.addEventListener('DOMContentLoaded', () => {
  const reportLink = document.querySelector('.btn-report-link');
  if (reportLink) {
    reportLink.addEventListener('click', (e) => {
      const confirmed = confirm(
        'Are you sure you want to report this provider? You will be taken to the reporting form.'
      );
      if (!confirmed) {
        e.preventDefault();
      }
    });
  }
});
