import { initTelegramApp, expandWebApp } from './telegram';

export const testTelegramWebApp = () => {
  if (!window.Telegram?.WebApp) {
    console.error('Telegram WebApp SDK 未加载！');
    return null;
  }

  const webApp = window.Telegram.WebApp;
  
  // 初始化 WebApp
  webApp.ready();

  // 收集基本信息
  const info = {
    platform: webApp.platform,
    colorScheme: webApp.colorScheme,
    themeParams: webApp.themeParams,
    viewportHeight: webApp.viewportHeight,
    viewportStableHeight: webApp.viewportStableHeight,
    isExpanded: webApp.isExpanded,
    headerColor: webApp.headerColor,
    backgroundColor: webApp.backgroundColor,
    user: webApp.initDataUnsafe?.user,
    initData: {
      start_param: webApp.initDataUnsafe?.start_param,
      auth_date: webApp.initDataUnsafe?.auth_date,
      hash: webApp.initDataUnsafe?.hash
    }
  };

  console.log('Telegram WebApp 信息：', info);
  return info;
};

export const testMainButton = () => {
  if (!window.Telegram?.WebApp) {
    console.error('Telegram WebApp SDK 未加载！');
    return;
  }

  const webApp = window.Telegram.WebApp;
  const MainButton = webApp.MainButton;

  // 测试主按钮
  MainButton.setParams({
    text: '测试主按钮',
    color: '#2481cc',
    text_color: '#ffffff',
    is_visible: true
  });

  MainButton.onClick(() => {
    console.log('主按钮被点击');
    MainButton.hide();
  });
};

export const testTheme = () => {
  if (!window.Telegram?.WebApp) {
    console.error('Telegram WebApp SDK 未加载！');
    return;
  }

  const webApp = window.Telegram.WebApp;
  
  console.log('当前主题：', {
    colorScheme: webApp.colorScheme,
    themeParams: webApp.themeParams
  });

  // 测试设置颜色
  webApp.setHeaderColor('#2481cc');
  webApp.setBackgroundColor('#f5f5f5');
};

export const testExpand = () => {
  expandWebApp();
};

export const testSendData = () => {
  if (!window.Telegram?.WebApp) {
    console.error('Telegram WebApp SDK 未加载！');
    return;
  }

  const testData = {
    type: 'test',
    timestamp: new Date().toISOString(),
    message: '测试数据发送功能'
  };

  window.Telegram.WebApp.sendData(JSON.stringify(testData));
  console.log('已发送测试数据：', testData);
}; 