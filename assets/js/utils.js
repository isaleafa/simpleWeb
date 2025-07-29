/**
 * 工具函数模块
 */

// 防抖函数
export function debounce(func, wait) {
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

// 节流函数
export function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// DOM 元素选择器
export function $(selector) {
    return document.querySelector(selector);
}

export function $$(selector) {
    return document.querySelectorAll(selector);
}

// 添加事件监听器
export function addEvent(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    }
}

// 切换类名
export function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

// 添加类名
export function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

// 移除类名
export function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}