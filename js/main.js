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

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            try {
                // Using EmailJS service
                await emailjs.send(
                    'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
                    'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
                    {
                        to_email: 'hello@summitpixels.com',
                        from_name: data.name,
                        from_email: data.email,
                        phone: data.phone,
                        subject: data.subject,
                        message: data.message
                    },
                    'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
                );

                // Show success message
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('Error:', error);
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button state
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}