# Telegram CRM WebApp

一个基于 Telegram WebApp 的客户管理系统。

## 功能特点

- 添加新客户
- 查看客户列表
- 编辑客户信息
- 删除客户
- 搜索客户

## 技术栈

- React
- TypeScript
- Vite
- Tailwind CSS
- Telegram WebApp SDK

## 开发环境设置

1. 克隆仓库：
```bash
git clone https://github.com/daji16868/telegram-crm-webapp.git
cd telegram-crm-webapp
```

2. 安装依赖：
```bash
npm install
```

3. 创建环境变量文件 `.env`：
```bash
VITE_BOT_TOKEN=your_bot_token
VITE_WEBAPP_URL=your_webapp_url
```

4. 启动开发服务器：
```bash
npm run dev
```

5. 构建生产版本：
```bash
npm run build
```

## 部署

本项目可以部署到 Vercel 等平台。部署时需要设置以下环境变量：

- `VITE_BOT_TOKEN`：Telegram Bot Token
- `VITE_WEBAPP_URL`：WebApp URL

## 许可证

MIT 