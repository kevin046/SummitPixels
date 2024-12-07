document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const isMobile = window.innerWidth <= 768;

    // Only initialize mobile menu functionality if on mobile
    if (isMobile && navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !e.target.closest('.nav-menu') && 
                !e.target.closest('#navToggle')) {
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});