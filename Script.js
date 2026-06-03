// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #73f8ff !important;
        border-bottom: 2px solid #73f8ff;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Scroll to footer function
function scrollToFooter() {
    const footer = document.querySelector('.footer');
    const offsetTop = footer.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// Animation on scroll effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to cards
document.querySelectorAll('.about-card, .pillar, .offering-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add animation keyframes if not already in CSS
if (!document.querySelector('style[data-animation]')) {
    const animationStyle = document.createElement('style');
    animationStyle.setAttribute('data-animation', 'true');
    animationStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyle);
}

// Hamburger menu for mobile (optional enhancement)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        // Create hamburger button if it doesn't exist
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                display: none;
            `;
            
            document.querySelector('.nav-container').appendChild(hamburger);
            
            hamburger.addEventListener('click', () => {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
                navMenu.style.cssText = `
                    flex-direction: column;
                    position: absolute;
                    top: 60px;
                    left: 0;
                    right: 0;
                    background-color: #12469b;
                    padding: 1rem;
                    gap: 0.5rem;
                `;
            });
        }
    }
}

// Initialize on load
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

console.log('IMMERSE website loaded successfully!');

// Hero title letter-splitting animation and floating dots
function animateHeroTitle() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    const text = title.textContent.trim();
    // avoid double-wrapping
    if (title.querySelector('.letter')) return;
    title.textContent = '';
    const fragment = document.createDocumentFragment();
    text.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        span.style.animationDelay = (i * 0.05) + 's';
        fragment.appendChild(span);
    });
    title.appendChild(fragment);
}

function createFloatingDots(count = 10) {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    // remove old dots
    hero.querySelectorAll('.floating-dot').forEach(d => d.remove());
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = 'floating-dot';
        const size = Math.floor(Math.random() * 18) + 8;
        dot.style.width = dot.style.height = size + 'px';
        dot.style.left = (Math.random() * 100) + '%';
        dot.style.top = (Math.random() * 80) + '%';
        dot.style.opacity = (0.35 + Math.random() * 0.6).toString();
        dot.style.setProperty('--dot-duration', (5 + Math.random() * 8) + 's');
        hero.appendChild(dot);
    }
}

window.addEventListener('load', () => {
    animateHeroTitle();
    createFloatingDots(10);
});
