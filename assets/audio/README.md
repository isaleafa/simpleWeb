# 音频文件目录说明

## 目录结构
```
assets/audio/
├── bgm/                    # 背景音乐目录
│   ├── track1.flac        # 你的第一个FLAC文件
│   ├── track2.flac        # 你的第二个FLAC文件
│   └── track3.flac        # 你的第三个FLAC文件
├── effects/               # 音效文件目录
└── README.md             # 本说明文件
```

## 使用步骤

### 1. 放置音频文件
请将你下载的三个FLAC文件重命名并放置到 `assets/audio/bgm/` 目录中：
- 第一个文件重命名为：`track1.flac`
- 第二个文件重命名为：`track2.flac`  
- 第三个文件重命名为：`track3.flac`

### 2. 支持的音频格式
- ✅ FLAC (无损音质)
- ✅ MP3 (压缩音质)
- ✅ WAV (无损音质)
- ✅ OGG (开源格式)

### 3. 文件命名建议
- 使用英文文件名，避免中文字符
- 文件名不要包含空格，使用下划线或连字符
- 保持文件扩展名小写

## 注意事项
- FLAC文件体积较大，加载可能需要一些时间
- 确保文件路径正确，否则播放器无法找到音频文件
- 如果遇到播放问题，请检查浏览器控制台的错误信息