import { Button } from 'src/components/Button';
import { fetchAPI, toFormData } from 'src/utils';
import { FC, useState } from 'react';
import { View } from 'wiloke-react-core';
import { ModalCoupon } from '../ModalCoupon/ModalCoupon';
import { NguyenDttnGetAppRecommendationsResponseItem } from '../../type';
import * as styles from './styles';

interface AppRecommendationsItemProps extends NguyenDttnGetAppRecommendationsResponseItem {}

export const AppRecommendationsItem: FC<AppRecommendationsItemProps> = ({ thumbnailUrl, name, target, link, couponCode, utm, data, btnName }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const _handleClickBtn = () => {
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
    if (couponCode) {
      setModalVisible(true);
    }
  };

  const _renderHeader = () => {
    return (
      <View css={styles.header}>
        <View tagName="img" draggable={false} src={thumbnailUrl} css={styles.image} />
      </View>
    );
  };

  const _renderBody = () => {
    return (
      <View css={styles.body}>
        <View css={styles.flex}>
          <View draggable={false} tagName="a" href={link} target={target} css={styles.appName}>
            {name}
          </View>
        </View>
      </View>
    );
  };

  const _renderFooter = () => {
    return (
      <View css={styles.footer}>
        <View css={styles.flex}>
          <View draggable={false} css={styles.moreInfo} tagName="a" colorHover="primary" href={link} target={target}>
            More info
          </View>
          <Button onClick={_handleClickBtn} href={link} target={target === '_blank' ? 'blank' : 'self'} css={styles.button}>
            {btnName}
          </Button>
        </View>
      </View>
    );
  };

  return (
    <View css={{ padding: '5px' }}>
      <View key={name} draggable={false} target={target} tagName="a" href={link} css={styles.container} onClick={_handleClickBtn}>
        {_renderHeader()}
        {_renderBody()}
        {_renderFooter()}
        {couponCode && (
          <ModalCoupon visible={modalVisible} onCancel={() => setModalVisible(false)} onOk={() => setModalVisible(false)} {...couponCode} />
        )}
      </View>
    </View>
  );
};
