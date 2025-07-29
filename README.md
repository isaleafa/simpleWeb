# Isaleafa 个人主页

一个现代化、响应式的个人作品集网站，展示开发技能、项目作品和个人信息。

## 🚀 功能特性

- **响应式设计** - 完美适配桌面和移动设备
- **动态视觉效果** - 粒子背景和鼠标跟随光标
- **GitHub项目展示** - 自动获取并展示开源项目
- **内置贪吃蛇游戏** - 多难度选择，支持键盘和触屏控制
- **滚动动画** - 页面元素随滚动淡入显示
- **模块化架构** - 代码分离，易于维护

## 📁 项目结构

```
simpleWeb/
├── index.html                 # 主页面
├── README.md                  # 项目说明
├── mypublicip                 # 公网IP记录
└── assets/                    # 资源文件夹
    ├── css/
    │   └── styles.css         # 样式文件
    ├── js/
    │   ├── app.js            # 主应用入口
    │   ├── utils.js          # 工具函数
    │   ├── effects.js        # 视觉效果模块
    │   ├── navigation.js     # 导航模块
    │   ├── projects.js       # 项目展示模块
    │   ├── snake-game.js     # 贪吃蛇游戏模块
    │   └── particles.min.js  # 粒子特效库
    └── images/
        └── avatar.jpg        # 头像图片
```

## 🛠️ 技术栈

- **前端框架**: 原生 HTML5 + CSS3 + JavaScript (ES6+)
- **样式框架**: Tailwind CSS
- **字体**: Google Fonts (Inter)
- **特效库**: Particles.js
- **模块系统**: ES6 Modules

## 📦 模块说明

### 🎨 样式模块 (`assets/css/styles.css`)
- 自定义CSS样式
- 响应式设计
- 动画效果
- 主题配色

### 🔧 工具模块 (`assets/js/utils.js`)
- 防抖和节流函数
- DOM操作辅助函数
- 事件处理工具

### ✨ 视觉效果模块 (`assets/js/effects.js`)
- `CursorEffect` - 鼠标跟随光标效果
- `ParticleEffect` - 粒子背景特效（依赖particles.min.js）
- `ScrollAnimation` - 滚动触发动画

### 📚 第三方库 (`assets/js/particles.min.js`)
- Particles.js 粒子特效库
- 提供丰富的粒子动画效果
- 支持交互式粒子系统

### 🧭 导航模块 (`assets/js/navigation.js`)
- 移动端菜单控制
- 导航交互逻辑

### 📂 项目展示模块 (`assets/js/projects.js`)
- GitHub API调用
- 项目卡片生成
- 错误处理和重试机制

### 🎮 游戏模块 (`assets/js/snake-game.js`)
- 完整的贪吃蛇游戏逻辑
- 难度选择系统
- 移动端控制支持

### 🚀 主应用模块 (`assets/js/app.js`)
- 模块初始化协调
- 应用生命周期管理

## 🎯 架构优势

1. **模块化设计** - 每个功能独立封装，职责清晰
2. **易于维护** - 修改某个功能不影响其他模块
3. **代码复用** - 工具函数可在多个模块中使用
4. **团队协作** - 不同开发者可以独立开发不同模块
5. **性能优化** - 可以按需加载模块
6. **测试友好** - 每个模块可以独立测试

## 🔄 模块依赖关系

```
app.js (主入口)
├── effects.js (视觉效果) ← 依赖 particles.min.js
├── navigation.js (导航)
├── projects.js (项目展示)
├── snake-game.js (游戏)
├── utils.js (工具函数) ← 被其他模块依赖
└── particles.min.js (第三方粒子库) ← 全局依赖
```
# Isaleafa 个人主页

一个现代化、响应式的个人作品集网站，展示开发技能、项目作品和个人信息。

## 🚀 功能特性

- **响应式设计** - 完美适配桌面和移动设备
- **动态视觉效果** - 粒子背景和鼠标跟随光标
- **GitHub项目展示** - 自动获取并展示开源项目
- **内置贪吃蛇游戏** - 多难度选择，支持键盘和触屏控制
- **滚动动画** - 页面元素随滚动淡入显示
- **模块化架构** - 代码分离，易于维护

## 📁 项目结构

```
simpleWeb/
├── index.html                 # 主页面
├── README.md                  # 项目说明
├── mypublicip                 # 公网IP记录
└── assets/                    # 资源文件夹
    ├── css/
    │   └── styles.css         # 样式文件
    ├── js/
    │   ├── app.js            # 主应用入口
    │   ├── utils.js          # 工具函数
    │   ├── effects.js        # 视觉效果模块
    │   ├── navigation.js     # 导航模块
    │   ├── projects.js       # 项目展示模块
    │   ├── snake-game.js     # 贪吃蛇游戏模块
    │   └── particles.min.js  # 粒子特效库
    └── images/
        └── avatar.jpg        # 头像图片
```

## 🛠️ 技术栈

- **前端框架**: 原生 HTML5 + CSS3 + JavaScript (ES6+)
- **样式框架**: Tailwind CSS
- **字体**: Google Fonts (Inter)
- **特效库**: Particles.js
- **模块系统**: ES6 Modules

## 📦 模块说明

### 🎨 样式模块 (`assets/css/styles.css`)
- 自定义CSS样式
- 响应式设计
- 动画效果
- 主题配色

### 🔧 工具模块 (`assets/js/utils.js`)
- 防抖和节流函数
- DOM操作辅助函数
- 事件处理工具

### ✨ 视觉效果模块 (`assets/js/effects.js`)
- `CursorEffect` - 鼠标跟随光标效果
- `ParticleEffect` - 粒子背景特效（依赖particles.min.js）
- `ScrollAnimation` - 滚动触发动画

### 📚 第三方库 (`assets/js/particles.min.js`)
- Particles.js 粒子特效库
- 提供丰富的粒子动画效果
- 支持交互式粒子系统

### 🧭 导航模块 (`assets/js/navigation.js`)
- 移动端菜单控制
- 导航交互逻辑

### 📂 项目展示模块 (`assets/js/projects.js`)
- GitHub API调用
- 项目卡片生成
- 错误处理和重试机制

### 🎮 游戏模块 (`assets/js/snake-game.js`)
- 完整的贪吃蛇游戏逻辑
- 难度选择系统
- 移动端控制支持

### 🚀 主应用模块 (`assets/js/app.js`)
- 模块初始化协调
- 应用生命周期管理

## 🎯 架构优势

1. **模块化设计** - 每个功能独立封装，职责清晰
2. **易于维护** - 修改某个功能不影响其他模块
3. **代码复用** - 工具函数可在多个模块中使用
4. **团队协作** - 不同开发者可以独立开发不同模块
5. **性能优化** - 可以按需加载模块
6. **测试友好** - 每个模块可以独立测试


## 💡 重要说明

- **particles.min.js** 是第三方粒子特效库，需要在模块加载前引入
- 所有自定义模块都使用 ES6 模块系统
- 项目采用渐进式加载，确保最佳性能体验

## 🚀 快速开始

1. 克隆项目到本地
2. 使用本地服务器打开 `index.html`
3. 或者直接在浏览器中打开文件

## 📱 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 📄 许可证

© 2025 Isaleafa. 保留所有权利。