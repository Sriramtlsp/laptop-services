/**
 * Main JavaScript file for IT CONNECT Website
 * Contains common functionality used across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu functionality
    initMobileMenu();
    
    // Initialize form validation if forms exist
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        initFormValidation(contactForm);
    }
    
    // Initialize subscription form if it exists
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        initSubscribeForm(subscribeForm);
    }
    
    // Initialize testimonial slider if it exists
    const testimonialSlider = document.getElementById('testimonial-slider');
    if (testimonialSlider) {
        initTestimonialSlider();
    }
    
    // Initialize live chat widget if it exists
    const liveChatWidget = document.getElementById('live-chat-widget');
    if (liveChatWidget) {
        initLiveChatWidget(liveChatWidget);
    }
    
    // Add smooth scrolling to all anchor links
    initSmoothScrolling();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

/**
 * Initialize form validation for contact form
 * @param {HTMLFormElement} form - The form element to validate
 */
function initFormValidation(form) {
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (name && nameError) {
            if (!name.value.trim()) {
                nameError.classList.remove('hidden');
                isValid = false;
            } else {
                nameError.classList.add('hidden');
            }
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        if (email && emailError) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                emailError.classList.remove('hidden');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
            }
        }
        
        // Validate phone (optional)
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        if (phone && phoneError && phone.value.trim()) {
            if (!/^[\d\s\+\-\(\)]{10,15}$/.test(phone.value)) {
                phoneError.classList.remove('hidden');
                isValid = false;
            } else {
                phoneError.classList.add('hidden');
            }
        }
        
        // Validate message
        const message = document.getElementById('message');
        const messageError = document.getElementById('message-error');
        if (message && messageError) {
            if (!message.value.trim()) {
                messageError.classList.remove('hidden');
                isValid = false;
            } else {
                messageError.classList.add('hidden');
            }
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}

/**
 * Initialize subscription form validation and submission
 * @param {HTMLFormElement} form - The subscription form element
 */
function initSubscribeForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const errorMessage = document.getElementById('subscribe-error');
        const successMessage = document.getElementById('subscribe-success');
        
        // Reset messages
        if (errorMessage) errorMessage.classList.add('hidden');
        if (successMessage) successMessage.classList.add('hidden');
        
        // Validate email
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                if (errorMessage) {
                    errorMessage.textContent = 'Please enter a valid email address';
                    errorMessage.classList.remove('hidden');
                }
                return;
            }
            
            // Simulate form submission
            // In a real application, you would send this to a server
            setTimeout(function() {
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                }
                emailInput.value = '';
            }, 500);
        }
    });
}

/**
 * Initialize testimonial slider functionality
 */
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('testimonial-prev');
    const nextButton = document.getElementById('testimonial-next');
    let currentIndex = 0;
    
    if (testimonials.length > 0 && prevButton && nextButton) {
        // Show the first testimonial
        showTestimonial(currentIndex);
        
        // Previous button click
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Next button click
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    /**
     * Show a specific testimonial and hide others
     * @param {number} index - The index of the testimonial to show
     */
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.remove('hidden');
                testimonial.classList.add('animate-fadeIn');
            } else {
                testimonial.classList.add('hidden');
                testimonial.classList.remove('animate-fadeIn');
            }
        });
    }
}

/**
 * Initialize live chat widget functionality
 * @param {HTMLElement} widget - The live chat widget element
 */
function initLiveChatWidget(widget) {
    widget.addEventListener('click', function() {
        // This is a placeholder for actual live chat functionality
        // In a real application, this would initialize a chat interface
        alert('Live chat feature coming soon!');
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Utility function to animate elements when they come into view
 */
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slideInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animation on scroll if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
}