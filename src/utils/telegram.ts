declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready(): void;
        expand(): void;
        close(): void;
        sendData(data: string): void;
        enableClosingConfirmation(): void;
        colorScheme: 'light' | 'dark';
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show(): void;
          hide(): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
          enable(): void;
          disable(): void;
          setParams(params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_visible?: boolean;
            is_active?: boolean;
          }): void;
        };
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
        };
      };
    };
  }
}

export function initTelegramApp() {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    console.error('Telegram WebApp is not available');
    return;
  }

  // 通知 Telegram WebApp 已准备就绪
  webApp.ready();
  
  // 启用关闭确认
  webApp.enableClosingConfirmation();
  
  // 设置主按钮
  webApp.MainButton.setParams({
    text: "提交客户信息",
    color: "#2481cc",
    text_color: "#ffffff",
    is_visible: false
  });
  
  // 适配主题
  if (webApp.colorScheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  
  return webApp;
}

export const sendDataToTelegram = (data: any) => {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.error('Telegram WebApp is not available');
    return;
  }
  tg.sendData(JSON.stringify(data));
  tg.close();
};

export const getCurrentUser = () => {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.error('Telegram WebApp is not available');
    return null;
  }
  return tg.initDataUnsafe.user;
};

export const showMainButton = (text?: string) => {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.error('Telegram WebApp is not available');
    return;
  }
  if (text) {
    tg.MainButton.setParams({ text });
  }
  tg.MainButton.show();
};

export const hideMainButton = () => {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.error('Telegram WebApp is not available');
    return;
  }
  tg.MainButton.hide();
};

export const onMainButtonClick = (callback: () => void) => {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.error('Telegram WebApp is not available');
    return;
  }
  tg.MainButton.onClick(callback);
};

export const expandWebApp = () => {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.error('Telegram WebApp is not available');
    return;
  }
  tg.expand();
};

export const closeWebApp = () => {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.error('Telegram WebApp is not available');
    return;
  }
  tg.close();
}; 