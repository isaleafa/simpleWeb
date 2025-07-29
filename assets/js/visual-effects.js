/**
 * 高级视觉效果模块
 */

// 流星雨效果类
class MeteorShower {
    constructor() {
        this.meteors = [];
        this.init();
    }

    init() {
        // 每3秒创建一个流星
        setInterval(() => {
            this.createMeteor();
        }, 3000);
    }

    createMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        
        // 随机位置
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        meteor.style.left = startX + 'px';
        meteor.style.top = startY + 'px';
        
        // 随机大小
        const size = Math.random() * 3 + 1;
        meteor.style.width = size + 'px';
        meteor.style.height = size + 'px';
        
        // 随机动画持续时间
        const duration = Math.random() * 2 + 2;
        meteor.style.animationDuration = duration + 's';
        
        document.body.appendChild(meteor);
        
        // 动画结束后移除元素
        setTimeout(() => {
            if (meteor.parentNode) {
                meteor.parentNode.removeChild(meteor);
            }
        }, duration * 1000);
    }
}

// 打字机效果类
class TypewriterEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.innerHTML = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.innerHTML += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// 3D卡片效果类
class Card3DEffect {
    constructor() {
        this.init();
    }

    init() {
        // 为技能图标添加3D效果
        const skillIcons = document.querySelectorAll('#skills .flex.flex-col');
        skillIcons.forEach(icon => {
            icon.classList.add('skill-icon');
        });

        // 为项目卡片添加3D效果
        const projectCards = document.querySelectorAll('#projects-grid > div');
        projectCards.forEach(card => {
            card.classList.add('project-card');
        });

        // 为按钮添加发光效果
        const buttons = document.querySelectorAll('button, a[class*="bg-"]');
        buttons.forEach(button => {
            button.classList.add('glow-button');
        });
    }
}

// 霓虹灯文字效果类
class NeonTextEffect {
    constructor() {
        this.init();
    }

    init() {
        // 为主标题添加霓虹灯效果
        const mainTitle = document.querySelector('.gradient-text');
        if (mainTitle) {
            mainTitle.classList.add('neon-text');
        }

        // 为技能标题添加脉冲光环
        const skillsTitle = document.querySelector('#skills h2');
        if (skillsTitle) {
            skillsTitle.classList.add('pulse-ring');
        }
    }
}

// 浮动动画效果类
class FloatingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // 为头像添加浮动效果
        const avatar = document.querySelector('#about img');
        if (avatar) {
            avatar.classList.add('float-animation');
        }

        // 为技能图标添加随机延迟的浮动效果
        const skillIcons = document.querySelectorAll('#skills svg');
        skillIcons.forEach((icon, index) => {
            icon.style.animationDelay = (index * 0.5) + 's';
            icon.parentElement.classList.add('float-animation');
        });
    }
}

// 鼠标跟随粒子效果类
class MouseParticles {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.createParticle(e.clientX, e.clientY);
        });
    }

    createParticle(x, y) {
        // 降低粒子生成频率
        if (Math.random() > 0.3) return;
        
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(20, 184, 166, 0.4)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.opacity = '0.6';
        particle.style.transition = 'all 1.5s ease-out';
        particle.style.boxShadow = '0 0 4px rgba(20, 184, 166, 0.3)';
        
        document.body.appendChild(particle);
        
        // 动画效果
        setTimeout(() => {
            particle.style.transform = 'scale(0) translateY(-20px)';
            particle.style.opacity = '0';
        }, 10);
        
        // 移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
    }
}

export { 
    MeteorShower, 
    TypewriterEffect, 
    Card3DEffect, 
    NeonTextEffect, 
    FloatingAnimation,
    MouseParticles 
};