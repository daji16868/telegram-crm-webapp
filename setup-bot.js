const https = require('https');

const TOKEN = '8112343979:AAHbAwv6g0zVJ9-IdV-Vw5AxJLyWBpMA75Y';
const WEBAPP_URL = 'https://电报-crm-miniapp.vercel.app';

// 设置命令菜单
const commands = [
  {
    command: 'start',
    description: '启动客户管理系统'
  },
  {
    command: 'newcustomer',
    description: '添加新客户'
  },
  {
    command: 'help',
    description: '获取帮助信息'
  }
];

// 发送请求到 Telegram API
function makeRequest(method, data) {
  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${TOKEN}/${method}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`${method} response:`, data);
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (error) => {
      console.error(`Error with ${method}:`, error);
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// 设置命令
async function setup() {
  try {
    // 设置命令菜单
    console.log('Setting up commands...');
    await makeRequest('setMyCommands', { commands });

    // 设置菜单按钮
    console.log('Setting up menu button...');
    await makeRequest('setChatMenuButton', {
      menu_button: {
        type: 'web_app',
        text: '打开客户管理系统',
        web_app: { url: WEBAPP_URL }
      }
    });

    console.log('Bot setup completed successfully!');
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

setup(); 