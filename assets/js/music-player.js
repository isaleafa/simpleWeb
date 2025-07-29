/**
 * 网易云风格音乐播放器
 */
export class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentTrack = 0;
        this.volume = 0.3;
        this.currentTime = 0;
        this.duration = 0;
        this.isVisible = false;
        this.playlist = [];
        this.config = null;
        
        this.audio = new Audio();
        this.loadConfig().then(() => {
            this.init();
        });
    }
    
    // 从配置文件加载音乐数据
    async loadConfig() {
        try {
            const response = await fetch('assets/audio/music-config.json');
            this.config = await response.json();
            this.playlist = this.config.playlist;
            
            // 加载保存的音量设置，如果没有则使用配置文件中的默认值
            this.volume = this.loadVolumeFromStorage();
            
        } catch (error) {
            // 使用默认配置
            this.playlist = [
                {
                    id: "track1",
                    title: "音乐作品 1",
                    artist: "Isaleafa",
                    cover: "assets/images/avatar.jpg",
                    src: "assets/audio/bgm/track1.flac"
                }
            ];
            this.volume = 0.3; // 默认音量30%
        }
    }
    
    init() {
        this.createPlayerHTML();
        this.bindEvents();
        this.loadTrack(0);
        this.createPlaylist();
        
        // 自动播放第一首歌曲
        setTimeout(() => {
            this.autoPlay();
        }, 1000); // 延迟1秒后自动播放
    }
    
    // 自动播放功能
    async autoPlay() {
        try {
            // 设置音量
            this.audio.volume = this.volume;
            
            // 尝试播放
            await this.audio.play();
            this.isPlaying = true;
            this.updatePlayButton();
            this.startVinylRotation();
            
            // 延迟启动图标旋转，确保DOM已完全加载
            setTimeout(() => {
                this.startMusicIconRotation();
            }, 500);
            
        } catch (error) {
            // 如果自动播放失败，等待用户点击页面后再播放
            this.setupAutoPlayOnUserInteraction();
        }
    }
    
    // 设置用户交互后自动播放
    setupAutoPlayOnUserInteraction() {
        const playOnInteraction = async () => {
            try {
                await this.audio.play();
                this.isPlaying = true;
                this.updatePlayButton();
                this.startVinylRotation();
                
                // 延迟启动图标旋转
                setTimeout(() => {
                    this.startMusicIconRotation();
                }, 500);
                
                // 移除事件监听器
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('keydown', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
            } catch (error) {
            }
        };
        
        // 监听用户的第一次交互
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('keydown', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
    }
    
    // 开始音符图标旋转
    startMusicIconRotation() {
        const musicTrigger = document.getElementById('music-trigger');
        if (musicTrigger) {
            musicTrigger.classList.add('rotating');
        }
    }
    
    // 停止音符图标旋转
    stopMusicIconRotation() {
        const musicTrigger = document.getElementById('music-trigger');
        if (musicTrigger) {
            musicTrigger.classList.remove('rotating');
        }
    }
    
    createPlayerHTML() {
        const playerHTML = `
            <div id="music-player" class="music-player hidden">
                <div class="player-card">
                    <!-- 关闭按钮 -->
                    <button class="close-btn" id="close-player">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    
                    <!-- 播放器主体 -->
                    <div class="player-content">
                        <!-- 音乐目录按钮 -->
                        <button class="playlist-toggle-btn" id="playlist-toggle">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                            </svg>
                            <span>播放列表</span>
                        </button>
                        
                        <!-- 音乐目录面板 -->
                        <div id="playlist-panel" class="playlist-panel hidden">
                            <div class="playlist-header">
                                <h3>播放列表</h3>
                                <span class="playlist-count">共 ${this.playlist.length} 首</span>
                            </div>
                            <div class="playlist-content" id="playlist-content">
                                <!-- 播放列表将在这里动态生成 -->
                            </div>
                        </div>
                        
                        <!-- 居中的专辑封面和控制区域 -->
                        <div class="main-player-section">
                            <!-- 专辑封面 -->
                            <div class="album-cover-container">
                                <div class="vinyl-record">
                                    <img id="album-cover" src="" alt="专辑封面" class="album-cover">
                                    <div class="vinyl-center"></div>
                                </div>
                                <div class="needle"></div>
                            </div>
                            
                            <!-- 歌曲信息 -->
                            <div class="song-info">
                                <h3 id="song-title" class="song-title">歌曲标题</h3>
                                <p id="song-artist" class="song-artist">艺术家</p>
                                <p id="song-album" class="song-album">专辑名称</p>
                            </div>
                            
                            <!-- 播放控制 -->
                            <div class="player-controls">
                                <!-- 进度条 -->
                                <div class="progress-container">
                                    <span id="current-time" class="time">0:00</span>
                                    <div class="progress-bar">
                                        <div id="progress-fill" class="progress-fill"></div>
                                        <div id="progress-handle" class="progress-handle"></div>
                                    </div>
                                    <span id="duration-time" class="time">0:00</span>
                                </div>
                                
                                <!-- 控制按钮 -->
                                <div class="control-buttons">
                                    <button id="prev-btn" class="control-btn">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"></path>
                                        </svg>
                                    </button>
                                    <button id="play-pause-btn" class="control-btn play-btn">
                                        <svg id="play-icon" class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                                        </svg>
                                        <svg id="pause-icon" class="w-8 h-8 hidden" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                    <button id="next-btn" class="control-btn">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 水平音量控制 -->
                        <div class="volume-control">
                            <button id="volume-btn" class="volume-btn">
                                <svg id="volume-icon" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.793A1 1 0 019.383 3.076zM8 5.04L5.707 7.293A1 1 0 005 8H3v4h2a1 1 0 01.707.293L8 14.96V5.04zm4.95.535a1 1 0 011.414 0c2.929 2.929 2.929 7.678 0 10.607a1 1 0 11-1.414-1.414c2.122-2.121 2.122-5.565 0-7.686a1 1 0 010-1.414zm-2.12 2.121a1 1 0 011.414 0 3 3 0 010 4.243 1 1 0 11-1.414-1.414 1 1 0 000-1.414 1 1 0 010-1.415z" clip-rule="evenodd"></path>
                                </svg>
                                <svg id="mute-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.793A1 1 0 019.383 3.076zM8 5.04L5.707 7.293A1 1 0 005 8H3v4h2a1 1 0 01.707.293L8 14.96V5.04zm6.707 5.293a1 1 0 010 1.414L13.414 13l1.293 1.293a1 1 0 01-1.414 1.414L12 14.414l-1.293 1.293a1 1 0 01-1.414-1.414L10.586 13l-1.293-1.293a1 1 0 011.414-1.414L12 11.586l1.293-1.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </button>
                            <div class="volume-slider-container">
                                <input type="range" id="volume-slider" class="volume-slider" min="0" max="100" value="30">
                                <div class="volume-percentage">30%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', playerHTML);
    }
    
    bindEvents() {
        this.playerElement = document.getElementById('music-player');
        
        // 播放/暂停按钮
        document.getElementById('play-pause-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePlay();
        });
        
        // 上一首/下一首
        document.getElementById('prev-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.previousTrack();
        });

        document.getElementById('next-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextTrack();
        });
        
        // 关闭播放器
        document.getElementById('close-player').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.hide();
        });
        
        // 播放列表切换
        document.getElementById('playlist-toggle').addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePlaylist();
        });
        
        // 点击背景关闭 - 添加延迟避免立即触发
        // 移除背景点击关闭功能，避免误触导致立即关闭
        // 现在只能通过关闭按钮来关闭播放器
        
        // 音频事件
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
            this.updateTimeDisplay();
        });
        
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime;
            this.updateProgress();
            this.updateVisualizer();
        });
        
        this.audio.addEventListener('ended', () => {
            this.nextTrack();
        });
        
        // 进度条拖拽
        this.bindProgressEvents();
        
        // 音量控制
        this.bindVolumeEvents();
    }
    
    bindProgressEvents() {
        const progressBar = document.querySelector('.progress-bar');
        const progressHandle = document.getElementById('progress-handle');
        let isDragging = false;
        
        const startDrag = (e) => {
            isDragging = true;
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', endDrag);
        };
        
        const drag = (e) => {
            if (!isDragging) return;
            
            const rect = progressBar.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            this.audio.currentTime = percent * this.duration;
        };
        
        const endDrag = () => {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', endDrag);
        };
        
        progressHandle.addEventListener('mousedown', startDrag);
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audio.currentTime = percent * this.duration;
        });
    }
    
    // 绑定音量控制事件
    bindVolumeEvents() {
        const volumeSlider = document.getElementById('volume-slider');
        const volumeBtn = document.getElementById('volume-btn');
        const volumePercentage = document.querySelector('.volume-percentage');
        const volumeIcon = document.getElementById('volume-icon');
        const muteIcon = document.getElementById('mute-icon');
        
        if (!volumeSlider) {
            return;
        }
        
        if (!volumeBtn) {
            return;
        }
        
        // 音量滑块变化事件
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.setVolume(volume);
            if (volumePercentage) {
                volumePercentage.textContent = `${e.target.value}%`;
            }
            this.updateVolumeIcon(volume);
            this.saveVolumeToConfig(volume);
        });
        
        // 音量滑块拖拽事件
        volumeSlider.addEventListener('change', (e) => {
            const volume = e.target.value / 100;
            this.setVolume(volume);
            if (volumePercentage) {
                volumePercentage.textContent = `${e.target.value}%`;
            }
            this.updateVolumeIcon(volume);
            this.saveVolumeToConfig(volume);
        });
        
        // 静音按钮点击
        volumeBtn.addEventListener('click', () => {
            this.toggleMute();
        });
        
        // 初始化音量显示
        volumeSlider.value = this.volume * 100;
        if (volumePercentage) {
            volumePercentage.textContent = `${Math.round(this.volume * 100)}%`;
        }
        this.updateVolumeIcon(this.volume);
    }
    
    // 设置音量
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.audio.volume = this.volume;
        
        // 实时更新配置中的音量设置
        if (this.config && this.config.settings) {
            this.config.settings.defaultVolume = this.volume;
        }
    }
    
    // 切换静音
    toggleMute() {
        const volumeSlider = document.getElementById('volume-slider');
        const volumePercentage = document.querySelector('.volume-percentage');
        
        if (this.volume > 0) {
            // 保存当前音量并静音
            this.previousVolume = this.volume;
            this.setVolume(0);
            volumeSlider.value = 0;
            volumePercentage.textContent = '0%';
        } else {
            // 恢复之前的音量
            const restoreVolume = this.previousVolume || (this.config?.settings?.defaultVolume || 0.3);
            this.setVolume(restoreVolume);
            volumeSlider.value = restoreVolume * 100;
            volumePercentage.textContent = `${Math.round(restoreVolume * 100)}%`;
        }
        this.updateVolumeIcon(this.volume);
    }
    
    // 更新音量图标
    updateVolumeIcon(volume) {
        const volumeIcon = document.getElementById('volume-icon');
        const muteIcon = document.getElementById('mute-icon');
        
        if (volume === 0) {
            volumeIcon.classList.add('hidden');
            muteIcon.classList.remove('hidden');
        } else {
            volumeIcon.classList.remove('hidden');
            muteIcon.classList.add('hidden');
        }
    }
    
    loadTrack(index) {
        const track = this.playlist[index];
        this.currentTrack = index;
        
        // 更新音频源
        this.audio.src = track.src;
        
        // 确保音频音量与当前设置一致
        this.audio.volume = this.volume;
        
        // 更新UI
        document.getElementById('album-cover').src = track.cover;
        document.getElementById('song-title').textContent = track.title;
        document.getElementById('song-artist').textContent = track.artist;
        
        // 更新音量控制显示
        this.updateVolumeDisplay();
        
        // 初始化可视化效果
        this.initVisualizer();
    }
    
    // 更新音量显示
    updateVolumeDisplay() {
        const volumeSlider = document.getElementById('volume-slider');
        const volumePercentage = document.querySelector('.volume-percentage');
        
        if (volumeSlider && volumePercentage) {
            volumeSlider.value = this.volume * 100;
            volumePercentage.textContent = `${Math.round(this.volume * 100)}%`;
            this.updateVolumeIcon(this.volume);
        }
    }
    
    initVisualizer() {
        // 初始化音乐可视化效果
        const bars = document.querySelectorAll('.visualizer-bars .bar');
        bars.forEach((bar, index) => {
            bar.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    updateVisualizer() {
        // 更新音乐可视化效果
        if (this.isPlaying) {
            const bars = document.querySelectorAll('.visualizer-bars .bar');
            bars.forEach(bar => {
                const height = Math.random() * 100 + 20;
                bar.style.height = `${height}%`;
            });
        }
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.audio.play();
        this.isPlaying = true;
        this.updatePlayButton();
        this.startVinylRotation();
        this.startMusicIconRotation();
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
        this.stopVinylRotation();
        this.stopMusicIconRotation();
    }
    
    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    previousTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    updatePlayButton() {
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        
        if (this.isPlaying) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        } else {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    }
    
    updateProgress() {
        const percent = (this.currentTime / this.duration) * 100;
        document.getElementById('progress-fill').style.width = `${percent}%`;
        document.getElementById('progress-handle').style.left = `${percent}%`;
        this.updateTimeDisplay();
    }
    
    updateTimeDisplay() {
        document.getElementById('current-time').textContent = this.formatTime(this.currentTime);
        document.getElementById('duration-time').textContent = this.formatTime(this.duration);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    startVinylRotation() {
        const vinyl = document.querySelector('.vinyl-record');
        vinyl.classList.add('spinning');
    }
    
    stopVinylRotation() {
        const vinyl = document.querySelector('.vinyl-record');
        vinyl.classList.remove('spinning');
    }
    
    show() {
        const player = document.getElementById('music-player');
        player.classList.remove('hidden');
        this.isVisible = true;
        
        // 添加显示动画，给用户更多时间适应
        setTimeout(() => {
            player.classList.add('show');
        }, 50);
        
        // 确保播放列表在初始显示时是隐藏的
        const playlistPanel = document.getElementById('playlist-panel');
        if (playlistPanel && !playlistPanel.classList.contains('hidden')) {
            playlistPanel.classList.add('hidden');
            playlistPanel.classList.remove('show');
        }
    }
    
    hide() {
        const player = document.getElementById('music-player');
        player.classList.remove('show');
        this.isVisible = false;
        
        // 延迟隐藏
        setTimeout(() => {
            player.classList.add('hidden');
        }, 300);
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    // 创建播放列表
    createPlaylist() {
        const playlistContent = document.getElementById('playlist-content');
        
        playlistContent.innerHTML = this.playlist.map((track, index) => `
            <div class="playlist-item ${index === this.currentTrack ? 'active' : ''}" data-index="${index}">
                <div class="track-cover">
                    <img src="${track.cover}" alt="${track.title}">
                    <div class="play-overlay">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
                <div class="track-info">
                    <div class="track-title">${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>
                <div class="track-duration" id="duration-${index}">--:--</div>
            </div>
        `).join('');
        
        // 绑定播放列表项点击事件
        playlistContent.addEventListener('click', (e) => {
            const playlistItem = e.target.closest('.playlist-item');
            if (playlistItem) {
                const index = parseInt(playlistItem.dataset.index);
                this.playTrack(index);
            }
        });
        
        // 异步加载每首歌的真实时长
        this.loadTrackDurations();
    }
    
    // 加载所有歌曲的真实时长
    async loadTrackDurations() {
        for (let i = 0; i < this.playlist.length; i++) {
            this.loadSingleTrackDuration(i);
        }
    }
    
    // 加载单首歌曲的真实时长
    loadSingleTrackDuration(index) {
        const track = this.playlist[index];
        const tempAudio = new Audio();
        
        tempAudio.addEventListener('loadedmetadata', () => {
            const duration = this.formatTime(tempAudio.duration);
            const durationElement = document.getElementById(`duration-${index}`);
            if (durationElement) {
                durationElement.textContent = duration;
            }
            // 缓存时长到播放列表数据中
            this.playlist[index].realDuration = tempAudio.duration;
        });
        
        tempAudio.addEventListener('error', () => {
            const durationElement = document.getElementById(`duration-${index}`);
            if (durationElement) {
                durationElement.textContent = '--:--';
            }
        });
        
        tempAudio.src = track.src;
    }
    
    // 切换播放列表显示
    togglePlaylist() {
        const playlistPanel = document.getElementById('playlist-panel');
        const isHidden = playlistPanel.classList.contains('hidden');
        
        if (isHidden) {
            // 显示播放列表 - 增加延迟让用户有时间看到变化
            playlistPanel.classList.remove('hidden');
            setTimeout(() => {
                playlistPanel.classList.add('show');
            }, 100); // 从10ms增加到100ms
        } else {
            // 隐藏播放列表 - 增加动画时间
            playlistPanel.classList.remove('show');
            setTimeout(() => {
                playlistPanel.classList.add('hidden');
            }, 400); // 从300ms增加到400ms
        }
    }
    
    // 播放指定曲目
    playTrack(index) {
        this.loadTrack(index);
        this.play();
        this.updatePlaylistActive();
        
        // 关闭播放列表
        setTimeout(() => {
            this.togglePlaylist();
        }, 500);
    }
    
    // 更新播放列表中的活跃状态
    updatePlaylistActive() {
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentTrack);
        });
    }
    
    // 保存音量设置到本地存储
    saveVolumeToConfig(volume) {
        try {
            // 保存到本地存储
            localStorage.setItem('musicPlayerVolume', volume.toString());
            
            // 更新内存中的配置
            if (this.config && this.config.settings) {
                this.config.settings.defaultVolume = volume;
            }
            
        } catch (error) {
        }
    }
    
    // 从本地存储加载音量设置
    loadVolumeFromStorage() {
        try {
            const savedVolume = localStorage.getItem('musicPlayerVolume');
            if (savedVolume !== null) {
                const volume = parseFloat(savedVolume);
                if (!isNaN(volume) && volume >= 0 && volume <= 1) {
                    this.volume = volume;
                    return volume;
                }
            }
        } catch (error) {
        }
        
        // 如果没有保存的设置，使用配置文件中的默认值
        return this.config?.settings?.defaultVolume || 0.3;
    }
}
