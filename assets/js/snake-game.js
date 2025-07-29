/**
 * 贪吃蛇游戏模块
 */
import { $, $$, addEvent, debounce, addClass, removeClass } from './utils.js';

class SnakeGame {
    constructor() {
        this.canvas = $('#gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = $('#score');
        this.gameOverModal = $('#gameOverModal');
        this.finalScoreElement = $('#finalScore');
        this.restartButton = $('#restartButton');
        this.startGameButton = $('#startGameButton');
        this.gameControls = $('#game-controls');
        this.closeModalButton = $('#closeModalButton');
        this.mobileGameControls = $('#mobile-game-controls');
        this.difficultyButtons = $$('.difficulty-btn');

        this.speeds = { senior: 300, easy: 150, normal: 100, hard: 60 };
        this.currentDifficulty = 'normal';
        this.gridSize = 20;
        this.isGameRunning = false;
        this.gameInterval = null;
        
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.initGameVariables();
        this.bindEvents();
    }

    bindEvents() {
        // 难度选择
        this.difficultyButtons.forEach(button => {
            addEvent(button, 'click', () => this.selectDifficulty(button));
        });

        // 游戏控制
        addEvent(this.startGameButton, 'click', () => this.startGame());
        addEvent(this.restartButton, 'click', () => this.startGame());
        addEvent(this.closeModalButton, 'click', () => this.closeGameOverModal());

        // 键盘控制
        addEvent(document, 'keydown', (e) => this.handleKeydown(e));

        // 移动端控制
        addEvent($('#up-button'), 'click', () => this.setDirection('up'));
        addEvent($('#down-button'), 'click', () => this.setDirection('down'));
        addEvent($('#left-button'), 'click', () => this.setDirection('left'));
        addEvent($('#right-button'), 'click', () => this.setDirection('right'));

        // 窗口大小变化
        addEvent(window, 'resize', debounce(() => this.resizeCanvas(), 250));
    }

    selectDifficulty(button) {
        this.currentDifficulty = button.dataset.difficulty;
        this.difficultyButtons.forEach(btn => {
            removeClass(btn, 'bg-indigo-500');
            addClass(btn, 'bg-gray-700');
        });
        addClass(button, 'bg-indigo-500');
        removeClass(button, 'bg-gray-700');
    }

    resizeCanvas() {
        const size = this.canvas.clientWidth;
        this.canvas.width = size;
        this.canvas.height = size;
        this.gridSize = size / 20;
        if (this.isGameRunning) this.draw();
    }

    initGameVariables() {
        const headPosition = Math.floor(10 * (this.canvas.width / 400));
        this.snake = [{ x: headPosition, y: headPosition }];
        this.food = {};
        this.direction = 'right';
        this.score = 0;
        this.scoreElement.textContent = `分数: ${this.score}`;
    }

    generateFood() {
        const cols = this.canvas.width / this.gridSize;
        this.food = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * cols)
        };
        
        // 确保食物不在蛇身上
        for (let segment of this.snake) {
            if (segment.x === this.food.x && segment.y === this.food.y) {
                this.generateFood();
                return;
            }
        }
    }

    draw() {
        // 清空画布
        this.ctx.fillStyle = '#0c1220';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制蛇
        this.snake.forEach((segment, index) => {
            this.ctx.fillStyle = index === 0 ? '#34d399' : '#2dd4bf';
            this.ctx.fillRect(
                segment.x * this.gridSize, 
                segment.y * this.gridSize, 
                this.gridSize - 1, 
                this.gridSize - 1
            );
        });
        
        // 绘制食物
        this.ctx.fillStyle = '#f43f5e';
        this.ctx.fillRect(
            this.food.x * this.gridSize, 
            this.food.y * this.gridSize, 
            this.gridSize, 
            this.gridSize
        );
    }

    update() {
        if (!this.isGameRunning) return;
        
        const head = { ...this.snake[0] };
        
        // 移动蛇头
        switch (this.direction) {
            case 'up': head.y -= 1; break;
            case 'down': head.y += 1; break;
            case 'left': head.x -= 1; break;
            case 'right': head.x += 1; break;
        }
        
        const cols = this.canvas.width / this.gridSize;
        
        // 检查碰撞
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= cols || 
            this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }
        
        this.snake.unshift(head);
        
        // 检查是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;
            this.scoreElement.textContent = `分数: ${this.score}`;
            this.generateFood();
        } else {
            this.snake.pop();
        }
        
        this.draw();
    }

    gameOver() {
        this.isGameRunning = false;
        clearInterval(this.gameInterval);
        this.finalScoreElement.textContent = `你的最终分数是: ${this.score}`;
        removeClass(this.gameOverModal, 'hidden');
        addClass(this.gameOverModal, 'flex');
    }

    setDirection(newDirection) {
        if (!this.isGameRunning) return;
        
        const opposites = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };
        
        if (opposites[this.direction] !== newDirection) {
            this.direction = newDirection;
        }
    }

    handleKeydown(event) {
        if (!this.isGameRunning) return;
        
        const keyMap = {
            'ArrowUp': 'up', 'w': 'up', 'W': 'up',
            'ArrowDown': 'down', 's': 'down', 'S': 'down',
            'ArrowLeft': 'left', 'a': 'left', 'A': 'left',
            'ArrowRight': 'right', 'd': 'right', 'D': 'right'
        };
        
        const newDirection = keyMap[event.key];
        if (newDirection) {
            event.preventDefault();
            this.setDirection(newDirection);
        }
    }

    startGame() {
        this.isGameRunning = true;
        this.gameControls.style.display = 'none';
        removeClass(this.mobileGameControls, 'hidden');
        addClass(this.gameOverModal, 'hidden');
        removeClass(this.gameOverModal, 'flex');
        
        this.initGameVariables();
        this.generateFood();
        
        clearInterval(this.gameInterval);
        const gameSpeed = this.speeds[this.currentDifficulty];
        this.gameInterval = setInterval(() => this.update(), gameSpeed);
        
        this.draw();
    }

    closeGameOverModal() {
        addClass(this.gameOverModal, 'hidden');
        removeClass(this.gameOverModal, 'flex');
        this.gameControls.style.display = 'block';
        addClass(this.mobileGameControls, 'hidden');
    }
}

export default SnakeGame;