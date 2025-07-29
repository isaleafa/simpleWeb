/**
 * 导航模块
 */
import { $, $$, addEvent, toggleClass, addClass } from './utils.js';

class Navigation {
    constructor() {
        this.mobileMenuButton = $('#mobile-menu-button');
        this.mobileMenu = $('#mobile-menu');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // 移动端菜单切换
        addEvent(this.mobileMenuButton, 'click', () => {
            toggleClass(this.mobileMenu, 'hidden');
        });

        // 点击菜单项后关闭菜单
        $$('#mobile-menu a').forEach(link => {
            addEvent(link, 'click', () => {
                addClass(this.mobileMenu, 'hidden');
            });
        });

        // 点击外部区域关闭菜单
        addEvent(document, 'click', (e) => {
            if (!this.mobileMenu.contains(e.target) && 
                !this.mobileMenuButton.contains(e.target)) {
                addClass(this.mobileMenu, 'hidden');
            }
        });
    }
}

export default Navigation;