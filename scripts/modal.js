// Modal Component JavaScript
class CourseModal {
  constructor() {
    this.modal = null;
    this.modalElement = null;
    this.init();
  }

  init() {
    this.createModalHTML();
    this.setupEventListeners();
  }

  createModalHTML() {
    // Check if modal already exists
    if (document.getElementById('courseModal')) return;

    const modalHTML = `
      <div class="modal fade course-modal" id="courseModal" tabindex="-1" aria-labelledby="courseModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="courseModalLabel">Course Details</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div id="modalContent">
                <!-- Content will be dynamically inserted here -->
              </div>
            </div>
            <div class="modal-footer">
              <a href="https://discord.gg/4uzKAJfAKc" class="btn btn-outline-light me-2" target="_blank">
                <i class="fab fa-discord me-1"></i>Join Discord
              </a>
              <a href="#" id="modalSignupBtn" class="btn btn-primary neon-btn">
                <i class="fas fa-rocket me-1"></i>Sign Up Now
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modalElement = document.getElementById('courseModal');
    this.modal = new bootstrap.Modal(this.modalElement);
  }

  setupEventListeners() {
    // Setup course card click listeners
    document.addEventListener('click', (e) => {
      const courseCard = e.target.closest('.course-card[data-course]');
      if (courseCard) {
        const courseId = courseCard.dataset.course;
        this.openCourseModal(courseId);
      }

      // Handle detail button clicks
      const detailBtn = e.target.closest('[onclick*="openCourseModal"]');
      if (detailBtn) {
        e.preventDefault();
        const courseId = detailBtn.getAttribute('onclick').match(/'([^']+)'/)[1];
        this.openCourseModal(courseId);
      }
    });

    // Fix modal scroll and backdrop issues
    if (this.modalElement) {
      this.modalElement.addEventListener('show.bs.modal', () => {
        document.body.style.overflow = 'hidden';
      });

      this.modalElement.addEventListener('hidden.bs.modal', () => {
        document.body.style.overflow = '';
      });

      // Prevent modal from closing when clicking inside modal content
      this.modalElement.addEventListener('click', (e) => {
        if (e.target === this.modalElement) {
          this.modal.hide();
        }
      });
    }
  }

  openCourseModal(courseId) {
    const course = this.getCourseData(courseId);
    if (!course) return;

    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('courseModalLabel');
    const signupBtn = document.getElementById('modalSignupBtn');

    modalTitle.textContent = course.title;
    signupBtn.setAttribute('href', `signup.html?course=${encodeURIComponent(course.title)}`);

    modalContent.innerHTML = this.generateModalContent(course);

    // Show the modal
    this.modal.show();

    // Add fade-in animation to content
    setTimeout(() => {
      modalContent.classList.add('fade-in-up');
    }, 100);
  }

  generateModalContent(course) {
    return `
      <div class="course-detail-header mb-4">
        <h4 class="course-tagline text-center mb-3">${course.tagline}</h4>
        <p class="lead text-center">${course.description}</p>
      </div>

      <div class="course-stats mb-4">
        <div class="stat-item">
          <span class="stat-value">${course.duration}</span>
          <div class="stat-label">Duration</div>
        </div>
        <div class="stat-item">
          <span class="stat-value">${course.level}</span>
          <div class="stat-label">Level</div>
        </div>
        <div class="stat-item">
          <span class="stat-value">${course.students}</span>
          <div class="stat-label">Students</div>
        </div>
        <div class="stat-item">
          <span class="stat-value">${course.rating}</span>
          <div class="stat-label">Rating</div>
        </div>
      </div>

      <div class="course-detail-section">
        <h4><i class="fas fa-graduation-cap"></i>What You'll Learn</h4>
        <ul class="curriculum-list">
          ${course.curriculum.map(item => `
            <li><i class="fas fa-check"></i><span class="curriculum-text">${item}</span></li>
          `).join('')}
        </ul>
      </div>

      <div class="course-detail-section">
        <h4><i class="fas fa-project-diagram"></i>Projects You'll Build</h4>
        <div class="projects-grid">
          ${course.projects.map(project => `
            <div class="project-item">
              <h6>${project.name}</h6>
              <p>${project.description}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="course-detail-section">
        <h4><i class="fas fa-book-open"></i>Prerequisites</h4>
        <p>${course.prerequisites}</p>
      </div>

      <div class="course-detail-section">
        <h4><i class="fas fa-chalkboard-teacher"></i>Your Instructor</h4>
        <p>${course.instructor}</p>
      </div>

      <div class="course-detail-section why-love-section">
        <h4><i class="fas fa-heart"></i>Why 16-Year-Olds Love This Course</h4>
        <ul class="love-reasons">
          ${course.whyLove.map(reason => `
            <li><i class="fas fa-star" style="color: #f1ff28ff;"></i>${reason}</li>
          `).join('')}
        </ul>
      </div>

      <div class="course-detail-section text-center">
        <div class="pricing-highlight">
          <h4 class="neon-text mb-2">Special Pricing</h4>
          <div class="price-display">
            <span class="display-4 neon-text">${course.price}</span>
          </div>
        </div>
      </div>
    `;
  }

  getCourseData(courseId) {
    const courseData = {
      'atomic-html-css': {
        title: 'Atomic HTML & CSS',
        tagline: 'Build the foundation of web development',
        description: 'Master the building blocks of the web. Learn semantic HTML5 and modern CSS3 techniques to create beautiful, responsive websites from scratch.',
        duration: '6 weeks',
        level: 'Beginner',
        price: '$0.99/week',
        students: '2,847',
        rating: '4.9/5',
        curriculum: [
          'Semantic HTML5 structure and best practices',
          'CSS Grid and Flexbox for modern layouts',
          'Responsive design principles and mobile-first approach',
          'CSS animations and transitions',
          'Web accessibility fundamentals',
          'CSS preprocessors (Sass/SCSS)',
          'Modern CSS features and custom properties',
          'Performance optimization techniques'
        ],
        projects: [
          {
            name: 'Personal Portfolio',
            description: 'Create a stunning personal portfolio website showcasing your skills and projects'
          },
          {
            name: 'Responsive Landing Page',
            description: 'Build a modern, mobile-first landing page for a fictional startup'
          },
          {
            name: 'CSS Art Gallery',
            description: 'Design an interactive art gallery using pure CSS animations'
          }
        ],
        whyLove: [
          'Start from absolute zero - no prior experience needed',
          'Learn by building real projects you can show off',
          'Get personal feedback from young mentors who understand your journey',
          'Join a community of like-minded 16-year-olds passionate about coding',
          'Flexible schedule that works around school commitments',
          'Industry-relevant skills that employers actually want'
        ],
        prerequisites: 'None! This course is designed for complete beginners.',
        instructor: 'Nachiketh Reddy - Full-stack developer and educator'
      },
      'interactive-javascript': {
        title: 'Interactive JavaScript',
        tagline: 'Bring your websites to life',
        description: 'Learn modern JavaScript to create interactive, dynamic websites. From DOM manipulation to API integration, master the language of the web.',
        duration: '8 weeks',
        level: 'Intermediate',
        price: '$2/week',
        students: '1,923',
        rating: '4.8/5',
        curriculum: [
          'ES6+ JavaScript features and syntax',
          'DOM manipulation and event handling',
          'Asynchronous JavaScript (Promises, async/await)',
          'API integration and fetch requests',
          'Local storage and session management',
          'JavaScript modules and bundling',
          'Error handling and debugging techniques',
          'Modern JavaScript frameworks introduction'
        ],
        projects: [
          {
            name: 'Interactive Todo App',
            description: 'Build a feature-rich todo application with local storage'
          },
          {
            name: 'Weather Dashboard',
            description: 'Create a dynamic weather app using real-time API data'
          },
          {
            name: 'Browser Game',
            description: 'Develop an engaging browser-based game with animations'
          }
        ],
        whyLove: [
          'Learn the most in-demand programming language',
          'Build interactive projects that wow your friends',
          'Understand how modern websites really work',
          'Get ready for advanced frameworks like React',
          'Weekly coding challenges to test your skills',
          'Direct mentorship from successful young developers'
        ],
        prerequisites: 'Basic HTML & CSS knowledge (our Atomic HTML & CSS course is perfect preparation)',
        instructor: 'Nachiketh Reddy - Frontend developer and JavaScript expert'
      },
      'ui-ux-design': {
        title: 'UI/UX Design',
        tagline: 'Design beautiful user experiences',
        description: 'Learn design thinking and create stunning user interfaces. Master Figma, design systems, and user experience principles.',
        duration: '7 weeks',
        level: 'Beginner',
        price: '$12 Lifetime Access',
        students: '1,456',
        rating: '4.9/5',
        curriculum: [
          'Design thinking process and methodology',
          'Figma mastery - from basics to advanced features',
          'Color theory and psychology in design',
          'Typography and visual hierarchy',
          'User research and persona development',
          'Wireframing and prototyping',
          'Design systems and component libraries',
          'Usability testing and iteration'
        ],
        projects: [
          {
            name: 'Mobile App Design',
            description: 'Design a complete mobile app from concept to high-fidelity prototype'
          },
          {
            name: 'Website Redesign',
            description: 'Redesign an existing website with improved UX and modern aesthetics'
          },
          {
            name: 'Design System',
            description: 'Create a comprehensive design system for a brand'
          }
        ],
        whyLove: [
          'Express your creativity while solving real problems',
          'Learn industry-standard tools used by top companies',
          'Develop an eye for beautiful, functional design',
          'Build a portfolio that stands out to employers',
          'Understand user psychology and behavior',
          'Perfect complement to coding skills'
        ],
        prerequisites: 'None! Just bring your creativity and willingness to learn.',
        instructor: 'Nachiketh Reddy - UI/UX Designer and design educator'
      },
      'bootstrap-easy-road': {
        title: 'Easy Road with Bootstrap',
        tagline: 'Build responsive sites quickly',
        description: 'Master Bootstrap 5 to build professional websites in record time. Learn component-based design and responsive frameworks.',
        duration: '4 weeks',
        level: 'Beginner',
        price: '$0.50/week',
        students: '3,241',
        rating: '4.7/5',
        curriculum: [
          'Bootstrap 5 fundamentals and setup',
          'Grid system mastery for responsive layouts',
          'Component library and customization',
          'Utility classes and spacing system',
          'Custom theme creation and branding',
          'JavaScript components and interactions',
          'Rapid prototyping techniques',
          'Bootstrap with modern build tools'
        ],
        projects: [
          {
            name: 'Business Website',
            description: 'Create a professional business website with multiple pages'
          },
          {
            name: 'E-commerce Layout',
            description: 'Build a modern e-commerce product page and shopping cart'
          },
          {
            name: 'Admin Dashboard',
            description: 'Design a responsive admin dashboard with charts and tables'
          }
        ],
        whyLove: [
          'Build websites 10x faster than writing CSS from scratch',
          'Learn the framework used by millions of developers',
          'Perfect for rapid prototyping and client work',
          'Understand component-based design thinking',
          'Great stepping stone to modern frameworks',
          'Immediate results that boost confidence'
        ],
        prerequisites: 'Basic HTML & CSS knowledge recommended',
        instructor: 'Nachiketh Reddy - Bootstrap expert and web developer'
      },
      'react-apps': {
        title: 'React Apps',
        tagline: 'Build modern web applications',
        description: 'Master React to build powerful, scalable web applications. Learn hooks, state management, and modern development practices.',
        duration: '10 weeks',
        level: 'Advanced',
        price: '$79/month',
        students: '892',
        rating: '4.9/5',
        curriculum: [
          'React fundamentals and JSX',
          'Components and props mastery',
          'State management with hooks',
          'Effect hooks and lifecycle methods',
          'React Router for navigation',
          'Context API and global state',
          'API integration and data fetching',
          'Testing React applications',
          'Deployment and optimization'
        ],
        projects: [
          {
            name: 'Social Media App',
            description: 'Build a full-featured social media platform with real-time updates'
          },
          {
            name: 'E-commerce Platform',
            description: 'Create a complete online store with cart, checkout, and user accounts'
          },
          {
            name: 'Task Management Tool',
            description: 'Develop a collaborative project management application'
          }
        ],
        whyLove: [
          'Learn the most popular frontend framework',
          'Build applications used by millions',
          'Develop skills that command high salaries',
          'Join the React developer community',
          'Create impressive portfolio projects',
          'Prepare for internships at top tech companies'
        ],
        prerequisites: 'Solid JavaScript knowledge (our Interactive JavaScript course is perfect preparation)',
        instructor: 'Nachiketh Reddy - Senior React developer and educator'
      },
      'ai-prompt-engineering': {
        title: 'AI & Prompt Engineering',
        tagline: 'Build with AI assistance',
        description: 'Learn to leverage AI tools like Bolt and Lovable to accelerate your development. Master prompt engineering and AI-assisted coding.',
        duration: '6 weeks',
        level: 'Intermediate',
        price: '$23 Lifetime Access',
        students: '2,156',
        rating: '4.8/5',
        curriculum: [
          'Introduction to AI-assisted development',
          'Prompt engineering fundamentals',
          'Using Bolt for rapid prototyping',
          'Lovable for design-to-code workflows',
          'ChatGPT and GitHub Copilot integration',
          'AI workflow optimization',
          'Ethical AI usage in development',
          'Future of AI in web development'
        ],
        projects: [
          {
            name: 'AI-Powered App',
            description: 'Build an application that integrates AI APIs for intelligent features'
          },
          {
            name: 'Chatbot Interface',
            description: 'Create a sophisticated chatbot with natural language processing'
          },
          {
            name: 'Content Generator',
            description: 'Develop a tool that generates content using AI assistance'
          }
        ],
        whyLove: [
          'Stay ahead of the curve with cutting-edge technology',
          'Learn to work with AI, not against it',
          '10x your development speed and productivity',
          'Understand the future of software development',
          'Build applications that seemed impossible before',
          'Gain skills that will be invaluable in the AI era'
        ],
        prerequisites: 'Basic programming knowledge and familiarity with web development',
        instructor: 'Nachiketh Reddy - AI researcher and full-stack developer'
      }
    };

    return courseData[courseId];
  }
}

// Make openCourseModal globally available for backward compatibility
window.openCourseModal = function(courseId) {
  if (window.courseModalInstance) {
    window.courseModalInstance.openCourseModal(courseId);
  }
};

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.courseModalInstance = new CourseModal();
});