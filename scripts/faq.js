// FAQ Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initFAQAnimations();
    initContactForm();
    initVotingSystem();
});

// FAQ Animations
function initFAQAnimations() {
    // Animate tab pills
    document.querySelectorAll('.faq-nav-pills .nav-link').forEach((tab, index) => {
        gsap.fromTo(tab,
            {
                y: 30,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: tab,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out'
            }
        );
    });
    
    // Animate accordion items when they come into view
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach((item, index) => {
        gsap.fromTo(item,
            {
                x: -50,
                opacity: 0,
                scale: 0.95
            },
            {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            }
        );
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    
    // Real-time validation on blur
    nameInput?.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateName(this.value.trim());
        }
    });
    
    emailInput?.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateEmail(this.value.trim());
        }
    });
    
    messageInput?.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateMessage(this.value.trim());
        }
    });
    
    // Clear validation when field is cleared
    nameInput?.addEventListener('input', function() {
        if (!this.value.trim()) {
            clearFieldToasts('name');
        }
    });
    
    emailInput?.addEventListener('input', function() {
        if (!this.value.trim()) {
            clearFieldToasts('email');
        }
    });
    
    messageInput?.addEventListener('input', function() {
        if (!this.value.trim()) {
            clearFieldToasts('message');
        }
    });
    
    // Form submission
    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Clear all previous toasts
        clearToasts();
        
        let isValid = true;
        const missingFields = [];
        
        if (!name) {
            missingFields.push('Name');
            isValid = false;
        } else if (!validateName(name)) {
            isValid = false;
        }
        
        if (!email) {
            missingFields.push('Email');
            isValid = false;
        } else if (!validateEmail(email)) {
            isValid = false;
        }
        
        if (!message) {
            missingFields.push('Message');
            isValid = false;
        } else if (!validateMessage(message)) {
            isValid = false;
        }
        
        if (missingFields.length > 0) {
            showToast(`Complete these fields: ${missingFields.join(', ')}`, 'error');
        }
        
        if (isValid) {
            // Show success modal
            const modal = new bootstrap.Modal(document.getElementById('successModal'));
            modal.show();
            
            // Reset form and clear toasts
            form.reset();
            clearToasts();
        }
    });
}

// Validation functions
function validateName(name) {
    if (name.length < 3) {
        showToast('Name must be at least 3 characters long', 'error', 'name');
        return false;
    }
    clearFieldToasts('name');
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address', 'error', 'email');
        return false;
    }
    clearFieldToasts('email');
    return true;
}

function validateMessage(message) {
    if (message.length < 6) {
        showToast('Message must be at least 6 characters long', 'error', 'message');
        return false;
    }
    if (message.length > 1000) {
        showToast('Message must be less than 1000 characters', 'error', 'message');
        return false;
    }
    clearFieldToasts('message');
    return true;
}

// Toast notification system - Dark Mode
function showToast(message, type = 'error', field = null) {
    // Remove existing toasts of the same field
    if (field) {
        clearFieldToasts(field);
    }
    
    const toastContainer = getOrCreateToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type} show`;
    if (field) toast.dataset.field = field;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="toast-header">
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'check-circle'} me-2 text-${type === 'error' ? 'danger' : 'success'}"></i>
            <strong class="me-auto">${type === 'error' ? 'Validation Error' : 'Success'}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Add close functionality
    const closeBtn = toast.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });
    
    // Don't auto-hide error toasts
    if (type !== 'error') {
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);
    }
}

function clearFieldToasts(field) {
    const toasts = document.querySelectorAll(`.toast[data-field="${field}"]`);
    toasts.forEach(toast => toast.remove());
}

function getOrCreateToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    return container;
}

function clearToasts() {
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach(toast => toast.remove());
}

// Voting functionality
function initVotingSystem() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('vote-btn') || e.target.closest('.vote-btn')) {
            const btn = e.target.classList.contains('vote-btn') ? e.target : e.target.closest('.vote-btn');
            const vote = btn.dataset.vote;
            const votingContainer = btn.closest('.faq-voting');
            const buttons = votingContainer.querySelector('.voting-buttons');
            
            // Animate button click
            gsap.to(btn, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // Hide buttons and show thank you message
            buttons.style.display = 'none';
            
            const thankYou = document.createElement('div');
            thankYou.className = 'voting-result';
            thankYou.innerHTML = `
                <p class="text-warning mb-0">
                    Thanks for your feedback! 
                    ${vote === 'down' ? '<a href="mailto:y.nachiketh.reddy@gmail.com" class="neon-link">Let us know</a> how we can improve this answer.' : ''}
                </p>
            `;
            
            votingContainer.appendChild(thankYou);
        }
    });
}