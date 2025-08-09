// Form Component JavaScript
class RegistrationForm {
  constructor() {
    this.currentStep = 1;
    this.formData = {};
    this.init();
  }

  init() {
    this.initPlatformIcons();
    this.initRegistrationProcess();
    this.initFormValidation();
    this.initCoursePreselection();
    this.initExperienceSlider();
    this.initTechBubbles();
    this.initNoPasteValidation();
  }

  // Platform icon multi-select logic
  initPlatformIcons() {
    const icons = document.querySelectorAll('.platform-icon-btn');
    const hiddenInput = document.getElementById('platform');
    
    if (!icons.length || !hiddenInput) return;

    icons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('selected');
        
        // Add selection animation
        gsap.to(btn, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        });
        
        // Collect all selected values
        const selected = Array.from(icons)
          .filter(b => b.classList.contains('selected'))
          .map(b => b.getAttribute('data-value'));
        
        hiddenInput.value = selected.join(', ');
      });
    });
  }

  // Initialize registration process
  initRegistrationProcess() {
    const steps = document.querySelectorAll('.registration-step');
    const progressSteps = document.querySelectorAll('.step');
    
    if (!steps.length || !progressSteps.length) return;

    // Step navigation
    document.getElementById('continue-step-1')?.addEventListener('click', () => {
      if (this.validateStep1()) {
        this.goToStep(2);
      }
    });

    document.getElementById('back-step-2')?.addEventListener('click', () => {
      this.goToStep(1);
    });

    document.getElementById('continue-step-2')?.addEventListener('click', () => {
      if (this.validateStep2()) {
        this.goToStep(3);
      }
    });

    document.getElementById('back-step-3')?.addEventListener('click', () => {
      this.goToStep(2);
    });

    document.getElementById('complete-registration')?.addEventListener('click', () => {
      if (this.validateStep3()) {
        this.completeRegistration();
      }
    });
  }

  goToStep(stepNumber) {
    const steps = document.querySelectorAll('.registration-step');
    const progressSteps = document.querySelectorAll('.step');

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

    this.currentStep = stepNumber;

    // Animate step transition
    if (targetStep) {
      gsap.fromTo(targetStep,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }

  // Course preselection from URL
  initCoursePreselection() {
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
  initExperienceSlider() {
    const slider = document.getElementById('experienceLevel');
    const valueDisplay = document.getElementById('experienceValue');
    const sliderFill = document.getElementById('sliderFill');

    if (!slider || !valueDisplay) return;

    const updateSlider = () => {
      const value = slider.value;
      const max = slider.max;
      const percentage = (value / max) * 100;

      valueDisplay.textContent = value;
      
      if (sliderFill) {
        sliderFill.style.width = percentage + '%';
      }

      // Animate slider thumb
      gsap.to(slider, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    };

    slider.addEventListener('input', updateSlider);
    
    // Initialize slider
    updateSlider();
  }

  // Tech bubbles selection
  initTechBubbles() {
    const techBubbles = document.querySelectorAll('.tech-bubble');

    techBubbles.forEach(bubble => {
      const checkbox = bubble.querySelector('input[type="checkbox"]');
      const label = bubble.querySelector('label');

      if (label) {
        label.addEventListener('click', () => {
          // Animate selection
          gsap.to(bubble, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
          });
        });
      }
    });
  }

  // No paste validation for goals textarea
  initNoPasteValidation() {
    const goalsTextarea = document.getElementById('goals');
    const charCount = document.getElementById('goalCharCount');

    if (!goalsTextarea || !charCount) return;

    // Prevent paste
    goalsTextarea.addEventListener('paste', (e) => {
      e.preventDefault();
      this.showToast('Please type your goals yourself. We want to know your authentic thoughts and motivation.', 'error');
    });

    // Character counter
    goalsTextarea.addEventListener('input', function () {
      const length = this.value.length;
      charCount.textContent = length;

      if (length < 6) {
        charCount.style.color = '#ff6b6b';
      } else if (length > 250) {
        charCount.style.color = '#ff6b6b';
      } else {
        charCount.style.color = '#00ffff';
      }
    });
  }

  // Form validation
  initFormValidation() {
    const form = document.getElementById('registrationForm');
    const inputs = form?.querySelectorAll('input, select, textarea');

    inputs?.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        this.clearFieldValidation(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    // Clear previous validation
    this.clearFieldValidation(field);

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = `${this.getFieldLabel(field)} is required`;
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
      this.showFieldError(field, message);
    }

    return isValid;
  }

  clearFieldValidation(field) {
    field.classList.remove('is-invalid');
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.remove();
    }
  }

  showFieldError(field, message) {
    field.classList.add('is-invalid');

    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    field.parentNode.appendChild(feedback);
  }

  getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : field.name || field.id;
  }

  // Validation functions
  validateStep1() {
    const requiredFields = ['firstName', 'lastName', 'email', 'interestedCourse', 'platform'];
    let isValid = true;
    const missingFields = [];

    requiredFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (!field) return;

      if (fieldId === 'platform') {
        this.clearFieldValidation(field);
        if (!field.value) {
          isValid = false;
          missingFields.push('Platform');
          if (!field.parentNode.querySelector('.invalid-feedback')) {
            this.showFieldError(field, 'Please select at least one platform');
          }
        }
      } else if (!this.validateField(field)) {
        isValid = false;
        missingFields.push(this.getFieldLabel(field));
      }
    });

    if (!isValid) {
      this.showToast(`Please complete these fields: ${missingFields.join(', ')}`, 'error');
    }

    return isValid;
  }

  validateStep2() {
    const goalsField = document.getElementById('goals');
    let isValid = true;

    if (goalsField && !this.validateField(goalsField)) {
      isValid = false;
    }

    // Check if at least one tech is selected
    const selectedTechs = document.querySelectorAll('.tech-bubble input[type="checkbox"]:checked');
    if (selectedTechs.length === 0) {
      this.showToast('Please select at least one technology you\'re interested in', 'error');
      isValid = false;
    }

    return isValid;
  }

  validateStep3() {
    // Step 3 has no required fields, so always valid
    return true;
  }

  completeRegistration() {
    // Show loading state
    const submitBtn = document.getElementById('complete-registration');
    if (!submitBtn) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    submitBtn.disabled = true;

    // Collect form data
    this.collectFormData();

    // Simulate processing
    setTimeout(() => {
      // Store form data in sessionStorage for success page
      sessionStorage.setItem('registrationData', JSON.stringify(this.formData));
      
      // Redirect to success page
      window.location.href = 'success.html';
    }, 2000);
  }

  collectFormData() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    const formData = new FormData(form);
    this.formData = {};

    for (let [key, value] of formData.entries()) {
      this.formData[key] = value;
    }

    // Add selected technologies
    const selectedTechs = Array.from(document.querySelectorAll('.tech-bubble input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.value);
    this.formData.technologies = selectedTechs;

    // Add experience level
    const experienceLevel = document.getElementById('experienceLevel');
    if (experienceLevel) {
      this.formData.experienceLevel = experienceLevel.value;
    }
  }

  // Toast notification system
  showToast(message, type = 'error') {
    // Remove existing toasts of the same type
    const existingToasts = document.querySelectorAll(`.toast.${type}`);
    existingToasts.forEach(toast => toast.remove());

    const toastContainer = this.getOrCreateToastContainer();

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

    // Auto-hide success toasts
    if (type !== 'error') {
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 5000);
    }
  }

  getOrCreateToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container position-fixed top-0 end-0 p-3';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
    }
    return container;
  }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('registrationForm')) {
    new RegistrationForm();
  }
});