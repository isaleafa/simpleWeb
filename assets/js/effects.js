/**
 * 视觉效果模块
 */
import { throttle, $, $$ } from './utils.js';

// 鼠标跟随光标效果类
class CursorEffect {
    constructor() {
        this.glow = $('.cursor-glow');
        this.init();
    }

    init() {
        // 仅在桌面端启用
        if (window.matchMedia('(min-width: 768px)').matches && this.glow) {
            const updateCursor = throttle((e) => {
                this.glow.style.left = `${e.clientX}px`;
                this.glow.style.top = `${e.clientY}px`;
            }, 16); // 约60fps
            
            document.addEventListener('mousemove', updateCursor);
        }
    }
}

// 粒子特效类
class ParticleEffect {
    constructor() {
        this.init();
    }

    init() {
        // 检查particlesJS是否可用并初始化
        if (typeof particlesJS !== 'undefined') {
            this.initParticles();
        }
    }

    initParticles() {
        const config = {
            "particles": {
                "number": {
                    "value": window.innerWidth < 768 ? 40 : 80,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "repulse" },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": {
                    "repulse": { "distance": 100 },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        };

        try {
            particlesJS('particles-js', config);
        } catch (error) {
        }
    }
}

// 滚动动画类
class ScrollAnimation {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1
        });

        $$('.fade-in-section').forEach(section => {
            observer.observe(section);
        });
    }
}

export { CursorEffect, ParticleEffect, ScrollAnimation };