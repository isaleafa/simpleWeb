# simpleWeb

### 2. 最终部署指南

这是将你的网站部署到服务器的最终指南，包含了本地化脚本的步骤。


### 部署你的个人网站到阿里云服务器（最终版）

---

#### **第一步：准备所有网站文件**

在你的电脑上，确保你拥有以下三个文件，并将它们放在同一个文件夹里，方便上传：

1.  **`index.html`**：我们最终版本的网站代码。
2.  **`avatar.jpg`**：你的个人头像图片。
3.  **`particles.min.js`**：粒子特效的脚本文件。
    * **如何下载**：点击此链接 -> [下载 particles.min.js](https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js) <- ，浏览器会打开一个满是代码的页面。右键点击页面，选择“另存为...”，并将其保存为 `particles.min.js`。

---

#### **第二步：连接到你的阿里云服务器**

使用 SSH 客户端远程连接到你的服务器。
```bash
ssh root@106.15.207.88
```

---

#### **第三步：创建并上传文件到专属目录**

1.  **在服务器上创建目录**：
    ```bash
    # 在 /var/www/ 下创建一个名为 isaleafa_portfolio 的新目录
    sudo mkdir -p /var/www/isaleafa_portfolio
    ```

2.  **上传所有文件**：**在你本地电脑的终端或命令提示符中**，使用 `scp` 命令将你准备好的三个文件一次性全部上传。
    ```bash
    # 将 "C:/路径/到/你的文件夹/" 替换成你存放文件的文件夹路径
    scp C:/路径/到/你的文件夹/* root@106.15.207.88:/var/www/isaleafa_portfolio/
    ```
    * `*` 是一个通配符，表示上传该文件夹下的所有文件。

---

#### **第四步：修复文件权限**

**在你的服务器上**运行以下命令，以避免 "403 Forbidden" 错误。

```bash
# 授予目录正确的权限
sudo chmod 755 /var/www/isaleafa_portfolio

# 授予该目录下所有文件正确的读取权限
sudo chmod 644 /var/www/isaleafa_portfolio/*
```

---

#### **第五步：配置 Nginx**

1.  **创建新的 Nginx 配置文件**：
    ```bash
    sudo nano /etc/nginx/sites-available/isaleafa_portfolio
    ```
2.  **粘贴配置内容**：将下面的配置完整地粘贴到编辑器中。
    ```nginx
    server {
        listen 80;
        listen [::]:80;

        root /var/www/isaleafa_portfolio;
        index index.html;

        server_name 你的服务器公网IP地址 你的域名.xin;

        location / {
            try_files $uri $uri/ =404;
        }
    }
    ```
    * **重要**：将 `你的服务器公网IP地址` 和 `你的域名.xin` 替换成你自己的信息。
    * 按 `Ctrl + X`，然后按 `Y`，最后按 `Enter` 保存并退出。

3.  **启用新配置并禁用旧配置**：
    ```bash
    # 启用新网站
    sudo ln -s /etc/nginx/sites-available/isaleafa_portfolio /etc/nginx/sites-enabled/
    
    # （如果存在）禁用默认欢迎页，防止冲突
    sudo rm /etc/nginx/sites-enabled/default
    ```

4.  **测试并重启 Nginx**：
    ```bash
    sudo nginx -t
    sudo systemctl restart nginx
    ```

---

#### **第六步：检查阿里云安全组**

确保安全组规则允许 HTTP (80端口) 的流量进入。

1.  登录**阿里云控制台** -> **ECS 实例** -> **安全组**。
2.  找到实例使用的安全组，点击 **“配置规则”**。
3.  在“入方向”确保有这样一条规则：
    * **协议类型**：自定义 TCP
    * **端口范围**：80/80
    * **授权对象**：0.0.0.0/0

---

#### **第七步：访问你的网站！**

现在，清除你手机和电脑的浏览器缓存，然后再次访问你的网站。无论是通过 IP 还是域名，它都应该能实现