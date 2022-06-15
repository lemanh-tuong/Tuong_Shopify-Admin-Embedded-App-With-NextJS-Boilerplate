import { Modal } from 'src/components/AntdCustomize/Modal/Modal';
import { settingSelector } from 'src/containers/selectors';
import { APP_NAME, FEEDBACK_MAIL, REVIEW_APP_URL } from 'src/env';
import { Text, View } from 'wiloke-react-core';
import { useSelector } from 'react-redux';
import { useChangeModalRatingVisible } from '../../actions/actionSetting';
import * as styles from './styles';

export const ModalRating = () => {
  const { modalRatingVisible } = useSelector(settingSelector);

  const changeModalRatingVisible = useChangeModalRatingVisible();

  return (
    <Modal
      style={{ minWidth: 600 }}
      onOk={() => {
        window.open(REVIEW_APP_URL);
        changeModalRatingVisible(false);
      }}
      onCancel={() => {
        changeModalRatingVisible(false);
      }}
      cancelButtonProps={{
        href: `mailto:${FEEDBACK_MAIL}`,
        target: '_blank',
      }}
      title="Your setting has been saved"
      okText="Great! I'll leave a good review"
      cancelText="Not good, I have some feedbacks"
      visible={modalRatingVisible}
    >
      <View css={styles.container}>
        <Text css={styles.title}>Thank you for using {APP_NAME}</Text>
        <Text css={styles.message}>Your app settings have been finished. Could you please share with us your experience of this App</Text>
      </View>
    </Modal>
  );
};
