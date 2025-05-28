document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    createStars();
    createBubbles();
    createShootingStars();
    createParticles();
    setupThemeToggle();
    setupNavigation();
    setupScrollTop();
    animateSections();
    setupTypingEffect();
    setupScrollIndicator();
    generateSkillCards();
    setCurrentYear();
    setupFormSubmission();
    setupButtonHoverEffects();
    setupMobileMenu();
    setupAnimations();
    setupResumeDownload();
    handleResponsiveChanges();
});

// Enhanced Background Elements
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = window.innerWidth < 768 ? 150 : 300;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 5;
        const delay = Math.random() * 5;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.setProperty('--duration', `${duration}s`);

        starsContainer.appendChild(star);
    }
}

function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles');
    const bubbleCount = window.innerWidth < 768 ? 8 : 15;
    const colors = ['rgba(15, 250, 250, 0.1)', 'rgba(127, 90, 240, 0.1)', 'rgba(255, 137, 6, 0.1)'];

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        const size = 200 + Math.random() * 400;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 15 + Math.random() * 30;
        const color = colors[Math.floor(Math.random() * colors.length)];

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${x}%`;
        bubble.style.top = `${y}%`;
        bubble.style.setProperty('--bubble-color', color);
        bubble.style.setProperty('--duration', `${duration}s`);

        bubblesContainer.appendChild(bubble);
    }
}

function createShootingStars() {
    const shootingStarsContainer = document.getElementById('shootingStars');

    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 1 + Math.random() * 2;
        const delay = Math.random() * 10;

        shootingStar.style.left = `${x}%`;
        shootingStar.style.top = `${y}%`;
        shootingStar.style.setProperty('--duration', `${duration}s`);
        shootingStar.style.animationDelay = `${delay}s`;

        shootingStarsContainer.appendChild(shootingStar);

        setTimeout(() => {
            shootingStar.remove();
        }, duration * 1000);
    }

    // Adjust frequency based on screen size
    const interval = window.innerWidth < 768 ? 3000 : 1500;

    // Create initial shooting stars
    for (let i = 0; i < 5; i++) {
        createShootingStar();
    }

    // Continue creating shooting stars at intervals
    setInterval(createShootingStar, interval);
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = 2 + Math.random() * 5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 10;
        const opacity = 0.1 + Math.random() * 0.2;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.opacity = opacity;
        particle.style.animationDelay = `${delay}s`;
        particle.style.setProperty('--duration', `${duration}s`);

        particlesContainer.appendChild(particle);
    }
}

// Theme Toggle with System Preference Detection
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Enhanced Navigation with Active Section Highlighting
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn, .top-nav-btn');
    const sections = document.querySelectorAll('section');

    // Click navigation
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);

            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });

                // Update active button
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
        });
    });

    // Scroll spy to highlight active section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navButtons.forEach(button => {
                    button.classList.toggle('active', button.getAttribute('data-section') === id);
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

// Scroll to Top with Progress Indicator
function setupScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;
        const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

        // Show/hide button
        if (scrollPosition > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }

        // Add pulse effect when near bottom
        if (scrollPercentage > 90) {
            scrollTopBtn.classList.add('pulse');
        } else {
            scrollTopBtn.classList.remove('pulse');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Improved Section Animations
function animateSections() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate skill bars if skills section
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

// Enhanced Typing Effect with Cursor Animation
function setupTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        "Front-End  Developer",
        "Open Source Contributor",
        "B.Tech Student",
        "UI/UX Designer",
        "Tech Innovator",
        "Problem Solver"

    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let cursorVisible = true;

    // Cursor blink animation
    setInterval(() => {
        typingText.style.borderRightColor = cursorVisible ? 'transparent' : 'var(--primary)';
        cursorVisible = !cursorVisible;
    }, 500);

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = charIndex % 3 === 0 ? 150 : 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect after a delay
    setTimeout(type, 1000);
}

// Scroll Indicator with Smooth Progress
function setupScrollIndicator() {
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;
        const progress = (scrollPosition / (documentHeight - windowHeight)) * 100;

        scrollProgress.style.width = `${progress}%`;
    });
}

// Dynamic Skill Cards with Proficiency Levels
function generateSkillCards() {
    const skillsContainer = document.querySelector('.skills-container');
    const skills = [
        { name: 'HTML5', icon: 'fab fa-html5', level: 95 },
        { name: 'CSS3', icon: 'fab fa-css3-alt', level: 90 },
        { name: 'JavaScript', icon: 'fab fa-js', level: 85 },
        { name: 'React', icon: 'fab fa-react', level: 80 },
        { name: 'Node.js', icon: 'fab fa-node', level: 75 },
        { name: 'Python', icon: 'fab fa-python', level: 85 },
        { name: 'Java', icon: 'fab fa-java', level: 70 },
        { name: 'Git', icon: 'fab fa-git-alt', level: 80 },
        { name: 'MongoDB', icon: 'fas fa-database', level: 75 },
        { name: 'C Language', icon: 'fab fa-c', level: 70 },
        { name: 'AWS', icon: 'fab fa-aws', level: 65 },
        { name: 'Bootstrap', icon: 'fas fa-bootstrap', level: 60 },
        { name: 'Programming', icon: 'fas fa-code', level: 75 },
        { name: 'SQL', icon: 'fas fa-project-diagram', level: 65 },
        { name: 'Red Hat', icon: 'fas fa-redhat', level: 75 },
        { name: 'Core Java', icon: 'fab fa-java', level: 70 }
    ];

    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.classList.add('skill-card');
        skillCard.innerHTML = `
            <i class="${skill.icon}"></i>
            <h3>${skill.name}</h3>
            <div class="skill-bar">
                <div class="skill-progress" data-level="${skill.level}"></div>
            </div>
        `;
        skillsContainer.appendChild(skillCard);
    });
}

function animateSkillBars() {
    const skillProgresses = document.querySelectorAll('.skill-progress');

    skillProgresses.forEach(progress => {
        const level = progress.getAttribute('data-level');
        progress.style.width = '0';

        setTimeout(() => {
            progress.style.width = `${level}%`;
            progress.style.transition = `width 1.5s ease-out`;
        }, 100);
    });
}

// Resume Download
function setupResumeDownload() {
    const downloadBtn = document.getElementById('downloadResume');

    downloadBtn.addEventListener('click', () => {
        // In a real application, this would download the actual resume file
        showAlert('Resume download started!', 'success');

        // Simulate download delay
        setTimeout(() => {
            showAlert('Resume downloaded successfully!', 'success');
        }, 2000);
    });
}

// Form Submission with Validation and Feedback
function setupFormSubmission() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !subject || !message) {
            showAlert('Please fill in all fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showAlert('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert', type);
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.classList.add('fade-out');
        setTimeout(() => alertBox.remove(), 500);
    }, 3000);
}

// Button Hover Effects with Mouse Position Tracking
function setupButtonHoverEffects() {
    const buttons = document.querySelectorAll('.nav-btn, .submit-btn, .project-link, .top-nav-btn, .view-btn, .social-icon');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Mobile Menu Toggle for Small Screens
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const topNav = document.getElementById('topNav');

    mobileMenuBtn.addEventListener('click', () => {
        topNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = topNav.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking on a nav item
    document.querySelectorAll('.top-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            topNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Additional Animations and Effects
function setupAnimations() {
    // Add parallax effect to profile image
    const profileContainer = document.querySelector('.profile-container');

    if (profileContainer) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            profileContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-link, .social-icon');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) rotate(10deg)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) rotate(0)';
        });
    });

    // Add animation to images
    const animatedImages = document.querySelectorAll('.animated-img');
    animatedImages.forEach(img => {
        img.style.animation = 'float-img 4s ease-in-out infinite';
    });
}

// Set Current Year in Footer
function setCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Responsive Adjustments
function handleResponsiveChanges() {
    // Adjust layout based on screen size
    const header = document.querySelector('header');
    const profilePic = document.querySelector('.profile-pic');
    const profileGlow = document.querySelector('.profile-glow');

    if (window.innerWidth < 992) {
        // Mobile layout adjustments
        if (profilePic) {
            profilePic.style.width = '250px';
            profilePic.style.height = '250px';
        }
        if (profileGlow) {
            profileGlow.style.width = '270px';
            profileGlow.style.height = '270px';
        }
    } else {
        // Desktop layout adjustments
        if (profilePic) {
            profilePic.style.width = '320px';
            profilePic.style.height = '320px';
        }
        if (profileGlow) {
            profileGlow.style.width = '340px';
            profileGlow.style.height = '340px';
        }
    }
}

// Listen for resize events
window.addEventListener('resize', handleResponsiveChanges);