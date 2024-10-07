declare global {
    interface Window {
      Telegram: {
        WebApp: {
          initData: string;
          initDataUnsafe: {
            user?: {
              id: number;
              first_name: string;
              last_name: string;
              username: string;
              language_code: string;
            };
          };
          close: () => void;
          showPopup: (params: { title: string, message: string }) => void;
        };
      };
    }
  }
  
  export {};
  