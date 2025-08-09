// Registration Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initPlatformIcons();
    initRegistrationProcess();
    initFormValidation();
    initCoursePreselection();
    initExperienceSlider();
    initTechBubbles();
    initNoPasteValidation();
});

// Platform icon multi-select logic
function initPlatformIcons() {
    const icons = document.querySelectorAll('.platform-icon-btn');
    const hiddenInput = document.getElementById('platform');
    icons.forEach(btn => {
        btn.addEventListener('click', function () {
            btn.classList.toggle('selected');
            // Collect all selected values
            const selected = Array.from(icons).filter(b => b.classList.contains('selected')).map(b => b.getAttribute('data-value'));
            hiddenInput.value = selected.join(', ');
        });
    });
}

// Initialize registration process
function initRegistrationProcess() {
    const steps = document.querySelectorAll('.registration-step');
    const progressSteps = document.querySelectorAll('.step');
    let currentStep = 1;

    // Step navigation
    document.getElementById('continue-step-1')?.addEventListener('click', () => {
        if (validateStep1()) {
            goToStep(2);
        }
    });

    document.getElementById('back-step-2')?.addEventListener('click', () => {
        goToStep(1);
    });

    document.getElementById('continue-step-2')?.addEventListener('click', () => {
        if (validateStep2()) {
            goToStep(3);
        }
    });

    document.getElementById('back-step-3')?.addEventListener('click', () => {
        goToStep(2);
    });

    document.getElementById('complete-registration')?.addEventListener('click', () => {
        if (validateStep3()) {
            completeRegistration();
        }
    });

    function goToStep(stepNumber) {
        // Hide all steps
        steps.forEach(step => {
            step.classList.remove('active');
        });

        // Show target step
        const targetStep = document.getElementById(`step-${stepNumber}`);
        if (targetStep) {
            targetStep.classList.add('active');
        }

        // Update progress
        progressSteps.forEach((step, index) => {
            if (index + 1 <= stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        currentStep = stepNumber;

        // Animate step transition
        gsap.fromTo(targetStep,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        );
    }
}

// Course preselection from URL
function initCoursePreselection() {
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedCourse = urlParams.get('course');

    if (preselectedCourse) {
        const courseSelect = document.getElementById('interestedCourse');
        if (courseSelect) {
            courseSelect.value = preselectedCourse;
        }
    }
}

// Experience slider with animation
function initExperienceSlider() {
    const slider = document.getElementById('experienceLevel');
    const valueDisplay = document.getElementById('experienceValue');
    const animation = document.getElementById('experienceAnimation');

    if (slider && valueDisplay && animation) {
        slider.addEventListener('input', function () {
            const value = this.value;
            valueDisplay.textContent = value;

            // Show animation
            animation.classList.add('active');

            // Animate slider thumb
            gsap.to(slider, {
                scale: 1.1,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });

            // Hide animation after delay
            setTimeout(() => {
                animation.classList.remove('active');
            }, 1000);
        });
    }
}

// Tech bubbles selection
function initTechBubbles() {
    const techBubbles = document.querySelectorAll('.tech-bubble');

    techBubbles.forEach(bubble => {
        const checkbox = bubble.querySelector('input[type="checkbox"]');
        const label = bubble.querySelector('label');

        label.addEventListener('click', function () {
            // Animate selection
            gsap.to(bubble, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
}

// No paste validation for goals textarea
function initNoPasteValidation() {
    const goalsTextarea = document.getElementById('goals');
    const charCount = document.getElementById('goalCharCount');

    if (goalsTextarea && charCount) {
        // Prevent paste
        goalsTextarea.addEventListener('paste', function (e) {
            e.preventDefault();
            showToast('Type by yourself. We want to know your true goals and motivation.', 'error');
        });

        // Character counter
        goalsTextarea.addEventListener('input', function () {
            const length = this.value.length;
            charCount.textContent = length;

            if (length < 6) {
                charCount.style.color = '#dc3545';
            } else if (length > 250) {
                charCount.style.color = '#dc3545';
            } else {
                charCount.style.color = '#00ffff';
            }
        });
    }
}

// Form validation
function initFormValidation() {
    const form = document.getElementById('registrationForm');
    const inputs = form?.querySelectorAll('input, select, textarea');

    inputs?.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            // Clear validation on input
            clearFieldValidation(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    // Clear previous validation
    clearFieldValidation(field);

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = `${getFieldLabel(field)} is required`;
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    } else if (field.id === 'goals' && value) {
        if (value.length < 6) {
            isValid = false;
            message = 'Goals must be at least 6 characters';
        } else if (value.length > 250) {
            isValid = false;
            message = 'Goals must be less than 250 characters';
        }
    }

    if (!isValid) {
        showFieldError(field, message);
        showToast(message, 'error');
    }

    return isValid;
}

function clearFieldValidation(field) {
    field.classList.remove('is-invalid');
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.remove();
    }
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');

    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    field.parentNode.appendChild(feedback);
}

function getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : field.name || field.id;
}

// Validation functions
function validateStep1() {
    const requiredFields = ['firstName', 'lastName', 'email', 'interestedCourse', 'platform'];
    let isValid = true;
    const missingFields = [];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (fieldId === 'platform') {
            // Remove any previous error
            clearFieldValidation(field);
            if (!field.value) {
                isValid = false;
                missingFields.push('Platform');
                // Only show one error message for platform
                if (!field.parentNode.querySelector('.invalid-feedback')) {
                    showFieldError(field, 'Platform is required');
                }
            }
        } else if (!validateField(field)) {
            isValid = false;
            missingFields.push(getFieldLabel(field));
        }
    });
    if (!isValid) {
        showToast(`Complete these fields: ${missingFields.join(', ')}`, 'error');
    }
    return isValid;
}

function validateStep2() {
    const goalsField = document.getElementById('goals');
    let isValid = true;

    if (!validateField(goalsField)) {
        isValid = false;
    }

    // Check if at least one tech is selected
    const selectedTechs = document.querySelectorAll('.tech-bubble input[type="checkbox"]:checked');
    if (selectedTechs.length === 0) {
        showToast('Please select at least one technology you\'re interested in', 'error');
        isValid = false;
    }

    return isValid;
}

function validateStep3() {
    // Step 3 has no required fields, so always valid
    return true;
}

function completeRegistration() {
    // Show loading state
    const submitBtn = document.getElementById('complete-registration');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    submitBtn.disabled = true;

    // Simulate processing
    setTimeout(() => {
        // Redirect to success page
        window.location.href = 'success.html';
    }, 2000);
}

// Toast notification system - Dark Mode
function showToast(message, type = 'error') {
    // Remove existing toasts of the same type
    const existingToasts = document.querySelectorAll(`.toast.${type}`);
    existingToasts.forEach(toast => toast.remove());

    const toastContainer = getOrCreateToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast ${type} show`;
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

    // Don't auto-hide error toasts, let user dismiss them
    if (type !== 'error') {
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);
    }
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