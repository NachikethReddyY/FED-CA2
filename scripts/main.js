// GSAP Animations and Main JavaScript
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
    // Initialize animations
    initHeroAnimations();
    initScrollAnimations();
    initNavbarEffects();
    initFloatingElements();
    initCounterAnimations();
    // Initialize smooth scrolling
    initSmoothScrolling();
    // Remove code typing animation
    // Auto-fill interested course
    autoFillInterestedCourse();
    // Multi-select platform validation
    setupPlatformValidation();
    // Slider fill effect
    setupSliderFill();
});

// Auto-fill Interested Course from URL or sessionStorage
function autoFillInterestedCourse() {
    const urlParams = new URLSearchParams(window.location.search);
    let selectedCourse = urlParams.get('course') || sessionStorage.getItem('selectedCourse');
    if (selectedCourse) {
        const select = document.getElementById('interestedCourse');
        if (select) {
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === selectedCourse) {
                    select.selectedIndex = i;
                    break;
                }
            }
        }
    }
}

// Multi-select platform validation
function setupPlatformValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        const checked = document.querySelectorAll('#platformBubbles input[type="checkbox"]:checked');
        if (checked.length === 0) {
            e.preventDefault();
            alert('Please select at least one platform.');
        }
    });
}

// Slider fill effect
function setupSliderFill() {
    const slider = document.getElementById('experienceLevel');
    const fill = document.getElementById('sliderFill');
    if (!slider || !fill) return;
    function updateFill() {
        const percent = (slider.value - slider.min) / (slider.max - slider.min);
        fill.style.width = (percent * 100) + '%';
    }
    slider.addEventListener('input', updateFill);
    updateFill();
}

// Hero Section Animations
// GSAP ScrollTrigger registration

        // Terminal typing effect with following cursor
         // Terminal typing effect with following cursor
        const terminalText = `// Welcome to LaunchCode\nconst dream = "Building amazing web apps";\nconst reality = "Learning step by step";\n\nfunction makeItHappen() {\n    return dream + " through " + reality;\n}\n\nconsole.log(makeItHappen());\n// "Building amazing web apps through Learning step by step"\n\n// Your journey starts here...`;

const lines = terminalText.split('\n'); // Split by actual newlines only
let lineIndex = 0;
const typingElement = document.getElementById('typingText');

function typeLine() {
    if (lineIndex < lines.length) {
        let currentLine = lines[lineIndex];
        let charIdx = 0;
        function typeChar() {
            if (charIdx < currentLine.length) {
                typingElement.innerHTML += currentLine[charIdx];
                charIdx++;
                setTimeout(typeChar, 20);
            } else {
                typingElement.innerHTML += '<br>';
                lineIndex++;
                setTimeout(typeLine, 120);
            }
        }
        typeChar();
    } else {
        typingElement.innerHTML += '<span class="cursor">|</span>';
    }
}

setTimeout(typeLine, 1000);

            // GSAP for neon-btn hover (scale and shadow)
            document.querySelectorAll('.neon-btn').forEach(neonBtn => {
                neonBtn.addEventListener('mouseenter', () => {
                    gsap.to(neonBtn, { scale: 1.05, duration: 0.3, boxShadow: "0 0 30px rgba(0, 255, 255, 0.5), 0 0 15px rgba(255, 107, 107, 0.5)" });
                });
                neonBtn.addEventListener('mouseleave', () => {
                    gsap.to(neonBtn, { scale: 1, duration: 0.3, boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" });
                });
            });

            // GSAP for btn-secondary hover (scale, border, color, and shadow)
            document.querySelectorAll('.btn-secondary').forEach(secondaryBtn => {
                secondaryBtn.addEventListener('mouseenter', () => {
                    gsap.to(secondaryBtn, { scale: 1.05, duration: 0.3, borderColor: "#93c5fd", color: "#93c5fd", boxShadow: "0 0 15px rgba(96, 165, 250, 0.6)" });
                });
                secondaryBtn.addEventListener('mouseleave', () => {
                    gsap.to(secondaryBtn, { scale: 1, duration: 0.3, borderColor: "#60a5fa", color: "#60a5fa", boxShadow: "0 0 0 transparent" });
                });
            });

            // Timeline Animations with ScrollTrigger
            // Timeline data array
const timelineData = [
    {
        icon: 'fa-brands fa-css3-alt',
        title: 'Master the Core Languages',
        desc: "The foundational building blocks of the web are HTML, CSS, and JavaScript. You must have a solid understanding of these three languages. HTML provides the structure of a webpage, CSS is used for styling and layout, and JavaScript adds interactivity and dynamic functionality. It's crucial to spend time on these fundamentals before moving on."
    },
    {
        icon: 'fa-solid fa-mobile',
        title: 'Learn Frameworks and Libraries',
        desc: "Once you're comfortable with the basics, you'll need to learn a popular JavaScript framework or library. This is where you can start specializing. The most in-demand options are React, Angular, and Vue.js. These tools simplify the development process and are used by most companies for building complex applications."
    },
    {
        icon: 'fa-code',
        title: 'Get Familiar with Key Tools',
        desc: "You'll also need to be proficient with essential development tools. This includes a version control system like Git, which is used for tracking changes in code and collaborating with other developers. You should also be comfortable with a package manager like npm or yarn, and understand how to use a code editor such as VS Code."
    },
    {
        icon: 'fa-book',
        title: 'Build a Portfolio',
        desc: 'Practical experience is the most important part of getting hired. Create a portfolio of projects that showcase your skills. Start with simple projects, like a to-do list app or a weather app that uses an API, and then progress to more complex applications. Make sure to host your projects online and include links to the code on your GitHub profile..'
    },
    {
        icon: 'fa-comment',
        title: 'Develop Soft Skills',
        desc: 'Beyond the technical aspects, a frontend developer needs strong soft skills. Problem-solving, attention to detail, and communication are critical for collaborating with designers, backend developers, and other team members.'
    }
];

function renderTimeline() {
    const wrapper = document.getElementById('timeline-wrapper');
    if (!wrapper) return;
    // Remove all timeline-item elements
    wrapper.querySelectorAll('.timeline-item').forEach(e => e.remove());
    timelineData.forEach((item, i) => {
        const align = i % 2 === 0 ? 'right-aligned' : 'left-aligned';
        const last = i === timelineData.length - 1 ? ' last' : '';
        const div = document.createElement('div');
        div.className = `timeline-item ${align}${last}`;
        div.innerHTML = `
            <div class="timeline-dot">${i + 1}</div>
            <div class="timeline-card">
                <div class="card-content-header">
                    <i class="fa-solid ${item.icon} timeline-icon"></i>
                    <h3>${item.title}</h3>
                </div>
                <p class="card-content-body">${item.desc}</p>
            </div>
        `;
        wrapper.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderTimeline();
    // GSAP Timeline Animation
    const timeline = document.getElementById("timeline-section");
    if (!timeline) return;
    const lineFill = timeline.querySelector(".timeline-line-gradient");
    if (lineFill && window.gsap && window.ScrollTrigger) {
        // Responsive ScrollTrigger start/end for mobile/desktop
        function getScrollPositions() {
            if (window.innerWidth <= 600) {
                return { start: "top 85%", end: "bottom 30%" };
            } else {
                return { start: "top center", end: "bottom center" };
            }
        }
        function setupTimelineScrollTrigger() {
            const { start, end } = getScrollPositions();
            gsap.set(lineFill, { scaleY: 0 });
            if (lineFill._gsap && lineFill._gsap.scrollTrigger) {
                lineFill._gsap.scrollTrigger.kill();
            }
            gsap.to(lineFill, {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: timeline.querySelector(".timeline-wrapper"),
                    start,
                    end,
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            });
            gsap.utils.toArray(".timeline-item").forEach((item) => {
                const card = item.querySelector(".timeline-card");
                gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.9 }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: start,
                        toggleActions: "play reverse play reverse",
                        invalidateOnRefresh: true,
                    }
                });
            });
        }
        setupTimelineScrollTrigger();
        // Refresh ScrollTrigger on resize/orientation change
        window.addEventListener('resize', () => {
            setupTimelineScrollTrigger();
            ScrollTrigger.refresh();
        });
        window.addEventListener('orientationchange', () => {
            setupTimelineScrollTrigger();
            ScrollTrigger.refresh();
        });
        setTimeout(() => ScrollTrigger.refresh(), 100);
    }
});
function initHeroAnimations() {
    const tl = gsap.timeline();

    tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-stats .stat-item', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        .from('.hero-buttons .btn', {
            y: 30,
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.2');

    // Floating code animation
    if (document.querySelector('.floating-code')) {
        gsap.to('.floating-code', {
            y: -20,
            rotation: 2,
            duration: 4,
            repeat: -1,
            opacity: 1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.from('.code-snippet', {
            opacity: 1,
            scale: 0.8,
            duration: 1,
            delay: 0,
            ease: 'back.out(1.7)'
        });
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Why cards animation
    document.querySelectorAll('.why-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 80,
                opacity: 0,
                scale: 0.8
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'back.out(1.7)'
            }
        );
    });

    // Create cards animation
    document.querySelectorAll('.create-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 60,
                opacity: 0,
                scale: 0.9
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'back.out(1.7)'
            }
        );
    });

    // Success stories animation
    document.querySelectorAll('.success-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 80,
                opacity: 0,
                scale: 0.8
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'back.out(1.7)'
            }
        );
    });

    // Community cards animation
    document.querySelectorAll('.community-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 60,
                opacity: 0,
                rotationY: 15
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'back.out(1.7)'
            }
        );
    });

    // Course cards animation
    document.querySelectorAll('.course-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 80,
                opacity: 0,
                scale: 0.9
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: (index % 2) * 0.2,
                ease: 'back.out(1.7)'
            }
        );
    });

    // Support items animation
    document.querySelectorAll('.support-item').forEach((item, index) => {
        gsap.fromTo(item,
            {
                y: 70,
                opacity: 0,
                scale: 0.9
            },
            {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                delay: index * 0.25,
                ease: 'power3.out'
            }
        );
    });

    // Event cards animation
    document.querySelectorAll('.event-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 80,
                opacity: 0,
                rotationY: 15
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1,
                delay: index * 0.2,
                ease: 'back.out(1.7)'
            }
        );
    });

    // Event categories animation
    document.querySelectorAll('.event-category').forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 60,
                scale: 0.8,
                opacity: 0,
                rotation: 5
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'back.out(1.7)'
            }
        );
    });

    // Category filters animation
    document.querySelectorAll('.category-filter').forEach((filter, index) => {
        gsap.fromTo(filter,
            {
                y: 50,
                scale: 0.8,
                opacity: 0,
                rotation: 5
            },
            {
                scrollTrigger: {
                    trigger: filter,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'back.out(1.7)'
            }
        );
    });

    // Section titles animation
    document.querySelectorAll('.section-title').forEach(title => {
        gsap.fromTo(title,
            {
                y: 50,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            }
        );
    });

    // Cards animation
    document.querySelectorAll('.glass-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 60,
                opacity: 0,
                scale: 0.9
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: (index % 3) * 0.15,
                ease: 'back.out(1.7)'
            }
        );
    });
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);

        gsap.fromTo(counter,
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                onUpdate: function () {
                    counter.textContent = Math.ceil(counter.textContent);
                }
            }
        );
    });
}

// URL parameter handling for course selection
function handleCourseSelection() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCourse = urlParams.get('course');

    if (selectedCourse) {
        // Store selected course in sessionStorage for signup page
        sessionStorage.setItem('selectedCourse', selectedCourse);
    }
}

// Navbar effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scrolled class
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(0, 0, 0, 0)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(0, 0, 0, 0)';
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-code, .success-avatar, .event-icon');

    floatingElements.forEach((element, index) => {
        gsap.to(element, {
            y: Math.sin(index) * 20,
            duration: 3 + (index * 0.5),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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

// Button hover effects
document.querySelectorAll('.neon-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    });

    btn.addEventListener('mouseleave', function () {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    });
});

// Glass card hover effects
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        gsap.to(this, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', function () {
        gsap.to(this, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Text typing animation for code snippets
function typeText(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing animation for code snippets when they come into view
const codeElements = document.querySelectorAll('.code-content code');
codeElements.forEach(code => {
    const originalText = code.innerHTML;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeText(code, originalText, 30);
                }, 500);
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(code);
});

// Parallax effect for hero section
if (document.querySelector('.hero-section')) {
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -100,
        opacity: 0.8,
        ease: 'none'
    });
}

// Loading screen animation (if exists)
const loadingScreen = document.querySelector('.loading-screen');
if (loadingScreen) {
    window.addEventListener('load', () => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loadingScreen.style.display = 'none';
            }
        });
    });
}

// Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-heavy operations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join('').indexOf(konamiSequence.join('')) >= 0) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);

        // Show a fun message
        const message = document.createElement('div');
        message.textContent = '🚀 Developer mode activated! 🚀';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #00ffff, #ff6b6b);
            padding: 2rem;
            border-radius: 20px;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 10000;
            animation: pulse 1s ease infinite;
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);

        konamiCode = [];
    }
});

// Initialize particle system (optional enhancement)
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2
        };
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${particle.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(updateParticles);
    }

    // Initialize
    resizeCanvas();
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
    updateParticles();

    window.addEventListener('resize', resizeCanvas);
}

// Initialize course selection handling
handleCourseSelection();

// Course details modal functionality
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('course-details-btn') || e.target.closest('.course-details-btn')) {
        const btn = e.target.classList.contains('course-details-btn') ? e.target : e.target.closest('.course-details-btn');
        const courseType = btn.dataset.course;
        showCourseModal(courseType);
    }
});

function showCourseModal(courseType) {
    const courseDetails = {
        'atomic-html-css': {
            title: 'Atomic HTML & CSS',
            description: 'Master the building blocks of web development with semantic HTML5 and modern CSS3 techniques.',
            duration: '6 weeks',
            level: 'Beginner',
            projects: ['Personal Portfolio', 'Landing Page', 'CSS Art Gallery'],
            skills: ['Semantic HTML5', 'CSS Grid & Flexbox', 'Responsive Design', 'CSS Animations']
        },
        'interactive-javascript': {
            title: 'Interactive JavaScript',
            description: 'Bring your websites to life with modern JavaScript and create dynamic, interactive experiences.',
            duration: '8 weeks',
            level: 'Intermediate',
            projects: ['Todo App', 'Weather Dashboard', 'Interactive Game'],
            skills: ['ES6+ JavaScript', 'DOM Manipulation', 'API Integration', 'Event Handling']
        },
        'ui-ux-design': {
            title: 'UI/UX Design',
            description: 'Learn design thinking and create stunning user interfaces that users love.',
            duration: '7 weeks',
            level: 'Beginner',
            projects: ['Mobile App Design', 'Website Redesign', 'Design System'],
            skills: ['Design Thinking', 'Figma Mastery', 'Color Theory', 'User Research']
        },
        'bootstrap-easy-road': {
            title: 'Easy Road with Bootstrap',
            description: 'Build professional websites quickly using Bootstrap 5 framework.',
            duration: '4 weeks',
            level: 'Beginner',
            projects: ['Business Website', 'E-commerce Layout', 'Admin Dashboard'],
            skills: ['Bootstrap Components', 'Grid System', 'Custom Themes', 'Rapid Prototyping']
        },
        'react-apps': {
            title: 'React Apps',
            description: 'Master React to build powerful, scalable web applications.',
            duration: '10 weeks',
            level: 'Advanced',
            projects: ['Social Media App', 'E-commerce Platform', 'Task Management Tool'],
            skills: ['React Hooks', 'State Management', 'React Router', 'Component Architecture']
        },
        'ai-prompt-engineering': {
            title: 'AI & Prompt Engineering',
            description: 'Learn to leverage AI tools and master prompt engineering for accelerated development.',
            duration: '6 weeks',
            level: 'Intermediate',
            projects: ['AI-Powered App', 'Chatbot Interface', 'Content Generator'],
            skills: ['Prompt Engineering', 'AI Integration', 'Bolt & Lovable', 'Workflow Optimization']
        }
    };

    const course = courseDetails[courseType];
    if (!course) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade course-modal';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${course.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p class="lead">${course.description}</p>
                    
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <h6 class="neon-text">Duration</h6>
                            <p>${course.duration}</p>
                        </div>
                        <div class="col-md-4">
                            <h6 class="neon-text">Level</h6>
                            <p>${course.level}</p>
                        </div>
                        <div class="col-md-4">
                            <h6 class="neon-text">Projects</h6>
                            <p>${course.projects.length} hands-on projects</p>
                        </div>
                    </div>
                    
                    <h6 class="neon-text mb-3">What You'll Build:</h6>
                    <ul class="mb-4">
                        ${course.projects.map(project => `<li>${project}</li>`).join('')}
                    </ul>
                    
                    <h6 class="neon-text mb-3">Skills You'll Learn:</h6>
                    <div class="tech-badges">
                        ${course.skills.map(skill => `<span class="tech-badge">${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="https://discord.gg/4uzKAJfAKc" class="btn btn-outline-light me-2" target="_blank">
                        <i class="fab fa-discord me-1"></i>Join Discord
                    </a>
                    <a href="signup.html?course=${encodeURIComponent(course.title)}" class="btn btn-primary neon-btn">
                        <i class="fas fa-rocket me-1"></i>Sign Up
                    </a>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

// Uncomment to enable particle system
// initParticleSystem();


// Course Modal Functionality
const courseData = {
    'atomic-html-css': {
        title: 'Atomic HTML & CSS',
        tagline: 'Build the foundation of web development',
        description: 'Master the building blocks of the web. Learn semantic HTML5 and modern CSS3 techniques to create beautiful, responsive websites from scratch.',
        duration: '6 weeks',
        level: 'Beginner',
        price: '$0.99/week',
        totalPrice: '$5.94',
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
        instructor: 'Alex Chen, 19 - Full-stack developer at a tech startup'
    },
    'interactive-javascript': {
        title: 'Interactive JavaScript',
        tagline: 'Bring your websites to life',
        description: 'Learn modern JavaScript to create interactive, dynamic websites. From DOM manipulation to API integration, master the language of the web.',
        duration: '8 weeks',
        level: 'Intermediate',
        price: '$2/week',
        totalPrice: '$16',
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
        instructor: 'Maya Patel, 20 - Frontend developer and open-source contributor'
    },
    'ui-ux-design': {
        title: 'UI/UX Design',
        tagline: 'Design beautiful user experiences',
        description: 'Learn design thinking and create stunning user interfaces. Master Figma, design systems, and user experience principles.',
        duration: '7 weeks',
        level: 'Beginner',
        price: '$12 Lifetime Access',
        totalPrice: '$12 (One-time payment)',
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
        instructor: 'Jordan Kim, 21 - UI/UX Designer at a leading design agency'
    },
    'bootstrap-easy-road': {
        title: 'Easy Road with Bootstrap',
        tagline: 'Build responsive sites quickly',
        description: 'Master Bootstrap 5 to build professional websites in record time. Learn component-based design and responsive frameworks.',
        duration: '4 weeks',
        level: 'Beginner',
        price: '$0.50/week',
        totalPrice: '$2',
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
        instructor: 'Sam Rodriguez, 18 - Freelance web developer and Bootstrap contributor'
    },
    'react-apps': {
        title: 'React Apps',
        tagline: 'Build modern web applications',
        description: 'Master React to build powerful, scalable web applications. Learn hooks, state management, and modern development practices.',
        duration: '10 weeks',
        level: 'Advanced',
        price: '$79/month',
        totalPrice: '$158 (2 months)',
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
        instructor: 'Taylor Chen, 22 - Senior React developer at a unicorn startup'
    },
    'ai-prompt-engineering': {
        title: 'AI & Prompt Engineering',
        tagline: 'Build with AI assistance',
        description: 'Learn to leverage AI tools like Bolt and Lovable to accelerate your development. Master prompt engineering and AI-assisted coding.',
        duration: '6 weeks',
        level: 'Intermediate',
        price: '$23 Lifetime Access',
        totalPrice: '$23 (One-time payment)',
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
        instructor: 'Alex Morgan, 20 - AI researcher and full-stack developer'
    }
};

function openCourseModal(courseId) {
    const course = courseData[courseId];
    if (!course) return;

    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('courseModalLabel');
    const signupBtn = document.getElementById('modalSignupBtn');

    modalTitle.textContent = course.title;
    signupBtn.setAttribute('href', `signup.html?course=${encodeURIComponent(course.title)}`);
    signupBtn.onclick = function (e) {
        // Always go to signup.html with course param
        window.location.href = `signup.html?course=${encodeURIComponent(course.title)}`;
        return false;
    };

    modalContent.innerHTML = `
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
            <p>Nachiketh Reddy</p>
        </div>

        <div class="course-detail-section why-love-section">
            <h4><i class="fas fa-heart"></i>Why 16-Year-Olds Love This Course</h4>
            <ul class="love-reasons">
                ${course.whyLove.map(reason => `
                    <li><i class="fas fa-star"></i>${reason}</li>
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

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    modal.show();

    // Add fade-in animation to content
    setTimeout(() => {
        modalContent.classList.add('fade-in-up');
    }, 100);
}

// Add click event listeners to course cards
document.addEventListener('DOMContentLoaded', function () {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', function () {
            const courseId = this.dataset.course;
            if (courseId) {
                openCourseModal(courseId);
            }
        });
    });
});

(function() {
  // Techs and their capsule style (alternate for demo)
  const techs = [
    { name: "Docker", style: "blue-glass" },
    { name: "AWS", style: "glass" },
    { name: "Kubernetes", style: "blue-glass" },
    { name: "Node.js", style: "glass" },
    { name: "Python", style: "blue-glass" },
    { name: "Django", style: "glass" },
    { name: "MongoDB", style: "blue-glass" },
    { name: "JavaScript", style: "glass" },
    { name: "React", style: "blue-glass" },
    { name: "HTML", style: "glass" },
    { name: "CSS", style: "blue-glass" }
  ];

  // Wall layout: [blocks per row]
  const wallRows = [3, 4, 4]; // 3 rows, last row will be slanted

  // Calculate block positions
  function getBlockPositions(container) {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    const blockH = w < 700 ? (w < 500 ? 36 : 54) : 70;
    const blockGap = w < 700 ? (w < 500 ? 8 : 14) : 22;
    // The line is now below the first row
    const lineY = w < 700 ? (w < 500 ? h - 28 : h - 68) : h - 90;
    let positions = [];
    let techIdx = 0;
    let y = lineY;
    wallRows.forEach((count, rowIdx) => {
      const blockW = w < 700 ? (w < 500 ? 90 : 130) : 180;
      const totalWidth = count * blockW + (count - 1) * blockGap;
      let xStart = (w - totalWidth) / 2;
      for (let i = 0; i < count; i++) {
        let left = xStart + i * (blockW + blockGap);
        // Slant the top row
        if (rowIdx === wallRows.length - 1 && i === count - 1) y -= (w < 700 ? (w < 500 ? 8 : 12) : 18);
        positions.push({
          left,
          top: y - rowIdx * (blockH + blockGap),
          tech: techs[techIdx] ? techs[techIdx].name : "",
          style: techs[techIdx] ? techs[techIdx].style : "glass"
        });
        techIdx++;
      }
    });
    return positions;
  }

  // Create blocks
  const wall = document.getElementById('techStackWall');
  let blocks = [];
  function createBlocks() {
    wall.innerHTML = '<div class="wall-line"></div>';
    blocks = [];
    const positions = getBlockPositions(wall);
    positions.forEach((pos, i) => {
      const div = document.createElement('div');
      div.className = `tech-block ${pos.style}`;
      div.textContent = pos.tech;
      div.style.left = `${pos.left}px`;
      div.style.top = `-120px`;
      div.style.opacity = 0;
      wall.appendChild(div);
      blocks.push({ div, ...pos });
    });
  }
  createBlocks();

  // Animate: as you scroll, each row drops in, block by block
  let droppedRows = 0;
  let dropping = false;
  function dropRow(rowIndex) {
    const rowBlocks = blocks.slice(
      wallRows.slice(0, rowIndex).reduce((a, b) => a + b, 0),
      wallRows.slice(0, rowIndex + 1).reduce((a, b) => a + b, 0)
    );
    let i = 0;
    function dropNext() {
      if (i < rowBlocks.length) {
        const { div, left, top } = rowBlocks[i];
        div.style.opacity = 1;
        div.style.left = `${left}px`;
        div.style.top = `${top}px`;
        i++;
        setTimeout(dropNext, 180);
      }
    }
    dropNext();
  }

  function handleScroll() {
    const rect = wall.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.2) {
      const sectionHeight = rect.height;
      const sectionTop = Math.max(0, windowHeight - rect.top);
      const progress = Math.min(1, sectionTop / (sectionHeight * 1.2));
      const rowsToDrop = Math.floor(progress * wallRows.length) + 1;
      if (!dropping && rowsToDrop > droppedRows) {
        dropping = true;
        function dropRowsSequentially(idx) {
          if (idx < rowsToDrop) {
            dropRow(idx);
            setTimeout(() => dropRowsSequentially(idx + 1), 180 * wallRows[idx] + 120);
          } else {
            droppedRows = rowsToDrop;
            dropping = false;
          }
        }
        dropRowsSequentially(droppedRows);
      }
    } else {
      // Reset if out of view
      droppedRows = 0;
      blocks.forEach(({div}) => {
        div.style.top = `-120px`;
        div.style.opacity = 0;
      });
      dropping = false;
    }
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', () => {
    createBlocks();
    droppedRows = 0;
    handleScroll();
  });
  window.addEventListener('DOMContentLoaded', handleScroll);
})();
