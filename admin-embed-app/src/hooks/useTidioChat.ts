import { TIDIO_KEY } from 'src/env';
import { storage } from 'src/utils/storage';
import { useEffect, useState } from 'react';

export const useTidioChat = () => {
  const [statusInitialization, setStatusInitialization] = useState<Status>('idle');

  const handleInitTidioChat = () => {
    setStatusInitialization('loading');
    const tidioScript = document.createElement('script');
    tidioScript.setAttribute('crossorigin', 'true');
    tidioScript.src = `//code.tidio.co/${TIDIO_KEY}.js`;
    document.body.appendChild(tidioScript);
    tidioScript.addEventListener('load', () => {
      setStatusInitialization('success');
    });
    tidioScript.addEventListener('error', () => {
      setStatusInitialization('failure');
    });
  };

  const _handleReady = () => {
    window.tidioChatApi.setColorPalette('#2AB885');
  };

  useEffect(() => {
    document.addEventListener('tidioChat-ready', _handleReady);
    return () => {
      document.removeEventListener('tidioChat-ready', _handleReady);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    storage.removeItem(`tidio_state_${TIDIO_KEY}`);
    storage.removeItem(`tidio_state_${TIDIO_KEY}_lastActivity`);
    storage.removeItem(`tidio_state_${TIDIO_KEY}_lastMessageFromVisitorTimestamp`);
  };

  const openWithEmail = ({ email, shopName, message }: { email: string; shopName: string; message?: string }) => {
    if (window.tidioChatApi) {
      window.tidioChatApi.setVisitorData({
        shopName,
        email,
      });
      window.tidioChatApi.open();
      window.tidioChatApi.messageFromVisitor(message);
    }
  };

  return {
    initTidioChat: handleInitTidioChat,
    reset: handleReset,
    openWithEmail,
    statusInitialization,
  };
};
