// Premium Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLogo = document.querySelector('.nav-logo');

    // Enhanced hamburger toggle with animation
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Logo click to scroll to top
    if (navLogo) {
        navLogo.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Premium navbar with scroll effects and progress indicator
let scrollTimeout;
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.navbar::after');

    // Navbar background change
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update scroll progress indicator
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update progress bar width
    navbar.style.setProperty('--scroll-progress', `${scrollPercent}%`);
}

// Enhanced scroll handler with throttling
window.addEventListener('scroll', function () {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 10);
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.service-card, .fee-card, .contact-item, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Enhanced Contact Form with WhatsApp Integration
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    clearFormErrors();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const propertyType = formData.get('property-type');
    const message = formData.get('message');
    const consent = formData.get('consent');

    let isValid = true;

    // Name validation
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phone || !phoneRegex.test(phone.replace(/\s/g, ''))) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Message validation
    if (!message || message.trim().length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }

    // Consent validation
    if (!consent) {
        showNotification('Please agree to be contacted by Amaara Property Management', 'error');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Create professional WhatsApp message
    const whatsappMessage = createPropertyDetailsTemplate(name, phone, email, propertyType, message);

    // Send to WhatsApp
    sendToWhatsApp(whatsappMessage);
});

// WhatsApp Integration Functions
function createPropertyDetailsTemplate(name, phone, email, propertyType, message) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return `🏠 *NEW PROPERTY INQUIRY - AMAARA PROPERTY MANAGEMENT*

📅 *Date:* ${currentDate} at ${currentTime}
👤 *Client Details:*
• Name: ${name}
• Phone: ${phone}
• Email: ${email}
• Property Type: ${propertyType || 'Not specified'}

💬 *Message:*
${message}

🔗 *Source:* Website Contact Form
📱 *Response Required:* Within 24 hours

---
*This inquiry was automatically generated from the Amaara Property Management website.*`;
}

function sendToWhatsApp(message) {
    // WhatsApp Business number (replace with your actual number)
    const whatsappNumber = '+919544453993'; // Replace with your WhatsApp Business number

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

    // Show loading notification
    showNotification('Opening WhatsApp...', 'info');

    // Open WhatsApp in new tab
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');

        // Show success message
        showNotification('WhatsApp opened! Please send the message to complete your inquiry.', 'success');

        // Reset form
        document.getElementById('contactForm').reset();
    }, 1000);
}

// Form validation helpers
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');
    const formGroup = field.closest('.form-group');

    formGroup.classList.add('error');
    errorElement.textContent = message;
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    const formGroups = document.querySelectorAll('.form-group');

    errorElements.forEach(el => el.textContent = '');
    formGroups.forEach(group => group.classList.remove('error'));
}

// WhatsApp Integration
function openWhatsApp() {
    const message = "Hi! I'm interested in your property management services. Please provide more information.";
    const phoneNumber = "918129728660";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Parallax Effect for Hero Section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-link.active {
        color: var(--primary-gold);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeLinkStyle);

// Lazy Loading for Images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance Optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function () {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation to page
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        opacity: 0;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
`;
document.head.appendChild(loadingStyle);

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Testimonial controls
document.querySelector('.testimonial-next')?.addEventListener('click', nextTestimonial);
document.querySelector('.testimonial-prev')?.addEventListener('click', prevTestimonial);

// Testimonial dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const faqItem = this.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
    counterObserver.observe(counter);
});

// Removed particle system for better performance

// Simple scroll effects for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;

    // Add scrolled class for CSS effects
    if (scrolled > 50) {
        hero.classList.add('scrolled');
    } else {
        hero.classList.remove('scrolled');
    }
});

// Smooth scroll for scroll indicator
document.querySelector('.scroll-arrow')?.addEventListener('click', function () {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Enhanced form validation with real-time feedback
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
    field.addEventListener('blur', function () {
        validateField(this);
    });

    field.addEventListener('input', function () {
        if (this.closest('.form-group').classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
        case 'phone':
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            break;
    }

    const formGroup = field.closest('.form-group');
    const errorElement = document.getElementById(fieldName + '-error');

    if (isValid) {
        formGroup.classList.remove('error');
        errorElement.textContent = '';
    } else {
        formGroup.classList.add('error');
        errorElement.textContent = errorMessage;
    }
}

// Loading animation for page
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .title-line, .hero-subtitle, .hero-buttons, .hero-features');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add loading styles for hero elements
const heroLoadingStyle = document.createElement('style');
heroLoadingStyle.textContent = `
    .hero-badge, .title-line, .hero-subtitle, .hero-buttons, .hero-features {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
`;
document.head.appendChild(heroLoadingStyle);

// Simple and Reliable Particle System
class SimpleParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) {
            console.error('Particles canvas not found!');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.isVisible = true;
        this.time = 0;

        // Mobile-optimized settings
        this.isMobile = window.innerWidth < 768;
        this.particleCount = this.isMobile ? 25 : 50;
        this.maxConnections = this.isMobile ? 10 : 20;

        console.log('Particle system constructor called');
        this.init();
    }

    init() {
        console.log('Initializing particle system...');
        this.resizeCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        console.log('Starting animation...');
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        console.log(`Creating ${this.particleCount} particles...`);
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.0,
                vy: (Math.random() - 0.5) * 1.0,
                size: Math.random() * 2 + 1,
                opacity: 0.8,
                color: 'rgba(212, 175, 55, 0.8)'
            });
        }
        console.log(`Created ${this.particles.length} particles`);
    }


    setupEventListeners() {
        // Mouse movement (desktop)
        if (!this.isMobile) {
            let mouseTimeout;
            document.addEventListener('mousemove', (e) => {
                clearTimeout(mouseTimeout);
                mouseTimeout = setTimeout(() => {
                    this.mouse.x = e.clientX;
                    this.mouse.y = e.clientY;
                    this.updateMouseInteractions();
                }, 16);
            });

            // Mouse leave event
            document.addEventListener('mouseleave', () => {
                this.mouse.x = -1000;
                this.mouse.y = -1000;
            });
        }

        // Touch events for mobile
        if (this.isMobile) {
            document.addEventListener('touchstart', (e) => {
                if (e.touches.length > 0) {
                    this.mouse.x = e.touches[0].clientX;
                    this.mouse.y = e.touches[0].clientY;
                }
            });

            document.addEventListener('touchmove', (e) => {
                e.preventDefault(); // Prevent scrolling on touch
                if (e.touches.length > 0) {
                    this.mouse.x = e.touches[0].clientX;
                    this.mouse.y = e.touches[0].clientY;
                    this.updateMouseInteractions();
                }
            });

            document.addEventListener('touchend', () => {
                this.mouse.x = -1000;
                this.mouse.y = -1000;
            });
        }

        // Throttled window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.isMobile = window.innerWidth < 768;
                this.particleCount = this.isMobile ? 25 : 50;
                this.maxConnections = this.isMobile ? 10 : 20;
                this.resizeCanvas();
                this.createParticles();
            }, 250);
        });

        // Optimized scroll effects for mobile
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateScrollEffects();
            }, this.isMobile ? 50 : 32); // Less frequent on mobile
        });

        // Mobile-specific optimizations
        if (this.isMobile) {
            // Reduce animation frequency on mobile
            this.animationInterval = 1000 / 30; // 30 FPS instead of 60
            this.connectionDistance = 80; // Shorter connection distance
            this.particleSize = Math.random() * 1.5 + 0.5; // Smaller particles
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                if (!this.isVisible) {
                    this.pause();
                } else {
                    this.resume();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(document.body);
    }

    updateScrollEffects() {
        const scrollY = window.scrollY;
        const scrollFactor = Math.min(scrollY / 1000, 0.5);

        // Enhanced scroll effects for particles
        this.particles.forEach(particle => {
            particle.vy = particle.baseVy + scrollFactor * 0.3;
            particle.vx = particle.baseVx + Math.sin(this.time * 0.001 + particle.x * 0.01) * 0.1;
        });

        // Floating elements respond to scroll
        this.floatingElements.forEach(element => {
            element.vy = element.baseVy + scrollFactor * 0.1;
        });
    }

    updateMouseInteractions() {
        // Enhanced mouse interactions
        this.particles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const force = (120 - distance) / 120 * 0.015;
                particle.vx += (dx / distance) * force;
                particle.vy += (dy / distance) * force;
            }
        });

        // Floating elements also respond to mouse
        this.floatingElements.forEach(element => {
            const dx = this.mouse.x - element.x;
            const dy = this.mouse.y - element.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150 * 0.008;
                element.vx += (dx / distance) * force;
                element.vy += (dy / distance) * force;
            }
        });
    }

    animate() {
        if (!this.isVisible) {
            console.log('Particles not visible, pausing animation');
            return;
        }

        this.time += 16;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, index) => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        // Draw connections
        this.drawConnections();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateParticle(particle) {
        // Mouse interaction
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            const force = (100 - distance) / 100 * 0.01;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;

        // Add some drift
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Limit velocity
        const maxVel = 2;
        if (Math.abs(particle.vx) > maxVel) particle.vx = particle.vx > 0 ? maxVel : -maxVel;
        if (Math.abs(particle.vy) > maxVel) particle.vy = particle.vy > 0 ? maxVel : -maxVel;
    }


    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }


    drawConnections() {
        let connectionCount = 0;

        for (let i = 0; i < this.particles.length && connectionCount < this.maxConnections; i++) {
            for (let j = i + 1; j < this.particles.length && connectionCount < this.maxConnections; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.save();
                    const alpha = (100 - distance) / 100 * 0.3;
                    this.ctx.globalAlpha = alpha;
                    this.ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                    connectionCount++;
                }
            }
        }
    }

    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resume() {
        if (!this.animationId && this.isVisible) {
            this.animate();
        }
    }

    destroy() {
        this.pause();
        window.removeEventListener('resize', this.resizeCanvas);
        window.removeEventListener('mousemove', this.updateMouse);
    }
}

// Initialize simple particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing particle system...');

    setTimeout(() => {
        console.log('Creating particle system...');
        new SimpleParticleSystem();
    }, 100);
});
