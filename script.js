// Enhanced JavaScript for Көрімдік Website

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeAnimations();
    initializeStats();
    initializeHeartAnimation();
    setupEventListeners();
    
    // Add entrance animation delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Create floating particles
function initializeParticles() {
    const container = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
    
    // Continuously create new particles
    setInterval(() => {
        if (container.children.length < particleCount) {
            createParticle(container);
        }
    }, 3000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    // Random particle size
    const size = Math.random() * 3 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 25000);
}

// Initialize entrance animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.donation-card, .profile-card, .certificate-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// Copy phone number function
function copyNumber() {
    const phoneNumber = "+77029073692";
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
            showNotification();
            createConfetti();
            triggerSuccessAnimation();
        }).catch(() => {
            fallbackCopy(phoneNumber);
        });
    } else {
        fallbackCopy(phoneNumber);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification();
        createConfetti();
        triggerSuccessAnimation();
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Show notification
function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    
    // Add pulse animation
    notification.style.animation = 'pulse 0.6s ease-in-out';
    
    setTimeout(() => {
        notification.classList.remove('show');
        notification.style.animation = '';
    }, 3000);
}

// Show amount modal
function showAmount(amount) {
    const modal = document.getElementById('amountModal');
    const modalAmount = document.getElementById('modalAmount');
    
    modalAmount.textContent = `${amount} ₸`;
    modal.classList.add('show');
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'modalEntrance 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('amountModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.style.animation = 'modalExit 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        modalContent.style.animation = '';
    }, 300);
}

// Create confetti animation
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'];
    const confettiCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 4000);
    }
}

// Initialize heart animation
function initializeHeartAnimation() {
    const heartContainer = document.getElementById('floatingHearts');
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        
        heartContainer.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
    }
    
    // Create hearts periodically
    setInterval(createFloatingHeart, 3000);
}

// Initialize and animate stats
function initializeStats() {
    const stats = {
        donations: Math.floor(Math.random() * 100) + 25,
        amount: Math.floor(Math.random() * 100000) + 15000,
        supporters: Math.floor(Math.random() * 50) + 15
    };
    
    // Delay stats animation
    setTimeout(() => {
        animateNumber('totalDonations', stats.donations);
        animateNumber('totalAmount', stats.amount, '₸');
        animateNumber('supporters', stats.supporters);
    }, 1500);
}

// Animate numbers with easing
function animateNumber(elementId, targetNumber, suffix = '') {
    const element = document.getElementById(elementId);
    const duration = 2500;
    const startTime = Date.now();
    const startNumber = 0;
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function update() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = easeOutCubic(progress);
        const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easedProgress);
        
        element.textContent = currentNumber.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// Setup event listeners
function setupEventListeners() {
    // Amount button hover effects
    const amountButtons = document.querySelectorAll('.amount-btn');
    amountButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Copy button animation
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Modal close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add parallax effect to background orbs
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const orbs = document.querySelectorAll('.gradient-orb');
            
            orbs.forEach((orb, index) => {
                const speed = 0.5 + (index * 0.1);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Success animation trigger
function triggerSuccessAnimation() {
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
        copyButton.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        copyButton.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            copyButton.style.transform = 'scale(1)';
        }, 200);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes modalEntrance {
        from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    @keyframes modalExit {
        from {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        to {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Functions for photo integration (to be called when photos are uploaded)
function loadUserPhoto(imageSrc) {
    const placeholder = document.getElementById('profilePlaceholder');
    const imageContainer = document.getElementById('profileImage');
    const img = document.getElementById('userPhoto');
    
    img.src = imageSrc;
    img.onload = function() {
        placeholder.style.display = 'none';
        imageContainer.style.display = 'block';
        
        // Add entrance animation
        imageContainer.style.opacity = '0';
        imageContainer.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            imageContainer.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            imageContainer.style.opacity = '1';
            imageContainer.style.transform = 'scale(1)';
        }, 100);
    };
}

function loadCertificatePhoto(imageSrc) {
    const placeholder = document.getElementById('certificatePlaceholder');
    const imageContainer = document.getElementById('certificateImage');
    const img = document.getElementById('certificatePhoto');
    
    img.src = imageSrc;
    img.onload = function() {
        placeholder.style.display = 'none';
        imageContainer.style.display = 'block';
        
        // Add entrance animation
        imageContainer.style.opacity = '0';
        imageContainer.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            imageContainer.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            imageContainer.style.opacity = '1';
            imageContainer.style.transform = 'scale(1)';
        }, 100);
    };
}

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Initialize non-critical animations
        initializeHeartAnimation();
    });
} else {
    setTimeout(() => {
        initializeHeartAnimation();
    }, 1000);
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Can be implemented for offline functionality
    });
}

