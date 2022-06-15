import { Modal } from 'src/components/AntdCustomize/Modal/Modal';
import { plansSelector } from 'src/containers/selectors';
import { Input, InputRef } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createGlobalState } from 'react-use';
import { View } from 'wiloke-react-core';
import { useGetPromoCode } from '../actions/actionPlans';

export const useCodeModal = createGlobalState(false);

export const CouponModal = () => {
  const [form] = useForm();
  const inputRef = useRef<InputRef>(null);
  const { getCodeRequest, planCode } = useSelector(plansSelector);
  const { coupon, messageCoupon } = planCode;
  const [visible, setVisible] = useCodeModal();
  const validateCoupon = useGetPromoCode();

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
      form.resetFields(['promoCode']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (getCodeRequest === 'success' && !!coupon) {
      setVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCodeRequest, coupon]);

  const _handleCancel = () => {
    setVisible(false);
  };

  const _handleOk = () => {
    if (!!form.getFieldValue('promoCode')) {
      validateCoupon.request({ code: form.getFieldValue('promoCode') });
    }
  };

  return (
    <Modal
      okButtonProps={{ loading: getCodeRequest === 'loading' }}
      okText={'Apply'}
      visible={visible}
      onCancel={_handleCancel}
      width={500}
      onOk={form.submit}
    >
      <Form form={form} onFinish={_handleOk} onSubmitCapture={_handleOk}>
        <View css={{ marginBottom: '8px' }}>Enter promo code here:</View>
        <FormItem style={{ marginBottom: 0 }} name="promoCode" rules={[{ required: true, message: 'Please enter code' }]}>
          <Input autoFocus size="large" style={{ borderRadius: 6, fontSize: 14, padding: 11 }} ref={inputRef} />
        </FormItem>
        {!coupon && messageCoupon && (
          <View color="tertiary" css={{ marginTop: '8px' }}>
            {messageCoupon}
          </View>
        )}
        {!!coupon && messageCoupon && (
          <View color="primary" css={{ marginTop: '8px' }}>
            {messageCoupon}
          </View>
        )}
      </Form>
    </Modal>
  );
};
