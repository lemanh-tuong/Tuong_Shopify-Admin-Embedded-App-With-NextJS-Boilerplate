import { Button, ButtonProps } from 'src/components/Button';
import { ModalHeader } from 'src/components/ModalHeader';
import { ScrollBars } from 'src/components/ScrollBars';
import { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface MyModalProps {
  size?: 'medium' | 'large';
  headerText?: string;
  isVisible: boolean;
  isLoading?: boolean;
  cancelText?: string;
  okText?: string;
  okButtonDisabled?: ButtonProps['disabled'];
  scrollDisabled?: boolean;
  contentCss?: ViewProps['css'];
  bodyCss?: ViewProps['css'];
  okProps?: Omit<ButtonProps, 'children'>;
  cancelProps?: Omit<ButtonProps, 'children'>;
  onCancel?: () => void;
  onOk?: () => void;
}

export const MyModal: FC<MyModalProps> = ({
  size = 'medium',
  children,
  headerText = '',
  isVisible,
  isLoading = false,
  cancelText = 'Cancel',
  okButtonDisabled,
  scrollDisabled = false,
  okText = 'Ok',
  contentCss,
  bodyCss,
  okProps,
  cancelProps,
  onCancel,
  onOk,
}) => {
  const [height, setHeight] = useState<string>('auto');
  const childRef = useRef<HTMLElement | null>(null);

  const setHeightState = () => {
    const maxHeight = window.innerHeight - 60;
    if (!!childRef.current) {
      setHeight(
        childRef.current.offsetHeight >= maxHeight
          ? `${maxHeight}px`
          : `${childRef.current.offsetHeight + 50 + (!!cancelText || !!okText ? 56 : 0)}px`,
      );
    }
  };

  useEffect(() => {
    if (isVisible) {
      setHeightState();
      window.addEventListener('resize', setHeightState);
      return () => {
        window.removeEventListener('resize', setHeightState);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const renderChild = (
    <View ref={childRef} css={[styles.child(size), contentCss]}>
      {children}
    </View>
  );

  const renderContent = (
    <View css={styles.container}>
      <View css={[styles.content(size, height), bodyCss]}>
        <ModalHeader title={headerText} onClose={onCancel} />
        {scrollDisabled ? (
          <View css={styles.body(!!cancelText || !!okText)}>{renderChild}</View>
        ) : (
          <ScrollBars css={styles.body(!!cancelText || !!okText)}>{renderChild}</ScrollBars>
        )}
        {(!!cancelText || !!okText) && (
          <View css={styles.footer}>
            {!!cancelText && (
              <View>
                <Button
                  {...cancelProps}
                  backgroundColor="gray2"
                  color="gray8"
                  size="extra-small"
                  radius={4}
                  target="blank"
                  fontFamily="secondary"
                  css={{ fontWeight: 500, textDecoration: 'none' }}
                  onClick={onCancel}
                >
                  {cancelText}
                </Button>
              </View>
            )}
            {!!okText && (
              <View css={{ marginLeft: '10px' }}>
                <Button
                  {...okProps}
                  disabled={okButtonDisabled}
                  loading={isLoading}
                  backgroundColor="primary"
                  size="extra-small"
                  radius={4}
                  target="blank"
                  fontFamily="secondary"
                  css={{ fontWeight: 500, textDecoration: 'none' }}
                  onClick={onOk}
                >
                  {okText}
                </Button>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );

  if (!isVisible) {
    return null;
  }

  return createPortal(renderContent, document.body);
};
