import { Telegraf, Context } from 'telegraf';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Customer } from './types/customer';
import { customerService } from './services/customerService';

// 加载环境变量
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);
const app = express();

// 配置 Express 中间件
app.use(cors());
app.use(express.json());

// API 路由
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await customerService.getCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: '获取客户列表失败' });
  }
});

app.get('/api/customers/search', async (req, res) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: '请提供搜索关键词' });
    }
    const customers = await customerService.searchCustomers(query);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: '搜索客户失败' });
  }
});

// Bot 命令处理
bot.command('start', (ctx) => {
  ctx.reply('欢迎使用客户管理系统！\n\n' +
    '可用命令：\n' +
    '/start - 显示此帮助信息\n' +
    '/newcustomer - 添加新客户\n' +
    '/list - 查看客户列表\n' +
    '/help - 获取帮助');
});

bot.command('newcustomer', (ctx) => {
  ctx.reply('请点击下方按钮添加新客户', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '添加客户',
          web_app: { url: process.env.WEBAPP_URL! }
        }
      ]]
    }
  });
});

bot.command('list', async (ctx) => {
  try {
    const customers = await customerService.getCustomers();
    if (customers.length === 0) {
      return ctx.reply('目前还没有客户记录。使用 /newcustomer 添加新客户。');
    }

    const message = customers.map(customer => 
      `👤 ${customer.name}\n` +
      `📞 ${customer.phone}\n` +
      `📧 ${customer.email}\n` +
      `📝 ${customer.notes || '无备注'}\n` +
      `⏰ ${new Date(customer.createdAt).toLocaleString('zh-CN')}\n`
    ).join('\n');

    ctx.reply(`📋 客户列表：\n\n${message}`);
  } catch (error) {
    console.error('获取客户列表错误:', error);
    ctx.reply('获取客户列表失败，请重试');
  }
});

bot.command('help', (ctx) => {
  ctx.reply('这是一个简单的客户管理系统。\n\n' +
    '您可以：\n' +
    '1. 添加新客户 (/newcustomer)\n' +
    '2. 查看客户列表 (/list)\n' +
    '3. 编辑客户信息\n' +
    '4. 删除客户\n\n' +
    '使用 /newcustomer 开始添加客户。');
});

interface WebAppData {
  action: 'add' | 'update' | 'delete';
  customer: Customer;
}

// 处理 WebApp 数据
bot.on('web_app_data', async (ctx) => {
  try {
    if (!ctx.webAppData) {
      throw new Error('没有收到 WebApp 数据');
    }

    const data: WebAppData = JSON.parse(ctx.webAppData.data.text());
    
    switch (data.action) {
      case 'add':
        await handleAddCustomer(ctx, data.customer);
        break;
      case 'update':
        await handleUpdateCustomer(ctx, data.customer);
        break;
      case 'delete':
        await handleDeleteCustomer(ctx, data.customer);
        break;
      default:
        ctx.reply('未知操作');
    }
  } catch (error) {
    console.error('处理 WebApp 数据错误:', error);
    ctx.reply('处理数据时出错，请重试');
  }
});

// 处理添加客户
async function handleAddCustomer(ctx: Context, customerData: Omit<Customer, 'id' | 'createdAt'>) {
  try {
    const customer = await customerService.addCustomer(customerData);
    await ctx.reply(
      `✅ 已添加新客户\n\n` +
      `姓名: ${customer.name}\n` +
      `电话: ${customer.phone}\n` +
      `邮箱: ${customer.email}\n` +
      `备注: ${customer.notes || '无'}`
    );
  } catch (error) {
    console.error('添加客户错误:', error);
    ctx.reply('添加客户失败，请重试');
  }
}

// 处理更新客户
async function handleUpdateCustomer(ctx: Context, customer: Customer) {
  try {
    const updatedCustomer = await customerService.updateCustomer(customer.id, customer);
    if (!updatedCustomer) {
      return ctx.reply('未找到要更新的客户');
    }
    
    await ctx.reply(
      `✅ 已更新客户信息\n\n` +
      `姓名: ${updatedCustomer.name}\n` +
      `电话: ${updatedCustomer.phone}\n` +
      `邮箱: ${updatedCustomer.email}\n` +
      `备注: ${updatedCustomer.notes || '无'}`
    );
  } catch (error) {
    console.error('更新客户错误:', error);
    ctx.reply('更新客户失败，请重试');
  }
}

// 处理删除客户
async function handleDeleteCustomer(ctx: Context, customer: Customer) {
  try {
    const success = await customerService.deleteCustomer(customer.id);
    if (!success) {
      return ctx.reply('未找到要删除的客户');
    }
    
    await ctx.reply(
      `✅ 已删除客户\n\n` +
      `姓名: ${customer.name}`
    );
  } catch (error) {
    console.error('删除客户错误:', error);
    ctx.reply('删除客户失败，请重试');
  }
}

// 启动 Express 服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

// 启动 Bot
bot.launch().then(() => {
  console.log('Bot 已启动');
}).catch((error) => {
  console.error('Bot 启动失败:', error);
}); 