document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const headerHeight = navbar.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        highlightNavLink();
    });

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu
            navMenu.classList.remove('open');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');

            // Smooth scroll adjustment for sticky header
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const targetOffset = targetSection.offsetTop - 75; // Approx header height
                window.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 90; // Adjust for sticky header
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }

    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    // Optional: add keyframe animation trigger
                    item.style.animation = 'scaleIn 0.3s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Testimonials Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Wrap around limits
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Hide all slides and remove dot highlights
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show active slide and highlight active dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners for controls
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            showSlide(index);
            resetTimer();
        });
    });

    // Auto rotate slides
    function startTimer() {
        slideInterval = setInterval(nextSlide, 5000); // 5 seconds
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    startTimer();

    // Stats Animation on scroll into view
    const statsSection = document.querySelector('.stats-bar');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const duration = 1500; // 1.5 seconds
            const speed = Math.ceil(target / (duration / 30));

            const updateCount = () => {
                count += speed;
                if (count >= target) {
                    stat.innerText = target + (stat.innerText.includes('%') ? '%' : '+');
                } else {
                    stat.innerText = count + (stat.innerText.includes('%') ? '%' : '+');
                    setTimeout(updateCount, 30);
                }
            };

            updateCount();
        });
    }

    // Form Submissions
    // 1. Admission Inquiry Form
    const admissionForm = document.getElementById('admissionForm');
    const formSuccess = document.getElementById('formSuccess');

    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulating API call
            admissionForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            // Re-render Success icon just in case
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }

    // 2. Contact Us Form
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulating API call
            contactForm.classList.add('hidden');
            contactSuccess.classList.remove('hidden');
            
            // Re-render Success icon
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }

    // 3. Newsletter Subscription Form
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputField = newsletterForm.querySelector('input');
            inputField.value = '';
            newsletterSuccess.classList.remove('hidden');
            
            setTimeout(() => {
                newsletterSuccess.classList.add('hidden');
            }, 3000);
        });
    }
});
