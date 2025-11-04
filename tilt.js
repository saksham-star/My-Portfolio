class TiltEffect {
    constructor(element) {
        this.element = element;
        this.setupTilt();
    }

    setupTilt() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            this.element.style.transition = 'none';
            
            // Add highlight effect
            const glarePosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
            this.element.style.setProperty('--glare-position', glarePosition);
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            this.element.style.transition = 'transform 0.5s ease';
        });
    }
}

// Initialize tilt effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    new TiltEffect(card);
});