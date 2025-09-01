// Bloating Guide Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initProgressBar();
    initSmoothScrolling();
    initNavigationHighlight();
    initChecklistPersistence();
    initScrollAnimations();
    initButtonHandlers();
    initMobileMenu();
    setTimeout(trackChecklistProgress, 100);
});

// Progress Bar Functionality
function initProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    
    function updateProgressBar() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressFill.style.width = Math.min(scrollPercent, 100) + '%';
    }
    
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initial call
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav-menu') ? document.querySelector('.nav-menu').offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinksContainer = document.querySelector('.nav-links');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (navLinksContainer && mobileMenuBtn) {
                    navLinksContainer.style.display = 'none';
                    mobileMenuBtn.innerHTML = '☰';
                }
            }
        });
    });
    
    // Handle hero CTA button - scroll to intro section
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            const introSection = document.querySelector('#intro');
            if (introSection) {
                const navHeight = document.querySelector('.nav-menu') ? document.querySelector('.nav-menu').offsetHeight : 80;
                const targetPosition = introSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Navigation Highlight on Scroll
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightCurrentSection() {
        const scrollTop = window.pageYOffset;
        const navHeight = document.querySelector('.nav-menu') ? document.querySelector('.nav-menu').offsetHeight : 80;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection(); // Initial call
}

// Checklist Persistence
function initChecklistPersistence() {
    const checkboxes = document.querySelectorAll('.implementation-checklist input[type="checkbox"]');
    
    // Load saved states (fallback to in-memory storage)
    checkboxes.forEach(checkbox => {
        try {
            const savedState = localStorage.getItem(checkbox.id);
            if (savedState === 'true') {
                checkbox.checked = true;
            }
        } catch (e) {
            // LocalStorage not available, use in-memory storage
            console.log('Using in-memory checklist storage');
        }
    });
    
    // Save states on change
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            try {
                localStorage.setItem(this.id, this.checked);
            } catch (e) {
                // Fallback if localStorage is not available
                console.log('Checklist state saved locally');
            }
            
            // Add visual feedback
            const listItem = this.closest('li');
            if (this.checked) {
                listItem.style.transform = 'scale(0.98)';
                listItem.style.background = 'var(--color-bg-3)';
                setTimeout(() => {
                    listItem.style.transform = 'scale(1)';
                }, 150);
            } else {
                listItem.style.background = '';
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.stat-card, .timing-card, .week-card, .testimonial-card, .insight-box, .protocol-box'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Button Handlers
function initButtonHandlers() {
    // CTA Button Handler - the main call to action button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
            
            // Show alert message
            setTimeout(() => {
                alert('🌱 Welcome to the Gut Reset Club! In a real application, this would take you to the signup page.');
            }, 200);
        });
    }
    
    // Hero CTA Button - already handled in smooth scrolling, but add alert too
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        // Add click handler for alert (in addition to smooth scrolling)
        heroCta.addEventListener('click', function() {
            // Show a welcome message after scrolling
            setTimeout(() => {
                const welcomeMessage = document.createElement('div');
                welcomeMessage.innerHTML = '📖 Welcome to your gut health journey! Scroll down to discover the science-backed solution.';
                welcomeMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--color-primary);
                    color: var(--color-btn-primary-text);
                    padding: var(--space-16);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-lg);
                    z-index: 10000;
                    max-width: 300px;
                    animation: fadeInUp 0.5s ease-out;
                `;
                
                document.body.appendChild(welcomeMessage);
                
                setTimeout(() => {
                    welcomeMessage.remove();
                }, 4000);
            }, 1000);
        });
    }
    
    // Add hover effects to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.style.transform.includes('scale')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.style.transform.includes('scale')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Add progress tracking for checklists
function trackChecklistProgress() {
    const weeks = document.querySelectorAll('.week-card');
    
    weeks.forEach(week => {
        const checkboxes = week.querySelectorAll('input[type="checkbox"]');
        const header = week.querySelector('.week-header h3');
        
        if (!header || checkboxes.length === 0) return;
        
        function updateProgress() {
            const checked = week.querySelectorAll('input[type="checkbox"]:checked').length;
            const total = checkboxes.length;
            const percentage = Math.round((checked / total) * 100);
            
            // Add progress indicator to header
            const existingProgress = header.querySelector('.progress-indicator');
            if (existingProgress) {
                existingProgress.remove();
            }
            
            if (checked > 0) {
                const progressSpan = document.createElement('span');
                progressSpan.className = 'progress-indicator';
                progressSpan.textContent = ` (${percentage}% complete)`;
                progressSpan.style.fontSize = '0.8em';
                progressSpan.style.opacity = '0.8';
                header.appendChild(progressSpan);
            }
            
            // Add completion celebration
            if (percentage === 100 && checked > 0) {
                week.style.boxShadow = '0 0 20px rgba(33, 128, 141, 0.3)';
                week.style.position = 'relative';
                
                setTimeout(() => {
                    const celebration = document.createElement('div');
                    celebration.textContent = '🎉';
                    celebration.style.cssText = `
                        position: absolute;
                        top: -10px;
                        right: -10px;
                        font-size: 2rem;
                        animation: bounce 1s ease-in-out;
                        pointer-events: none;
                    `;
                    week.appendChild(celebration);
                    
                    setTimeout(() => {
                        if (celebration && celebration.parentNode) {
                            celebration.remove();
                        }
                    }, 3000);
                }, 500);
            } else if (percentage < 100) {
                week.style.boxShadow = '';
            }
        }
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateProgress);
        });
        
        // Initial progress check
        updateProgress();
    });
}

// Add bounce animation for celebration
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(style);

// Add mobile menu toggle for smaller screens
function initMobileMenu() {
    // Only add mobile menu if screen is small
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav-menu .container');
        const navLinks = document.querySelector('.nav-links');
        
        // Don't add if already exists
        if (document.querySelector('.mobile-menu-btn')) return;
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--color-primary);
            cursor: pointer;
            display: block;
        `;
        
        nav.appendChild(mobileMenuBtn);
        
        // Toggle menu
        let menuOpen = false;
        mobileMenuBtn.addEventListener('click', function() {
            menuOpen = !menuOpen;
            if (menuOpen) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'var(--color-surface)';
                navLinks.style.padding = 'var(--space-16)';
                navLinks.style.boxShadow = 'var(--shadow-md)';
                navLinks.style.zIndex = '1000';
            } else {
                navLinks.style.display = 'none';
            }
            this.innerHTML = menuOpen ? '✕' : '☰';
        });
    }
}

// Handle window resize for mobile menu
window.addEventListener('resize', function() {
    // Remove existing mobile menu button if screen becomes larger
    const existingBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth > 768 && existingBtn) {
        existingBtn.remove();
        // Reset nav links styles
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.background = 'transparent';
        navLinks.style.padding = '0';
        navLinks.style.boxShadow = 'none';
    } else if (window.innerWidth <= 768 && !existingBtn) {
        navLinks.style.display = 'none';
        initMobileMenu();
    }
});

// Add Easter egg: Konami code for special message
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        const specialMessage = document.createElement('div');
        specialMessage.innerHTML = '🎉 Congratulations! You found the secret gut health easter egg! Your dedication to reading this guide shows you\'re serious about healing your gut! 🌱';
        specialMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-surface);
            padding: var(--space-24);
            border-radius: var(--radius-lg);
            border: 3px solid var(--color-primary);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 400px;
            text-align: center;
            animation: fadeInUp 0.5s ease-out;
        `;
        
        document.body.appendChild(specialMessage);
        
        setTimeout(() => {
            specialMessage.remove();
        }, 5000);
        
        konamiCode = []; // Reset
    }
});

// Add scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTop);