document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });


    // --- Smooth Scroll for Anchor Links ---
    // Note: 'scroll-behavior: smooth' in CSS handles most, but this ensures broad support
    // and allows for offset calculation if needed (stuck header).
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header (70px)
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger Typing Animation if it's the hero content
                if (entry.target.querySelector('.greeting')) {
                    startTypingAnimation();
                }

                // Optional: Stop observing once visible to prevent re-animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- Typing Animation ---
    function startTypingAnimation() {
        const greetingElement = document.querySelector('.greeting');
        if (!greetingElement) return;

        const text = "Hello, I'm Fady Ahmed"; // Text to type
        greetingElement.textContent = ""; // Clear initial text

        let index = 0;
        const speed = 100; // Typing speed in ms

        function type() {
            if (index < text.length) {
                greetingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }

        // Slight delay to ensure fade-in starts first
        setTimeout(type, 500);
    }


    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic Validation (HTML5 'required' handles most)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Construct Mailto Link
            // Since this is a static site (no backend), we use mailto to open the user's email client.
            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

            const mailtoLink = `mailto:fady.ahmed1200@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open Email Client
            window.location.href = mailtoLink;

            // Feedback
            alert("This will open your default email app to send the message.");
            contactForm.reset();
        });
    }

    // --- Dynamic Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
