// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-purple-600');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-purple-600');
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission
    formMessage.classList.remove('hidden');
    formMessage.className = 'mt-4 p-4 rounded-lg text-white';
    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    formMessage.classList.add('bg-green-500');

    // Reset form
    contactForm.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
});

// Add typing effect to hero section
const heroTitle = document.querySelector('#home h1');
const heroText = heroTitle.innerHTML;
heroTitle.innerHTML = '';

let charIndex = 0;
function typeWriter() {
    if (charIndex < heroText.length) {
        heroTitle.innerHTML = heroText.slice(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.card-hover');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add dark mode toggle (optional feature)
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition z-50';
darkModeToggle.id = 'dark-mode-toggle';

document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        // Add dark mode styles
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        document.querySelectorAll('img, video').forEach(media => {
            media.style.filter = 'invert(1) hue-rotate(180deg)';
        });
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        // Remove dark mode styles
        document.body.style.filter = '';
        document.querySelectorAll('img, video').forEach(media => {
            media.style.filter = '';
        });
    }
});

// Add scroll to top button
const scrollToTop = document.createElement('button');
scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTop.className = 'fixed bottom-8 left-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition z-50 hidden';
scrollToTop.id = 'scroll-to-top';

document.body.appendChild(scrollToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.classList.remove('hidden');
    } else {
        scrollToTop.classList.add('hidden');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Tech Network Canvas Animation
class TechNetworkAnimation {
    constructor() {
        this.canvas = document.getElementById('techNetwork');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.animationId = null;
        
        this.init();
        this.animate();
        
        // Handle mouse movement
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Handle resize
        window.addEventListener('resize', () => this.init());
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Create nodes
        this.nodes = [];
        const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: this.getRandomColor(),
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(33, 150, 243, 0.8)',   // Bright Blue
            'rgba(59, 130, 246, 0.7)',   // Medium Blue
            'rgba(96, 165, 250, 0.6)',   // Light Blue
            'rgba(147, 197, 253, 0.5)',  // Very Light Blue
            'rgba(219, 234, 254, 0.4)'    // Pale Blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off walls
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
            
            // Keep nodes within bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            
            // Update pulse
            node.pulsePhase += 0.02;
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            const pulse = Math.sin(node.pulsePhase) * 0.3 + 1;
            
            // Draw glow effect
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * pulse * 4
            );
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulse * 4, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw core node
            this.ctx.fillStyle = node.color.replace('0.6', '1');
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.3;
                    
                    // Draw connection line
                    const gradient = this.ctx.createLinearGradient(
                        this.nodes[i].x, this.nodes[i].y,
                        this.nodes[j].x, this.nodes[j].y
                    );
                    gradient.addColorStop(0, `rgba(33, 150, 243, ${opacity})`);
                    gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity})`);
                    gradient.addColorStop(1, `rgba(96, 165, 250, ${opacity})`);
                    
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.stroke();
                    
                    // Draw data packet animation
                    const packetPosition = (Date.now() / 1000 + i * 0.5) % 1;
                    const packetX = this.nodes[i].x + dx * packetPosition;
                    const packetY = this.nodes[i].y + dy * packetPosition;
                    
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 2})`;
                    this.ctx.beginPath();
                    this.ctx.arc(packetX, packetY, 1, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
        }
    }
    
    drawMouseInteraction() {
        this.nodes.forEach(node => {
            const dx = node.x - this.mouseX;
            const dy = node.y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (1 - distance / 100) * 2;
                node.vx += (dx / distance) * force * 0.01;
                node.vy += (dy / distance) * force * 0.01;
                
                // Draw connection to mouse
                const opacity = (1 - distance / 100) * 0.5;
                this.ctx.strokeStyle = `rgba(33, 150, 243, ${opacity})`;
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(node.x, node.y);
                this.ctx.lineTo(this.mouseX, this.mouseY);
                this.ctx.stroke();
            }
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Apply dark overlay for better visibility
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateNodes();
        this.drawConnections();
        this.drawMouseInteraction();
        this.drawNodes();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Smoke Animation Class
class SmokeAnimation {
    constructor() {
        this.container = document.getElementById('smokeContainer');
        this.particles = [];
        this.maxParticles = 8;
        this.colors = [
            'rgba(33, 150, 243, 0.15)',   // Bright Blue
            'rgba(59, 130, 246, 0.12)',   // Medium Blue
            'rgba(96, 165, 250, 0.10)',   // Light Blue
            'rgba(147, 197, 253, 0.08)',  // Very Light Blue
            'rgba(219, 234, 254, 0.06)'    // Pale Blue
        ];
        
        this.init();
        this.animate();
    }
    
    init() {
        // Create initial smoke particles
        for (let i = 0; i < this.maxParticles; i++) {
            setTimeout(() => {
                this.createSmokeParticle();
            }, i * 2000);
        }
    }
    
    createSmokeParticle() {
        const particle = document.createElement('div');
        particle.className = 'smoke-particle';
        
        // Random properties for variety
        const size = Math.random() * 200 + 100;
        const startX = Math.random() * window.innerWidth;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}px`;
        particle.style.bottom = '-100px';
        particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add drift animation
        const driftX = (Math.random() - 0.5) * 100;
        particle.style.animation += `, smokeDrift ${duration * 2}s infinite ease-in-out`;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
            // Create new particle to maintain count
            this.createSmokeParticle();
        }, (duration + delay) * 1000);
    }
    
    animate() {
        // Continuous animation loop
        requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
    }
}

// Initialize animations
let techNetwork;
let smokeAnimation;

document.addEventListener('DOMContentLoaded', () => {
    techNetwork = new TechNetworkAnimation();
    smokeAnimation = new SmokeAnimation();
});

// Add console welcome message
console.log('%c👋 Welcome to my portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code and reach out if you have any questions!', 'color: #764ba2; font-size: 14px;');
