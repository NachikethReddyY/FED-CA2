/*const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to("#line1", { opacity: 1, y: -20, duration: 0.8 })
      .to("#line2", { opacity: 1, y: -20, duration: 0.8 }, "+=0.3")
      .to("#line3", { opacity: 1, y: -20, duration: 0.8 }, "+=0.2")
      .to("#line4", { opacity: 1, y: -20, duration: 0.8 }, "+=0.2")
      .to("#line5", { opacity: 1, y: -20, duration: 0.8 }, "+=0.2")
      .to("#line6", { opacity: 1, y: -20, duration: 0.8 }, "+=0.2")

      .to("#typedLine", { opacity: 1, duration: 0.5 })
      .call(() => typeText(
        "Learn. Build. Take off. A platform built to equip you with digital skills that matter.",
        "#typedLine", 40
      ))

      .to("#intro", {
        opacity: 0,
        duration: 1.2,
        delay: 1.5,
        onComplete: () => {
          document.getElementById("intro").style.display = "none";
        }
      })

      .to("nav", { y: 0, duration: 1 }, "-=0.8")
      .to(".hero", { opacity: 1, duration: 1 }, "-=0.5");

    function typeText(text, selector, speed = 50) {
      let i = 0;
      const el = document.querySelector(selector);
      el.innerHTML = "";
      const type = () => {
        if (i < text.length) {
          el.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      };
      type();
    }*/

  // Mobile menu toggle
    const toggleBtn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobileMenu');
    let menuOpen = false;

    toggleBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        menu.classList.add('show');
        toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
        gsap.fromTo(menu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            menu.classList.remove('show');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
          }
        });
      }
    });

    // GSAP animations for Hero section (existing)
    gsap.from(".hero h1", { opacity: 0, y: 30, duration: 1, delay: 0.4 });
    gsap.from(".hero p", { opacity: 0, y: 20, duration: 1, delay: 0.6 });
    gsap.from(".hero button", { opacity: 0, y: 10, duration: 1, delay: 0.8 });


    // GSAP animations for "What You'll Discover" section
    gsap.from(".offering-section .why-learn-icon-container", { opacity: 0, y: 30, duration: 1, delay: 1.0 });
    gsap.from(".offering-heading", { opacity: 0, y: 30, duration: 1, delay: 1.2 });
    gsap.from(".offering-paragraph", { opacity: 0, y: 20, duration: 1, delay: 1.4 });
    gsap.from(".offering-card", {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2, // Stagger the animation for each card
      ease: "back.out(1.7)", // A nice bouncy ease
      delay: 1.6 // Start after previous elements
    });
    gsap.from(".offering-buttons", { opacity: 0, y: 20, duration: 1, delay: 2.2 }); // After cards

    // GSAP ScrollTrigger animations for "Your Learning Journey" section
    gsap.registerPlugin(ScrollTrigger);

    // Animate the main heading and paragraph
    gsap.from(".journey-heading", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".journey-section",
        start: "top center+=10%",
        // markers: true,
      }
    });

    gsap.from(".journey-paragraph", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".journey-section",
        start: "top center+=10%",
      }
    });

    // Animate the timeline line filling up
    gsap.to(".timeline-line-fill", {
      height: "100%", // Animate height to 100%
      ease: "none", // Linear animation for smooth filling
      scrollTrigger: {
        trigger: ".journey-timeline-wrapper",
        start: "top center", // Start filling when the timeline wrapper hits the center of the viewport
        end: "bottom center", // End filling when the timeline wrapper leaves the center of the viewport
        scrub: true, // Link animation directly to scroll position
        // markers: true,
      }
    });

    // Animate each timeline item (card and dot)
    document.querySelectorAll(".journey-timeline-item").forEach((item, i) => {
      const card = item.querySelector(".journey-card");
      const dot = item.querySelector(".timeline-dot");

      // Animate the dot
      gsap.from(dot, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: item,
          start: "top center+=15%", // Trigger dot slightly before card
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
          // markers: true,
        }
      });

      // Animate the card
      gsap.from(card, {
        opacity: 0,
        // Conditional x based on screen size: always from right on mobile, alternate on desktop
        x: () => {
          if (window.matchMedia("(max-width: 767.98px)").matches) {
            return 100; // Animate from right on mobile
          } else {
            return i % 2 === 0 ? -100 : 100; // Alternate on desktop
          }
        },
        y: 50, // Slight vertical slide
        scale: 0.8,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top center", // Trigger card when its top hits center of viewport
          toggleActions: "play none none reverse",
          // markers: true,
        }
      });
    });

    // GSAP ScrollTrigger animations for "Meet the Team" section
    gsap.from(".team-heading", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".team-section",
        start: "top center+=10%",
        // markers: true,
      }
    });

    gsap.from(".team-paragraph", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".team-section",
        start: "top center+=10%",
      }
    });

    // GSAP ScrollTrigger animations for "By the Numbers" stats section
    gsap.from(".stats-heading", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top center+=10%",
      }
    });
    gsap.from(".stats-paragraph", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top center+=10%",
      }
    });
    gsap.from(".stats-card", {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top center+=10%",
      }
    });

    // GSAP ScrollTrigger animations for "Testimonials" section
    gsap.from(".testimonials-heading", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top center+=10%",
      }
    });

    gsap.from(".testimonials-paragraph", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top center+=10%",
      }
    });

    gsap.from(".testimonial-card", {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top center+=10%",
      }
    });

    // CTA Section Animations
    gsap.from(".cta-heading", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top center+=10%",
      }
    });

    gsap.from(".cta-paragraph", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top center+=10%",
      }
    });

    gsap.from(".cta-buttons .glass-button", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top center+=10%",
      }
    });

    // Number Counter Animation for Stats Section
    const counters = document.querySelectorAll('.highlight-number');

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        let count = parseFloat(counter.innerText); // Use parseFloat for potential '+'

        const increment = target / (4 * 60); // 4 seconds at ~60fps

        if (count < target) {
          count += increment;
          if (counter.parentElement.querySelector('.lead').textContent.includes('Months Experience')) {
            counter.innerText = Math.ceil(count) + '+';
          } else if (counter.parentElement.querySelector('.lead').textContent.includes('Students Registered')) {
            counter.innerText = Math.ceil(count) + '+';
          }
          else {
            counter.innerText = Math.ceil(count);
          }
          requestAnimationFrame(updateCount);
        } else {
          if (counter.parentElement.querySelector('.lead').textContent.includes('Months Experience')) {
            counter.innerText = target + '+';
          } else if (counter.parentElement.querySelector('.lead').textContent.includes('Students Registered')) {
            counter.innerText = target + '+';
          }
          else {
            counter.innerText = target;
          }
        }
      };

      // Trigger animation when element enters view
      ScrollTrigger.create({
        trigger: counter,
        start: "top center+=50",
        onEnter: updateCount,
        once: true
      });
    });

    // Add ripple effect to all .glass-button elements
function addButtonRippleEffect() {
  document.querySelectorAll('.glass-button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Remove any existing ripple
      const oldRipple = btn.querySelector('.ripple');
      if (oldRipple) oldRipple.remove();
      // Calculate position
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size/2;
      const y = e.clientY - rect.top - size/2;
      // Create ripple
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      btn.appendChild(ripple);
      // Remove after animation
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}
addButtonRippleEffect();

// Glass button cursor-follow yellow glow effect
function addGlassButtonCursorGlow() {
  document.querySelectorAll('.glass-button').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--glass-x', x + 'px');
      btn.style.setProperty('--glass-y', y + 'px');
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.setProperty('--glass-x', '50%');
      btn.style.setProperty('--glass-y', '50%');
    });
  });
}
addGlassButtonCursorGlow();

// Place in your script.js
gsap.from(".footer", {
  opacity: 0,
  y: 60,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%",
    toggleActions: "play none none none"
  }
});
    