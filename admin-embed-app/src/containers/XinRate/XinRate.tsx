import { APP_NAME, FEEDBACK_MAIL, REVIEW_APP_URL, API_GET_REVIEW_STATUS, API_SET_REVIEW_STATUS } from 'src/env';
import { fetchAPI } from 'src/utils';
import { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Image, Text, View } from 'wiloke-react-core';
import { MyModal } from '../../components/MyModal';
import congratulationImage from './congrat.png';
import * as style from './styles';

export interface Response {
  data: { hasReview: boolean };
  message: string;
  status: 'success' | 'error';
}

// TODO: I18n
export const XinRate = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalThank, setModalThank] = useState(false);
  const interval = useRef<number | undefined>();

  const _handleGetReview = async () => {
    try {
      const res: AxiosResponse<Response> = await fetchAPI.request({
        url: API_GET_REVIEW_STATUS,
        baseURL: '',
      });
      if (res.data.status === 'success') {
        setModalVisible(!res.data.data.hasReview);
      }
      // eslint-disable-next-line no-empty
    } catch {}
  };

  const _handleCloseModal = async () => {
    setModalThank(true);
    setModalVisible(false);
    try {
      await fetchAPI.request({
        method: 'POST',
        url: API_SET_REVIEW_STATUS,
        baseURL: '',
      });
      // eslint-disable-next-line no-empty
    } catch {}
  };

  useEffect(() => {
    if (!modalVisible) {
      interval.current = window.setInterval(() => {
        _handleGetReview();
      }, 60000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [modalVisible]);

  return (
    <View>
      <MyModal
        isVisible={modalVisible}
        okText="Great! I'll leave a good review"
        cancelText="Not good, I have some feedbacks"
        okProps={{ tagName: 'a', href: REVIEW_APP_URL, onClick: () => setModalThank(true) }}
        cancelProps={{ tagName: 'a', href: `mailto:${FEEDBACK_MAIL}`, onClick: () => setModalThank(true) }}
        onOk={_handleCloseModal}
        onCancel={_handleCloseModal}
        scrollDisabled
        bodyCss={{ minHeight: '460px' }}
        headerText={`Thank you for using ${APP_NAME}`}
      >
        <View css={style.container}>
          <Image src={congratulationImage} alt="" />
          <Text css={style.title}>Thank you for using {APP_NAME}</Text>
          <Text css={style.message}>Could you please share with us your experience of this App</Text>
        </View>
      </MyModal>

      <MyModal
        isVisible={modalThank}
        okText=""
        scrollDisabled
        bodyCss={{ minHeight: '300px' }}
        contentCss={{ display: 'flex', alignItems: 'center', height: '100%' }}
        cancelText="Close"
        onCancel={() => setModalThank(false)}
      >
        <View css={style.container}>
          <Text css={style.title}>Thanks for your support 🎉</Text>
          <Text css={style.message}>Your feedback is much appreciated. It allow us to create better app</Text>
        </View>
      </MyModal>
    </View>
  );
};
