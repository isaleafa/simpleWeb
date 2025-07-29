/**
 * GitHub 项目展示模块
 */
import { $ } from './utils.js';

class ProjectsManager {
    constructor() {
        this.projectsGrid = $('#projects-grid');
        this.repoNames = ['isaleafa/Shell-Cpp-Dash', 'isaleafa/AIagent', 'isaleafa/Animal-Helper'];
        this.customDescriptions = {
            'Shell-Cpp-Dash': '一个用 C++ 构建的高性能、轻量级命令行 Shell，旨在提供一个快速、流畅且可定制的终端交互体验。',
            'AIagent': '探索大型语言模型潜力的智能代理程序。它能够理解并执行自然语言指令，旨在成为强大的个人数字助手。',
            'Animal-Helper': '一款为宠物爱好者和动物救援者设计的移动应用。它提供信息查询、健康记录和社区互助功能，让关爱动物变得更简单。'
        };
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.fetchGithubProjects();
        });
    }

    showLoading() {
        this.projectsGrid.innerHTML = '<p class="text-slate-400 text-center col-span-1 md:col-span-3 loading">正在从 GitHub 加载指定的项目...</p>';
    }

    showError() {
        this.projectsGrid.innerHTML = `
            <div class="col-span-1 md:col-span-3 text-center error">
                <p>加载项目失败。请检查网络连接或稍后再试。</p>
                <button onclick="window.projectsManager.fetchGithubProjects()" class="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400 transition">
                    重试
                </button>
            </div>
        `;
    }

    createProjectCard(repo) {
        const description = this.customDescriptions[repo.name] || repo.description || '没有提供描述。';
        const projectCard = document.createElement('div');
        projectCard.className = 'glassmorphism rounded-xl p-6 transform hover:-translate-y-2 transition duration-300 flex flex-col h-full';
        
        projectCard.innerHTML = `
            <div class="flex-grow">
                <h3 class="text-2xl font-bold text-white mb-2">${repo.name}</h3>
                <p class="text-slate-400 mb-4">${description}</p>
                <div class="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    ${repo.language ? `<span class="flex items-center gap-1">
                        <span class="w-3 h-3 rounded-full bg-blue-500"></span>
                        ${repo.language}
                    </span>` : ''}
                    ${repo.stargazers_count ? `<span>⭐ ${repo.stargazers_count}</span>` : ''}
                    ${repo.forks_count ? `<span>🍴 ${repo.forks_count}</span>` : ''}
                </div>
            </div>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:text-teal-300 font-semibold mt-auto">
                在 GitHub 上查看 &rarr;
            </a>
        `;
        
        return projectCard;
    }

    async fetchGithubProjects() {
        this.showLoading();
        
        try {
            const fetchPromises = this.repoNames.map(repoName => 
                fetch(`https://api.github.com/repos/${repoName}`, {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                })
            );
            
            const responses = await Promise.all(fetchPromises);
            
            // 检查响应状态
            for (const response of responses) {
                if (!response.ok) {
                    throw new Error(`GitHub API 请求失败: ${response.status}`);
                }
            }
            
            const repos = await Promise.all(responses.map(res => res.json()));
            this.projectsGrid.innerHTML = ''; 
            
            repos.forEach(repo => {
                const projectCard = this.createProjectCard(repo);
                this.projectsGrid.appendChild(projectCard);
            });
            
        } catch (error) {
            this.showError();
        }
    }
}

export default ProjectsManager;