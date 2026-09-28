document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile navigation menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !mobileNav.hidden;
            mobileNav.hidden = isOpen;
            mobileToggle.setAttribute('aria-expanded', String(!isOpen));
        });

        // Close on window resize if larger than mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 820 && !mobileNav.hidden) {
                mobileNav.hidden = true;
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 2. Desktop user dropdown menu
    const userMenuTrigger = document.getElementById('user-menu-trigger');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuTrigger && userDropdown) {
        userMenuTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = userDropdown.hidden;
            userDropdown.hidden = !isHidden;
            userMenuTrigger.setAttribute('aria-expanded', String(isHidden));
        });

        // Close dropdown when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!userDropdown.hidden && !userDropdown.contains(e.target)) {
                userDropdown.hidden = true;
                userMenuTrigger.setAttribute('aria-expanded', 'false');
            }
            if (mobileNav && !mobileNav.hidden && !mobileNav.contains(e.target) && e.target !== mobileToggle) {
                mobileNav.hidden = true;
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
