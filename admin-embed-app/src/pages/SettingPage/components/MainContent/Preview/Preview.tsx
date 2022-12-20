import { settingSelector } from 'src/store/selectors';
import { pm } from 'src/pages/SettingPage/postmessage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme, View } from 'wiloke-react-core';
import * as styles from './styles';

export const Preview = () => {
  const { statusRequest, settings } = useSelector(settingSelector);
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const { colors } = useTheme();

  const handlePostmessage = () => {
    pm.emit('@emit_something', settings);
  };

  useEffect(() => {
    handlePostmessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  if (isLoading) {
    return null;
  }

  // NOTE: @tuong -> Chú ý với iframe trong “Admin App Embed“ - do shopify hạn chế nhiều thứ bên iframe thứ 3 (ví dụ hotjar là không thể dùng, chuyển file qua postmessage và upload bằng api là không thể)
  return (
    <View css={styles.container}>
      <iframe
        onLoad={handlePostmessage}
        id="IFRAME"
        style={{
          maxWidth: 579,
          maxHeight: 379,
          width: '100%',
          height: '100%',
          border: `1px solid ${colors.gray3}`,
          borderRadius: '12px',
          backgroundColor: colors.light,
        }}
        frameBorder={0}
        src="https://currency-converter-client.netlify.app/iframe.html"
      />
    </View>
  );
};
