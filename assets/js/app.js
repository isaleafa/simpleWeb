/**
 * 主应用入口文件
 */
import { CursorEffect, ParticleEffect, ScrollAnimation } from './effects.js';
import Navigation from './navigation.js';
import ProjectsManager from './projects.js';
import SnakeGame from './snake-game.js';
import { 
    MeteorShower, 
    TypewriterEffect, 
    Card3DEffect, 
    NeonTextEffect, 
    FloatingAnimation,
    MouseParticles 
} from './visual-effects.js';
import { MusicPlayer } from './music-player.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        // 等待 DOM 加载完成
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeModules();
        });
    }

    initializeModules() {
        // 初始化基础视觉效果
        new CursorEffect();
        new ParticleEffect();
        new ScrollAnimation();

        // 初始化高级视觉效果
        new MeteorShower();
        new Card3DEffect();
        new NeonTextEffect();
        new FloatingAnimation();
        new MouseParticles();

        // 初始化打字机效果
        const heroTitle = document.querySelector('.gradient-text');
        if (heroTitle) {
            const typewriter = new TypewriterEffect(heroTitle, '代码构建世界', 150);
            setTimeout(() => typewriter.start(), 1000);
        }

        // 初始化导航
        new Navigation();

        // 初始化项目展示
        window.projectsManager = new ProjectsManager();

        // 初始化游戏
        new SnakeGame();

        // 初始化音乐播放器
        window.musicPlayer = new MusicPlayer();
        
        // 绑定音乐播放器触发按钮
        this.bindMusicTrigger();

    }

    bindMusicTrigger() {
        let isEventBound = false;
        
        // 方法1：立即尝试绑定
        const tryBind = () => {
            const musicTrigger = document.getElementById('music-trigger');
            if (musicTrigger && !isEventBound) {
                musicTrigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation(); // 阻止事件冒泡
                    if (window.musicPlayer) {
                        window.musicPlayer.toggle();
                        // 延迟更新按钮状态，确保 isVisible 状态已更新
                        setTimeout(() => {
                            musicTrigger.classList.toggle('playing', window.musicPlayer.isVisible);
                            // 同步旋转状态
                            if (window.musicPlayer.isPlaying) {
                                musicTrigger.classList.add('rotating');
                            } else {
                                musicTrigger.classList.remove('rotating');
                            }
                        }, 100);
                    }
                });
                isEventBound = true;
                return true;
            }
            return false;
        };

        // 立即尝试
        if (!tryBind()) {
            // 方法2：延迟绑定
            setTimeout(() => {
                if (!tryBind()) {
                    // 方法3：使用事件委托作为最后的备用方案
                    if (!isEventBound) {
                        document.addEventListener('click', (e) => {
                            if (e.target.id === 'music-trigger' || e.target.closest('#music-trigger')) {
                                e.preventDefault();
                                e.stopPropagation();
                                if (window.musicPlayer) {
                                    window.musicPlayer.toggle();
                                    const trigger = document.getElementById('music-trigger');
                                    if (trigger) {
                                        setTimeout(() => {
                                            trigger.classList.toggle('playing', window.musicPlayer.isVisible);
                                            // 同步旋转状态
                                            if (window.musicPlayer.isPlaying) {
                                                trigger.classList.add('rotating');
                                            } else {
                                                trigger.classList.remove('rotating');
                                            }
                                        }, 100);
                                    }
                                }
                            }
                        });
                        isEventBound = true;
                    }
                }
            }, 500);
        }
        
        // 监听音乐播放状态变化，同步图标旋转
        this.syncMusicIconRotation();
    }
    
    // 同步音符图标旋转状态
    // 同步音符图标旋转状态
    syncMusicIconRotation() {
        const checkAndSync = () => {
            const musicTrigger = document.getElementById('music-trigger');
            if (musicTrigger && window.musicPlayer) {
                
                if (window.musicPlayer.isPlaying) {
                    musicTrigger.classList.add('rotating');
                    
                    // 强制重新应用样式
                    musicTrigger.style.animation = 'rotate-music 3s linear infinite, pulse-music 2s infinite';
                    const svg = musicTrigger.querySelector('svg');
                    if (svg) {
                        svg.style.animation = 'rotate-icon 2s linear infinite';
                    }
                } else {
                    musicTrigger.classList.remove('rotating');
                    
                    // 清除内联样式
                    musicTrigger.style.animation = '';
                    const svg = musicTrigger.querySelector('svg');
                    if (svg) {
                        svg.style.animation = '';
                    }
                }
            } else {
            }
        };
        
        // 定期检查播放状态并同步
        setInterval(checkAndSync, 1000);
        
        // 立即执行一次
        setTimeout(checkAndSync, 2000);
    }
}

// 启动应用
new App();