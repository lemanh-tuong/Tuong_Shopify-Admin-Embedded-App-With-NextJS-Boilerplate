import { Modal } from 'src/components/AntdCustomize/Modal/Modal';
import { Button } from 'src/components/Button';
import { fetchAPI, toFormData } from 'src/utils';
import { FC } from 'react';
import parse from 'html-react-parser';
import { Text, View } from 'wiloke-react-core';
import { NguyenDttnPopup } from '../../type';
import * as styles from './styles';

interface ModalCouponProps extends NguyenDttnPopup {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const ModalCoupon: FC<ModalCouponProps> = ({ thumbnailUrl, name, description, btnName, link, utm, data, target, visible, onCancel, onOk }) => {
  const _handleButtonClick = () => {
    onOk();
    if (utm) {
      fetchAPI.request({
        url: utm,
        baseURL: '',
        method: 'POST',
        data: toFormData({
          ...data,
          click_act: 'yes',
        }),
      });
    }
  };

  const _renderContent = () => {
    return (
      <View css={styles.modalContent}>
        <View css={styles.left}>
          <View css={styles.leftHeight} />
          <View tagName="img" css={styles.image} alt="Popup" src={thumbnailUrl} />
        </View>
        <View css={styles.right}>
          <Text css={styles.title}>{name}</Text>
          <Text css={styles.description}>{parse(description ?? '')}</Text>
          <Button
            target={target === '_blank' ? 'blank' : 'self'}
            href={link}
            onClick={() => _handleButtonClick()}
            radius={8}
            block
            css={styles.button}
          >
            {btnName}
          </Button>
        </View>
      </View>
    );
  };

  return (
    <Modal
      style={{ minWidth: '850px' }}
      footer={() => null}
      centered
      visible={visible}
      onOk={onOk}
      onCancel={() => {
        onCancel();
        if (utm) {
          fetchAPI.request({
            url: utm,
            baseURL: '',
            method: 'POST',
            data: toFormData({
              ...data,
              click_act: 'yes',
            }),
          });
        }
      }}
    >
      {_renderContent()}
    </Modal>
  );
};
