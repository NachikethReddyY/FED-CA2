// Navigation Component JavaScript
class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.mobileToggle = document.querySelector('.mobile-nav-toggle');
    this.mobileContent = document.querySelector('.mobile-nav-content');
    this.lastScrollTop = 0;
    
    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupMobileNavigation();
    this.setupSmoothScrolling();
  }

  setupScrollEffects() {
    if (!this.navbar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Add/remove scrolled class
      if (scrollTop > 100) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      // Hide/show navbar on scroll
      if (scrollTop > this.lastScrollTop && scrollTop > 200) {
        this.navbar.style.transform = 'translateY(-100%)';
      } else {
        this.navbar.style.transform = 'translateY(0)';
      }

      this.lastScrollTop = scrollTop;
    });
  }

        setupMobileNavigation() {
          var mobileToggle = document.querySelector('.mobile-nav-toggle');
          var mobileNav = document.querySelector('.mobile-nav-content');
          var mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');
      
          if (!mobileToggle || !mobileNav) return;
      
          mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
          });
      
          // Close mobile nav when clicking on a link
          mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
              mobileToggle.classList.remove('active');
              mobileNav.classList.remove('active');
            });
          });
      
          // Close mobile nav when clicking outside
          document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !mobileNav.contains(e.target)) {
              mobileToggle.classList.remove('active');
              mobileNav.classList.remove('active');
            }
          });
      
          // Add active state to navigation links
          document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
              // Only prevent default for in-page anchor links
              const href = this.getAttribute('href');
              if (href && href.startsWith('#')) {
                e.preventDefault();
              }

              // Remove active from all links in the same navigation
              var isDesktop = this.closest('.nav-capsule');
              var isMobile = this.closest('.mobile-nav-links');

              if (isDesktop) {
                document.querySelectorAll('.nav-capsule .nav-link').forEach(l => l.classList.remove('active'));
              } else if (isMobile) {
                document.querySelectorAll('.mobile-nav-links .nav-link').forEach(l => l.classList.remove('active'));
              }

              // Add active to clicked link
              this.classList.add('active');
            });
          });
        }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 100; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});