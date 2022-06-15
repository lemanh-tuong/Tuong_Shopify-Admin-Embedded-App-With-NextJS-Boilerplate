import { API_CHARGE_URL } from 'src/env';
import { AsyncComponent } from 'src/components/AsyncComponent';
import { PricingCard } from 'src/components/PricingCard';
import { plansSelector } from 'src/containers/selectors';
import { MainTemplate } from 'src/templates/MainTemplate';
import { fetchAPI } from 'src/utils';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from '@shopify/app-bridge-react';
import { GridSmart, Image, Text, View } from 'wiloke-react-core';
import { Header } from '../Header/Header';
import { useGetPlans } from './actions/actionPlans';
import { CouponModal, useCodeModal } from './components/CouponModal';
import { ChargeUrlAPIResponse } from './PlanAPI';
import imagePng from './sammy-finance.png';

const PricingPageContent = () => {
  const getPlans = useGetPlans();
  const { requestStatus, plans, currentPlan, trialDays, planCode } = useSelector(plansSelector);
  const { coupon } = planCode;
  const [loading, setLoading] = useState<{ [slug: string]: boolean }>({});
  const [, setVisible] = useCodeModal();
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  useEffect(() => {
    if (requestStatus !== 'success') {
      getPlans.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestStatus]);

  const _chargeUrl = (planSlug: string) => async () => {
    setLoading(prevState => ({
      ...prevState,
      [planSlug]: true,
    }));
    try {
      const response: AxiosResponse<ChargeUrlAPIResponse> = await fetchAPI.request({
        baseURL: API_CHARGE_URL,
        method: 'post',
        data: {
          planSlug: planSlug,
          coupon,
        },
      });
      redirect.dispatch(Redirect.Action.REMOTE, response.data.data.redirectTo);
    } catch (error) {
      console.log(error);
    }
  };

  const _renderSuccess = () => {
    return (
      <GridSmart columnWidth={300} columnGap={20}>
        {plans.map((item, index) => {
          let texts: string[] = [];
          if (item.planName === 'Free') {
            texts = ['Unlimited currencies', 'Currency style customizable', 'Currency color customizable', 'Live chat support'];
          }
          if (item.planName === 'Pro') {
            texts = ['Everything in Free plan', "Auto detect visitor's currency", 'Automatic switch to local currencies with checkout'];
          }
          const _percentage = Number(planCode.percentage);
          const _price = Number(item.extraInfo.price);

          let _discount = 0;
          if (_percentage > 0) {
            _discount = Math.floor(_price * ((100 - _percentage) / 100));
          } else {
            _discount = _price;
          }
          return (
            <PricingCard
              key={index}
              title={item.planName}
              isActive={item.planName === currentPlan}
              canUpgrade={item.canUpgrade}
              description={item.description}
              price={_discount.toString()}
              isLoading={loading[item.planSlug]}
              onClick={_chargeUrl(item.planSlug)}
              texts={texts}
            />
          );
        })}
      </GridSmart>
    );
  };

  return (
    <View row css={{ padding: '30px', minHeight: '700px' }}>
      <View columns={[3, 3, 3]}>
        <View radius={10} backgroundColor="secondary" css={{ padding: '30px' }} color="light">
          <Text fontFamily="primary" color="light" size={45} css={{ lineHeight: '1.2', letterSpacing: '1.5px' }}>
            About <Text tagName="strong">App:</Text>
          </Text>
          <br />
          <Text>
            The first and foremost step towards expanding your business globally is making it user-friendly for global customers. Customers from
            different corners of the world want to see the displayed price in their domestic currency. This helps save them from the hassle of
            converting currency mentally, especially those who don’t have a head for figures. Thus, customers will feel more comfortable browsing your
            products and more likely to make a purchase.
          </Text>
          <Image src={imagePng} alt="" />
        </View>
      </View>
      <View columns={[9, 9, 9]}>
        <View css={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <View>
            <Text fontFamily="primary" color="gray8" size={45} css={{ lineHeight: '1.2', letterSpacing: '1.5px' }}>
              Your current <br /> plan:{' '}
              <Text tagName="strong" color="danger">
                {currentPlan}.
              </Text>
            </Text>
            {trialDays && (
              <Text css={{ fontWeight: 500 }} color="primary" size={30}>
                {trialDays} {Number(trialDays) > 1 ? 'days' : 'day'} free-trial.
              </Text>
            )}
          </View>
          <Text
            color="primary"
            size={16}
            css={{ cursor: 'pointer' }}
            onClick={() => {
              setVisible(true);
            }}
          >
            I have promo code
          </Text>
        </View>

        <AsyncComponent status={requestStatus} Success={_renderSuccess()} />

        <CouponModal />
      </View>
    </View>
  );
};

export const PricingPage = () => {
  return <MainTemplate Header={Header} Content={PricingPageContent} />;
};
