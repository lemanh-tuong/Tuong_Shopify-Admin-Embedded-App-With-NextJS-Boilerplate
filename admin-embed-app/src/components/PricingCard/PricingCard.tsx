import { Button } from 'src/components/Button';
import React, { FC } from 'react';
import { LineAwesome, Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface PricingCardProps {
  title?: string;
  price?: string;
  description?: string;
  canUpgrade?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
  css?: ViewProps['css'];
  onClick?: () => void;
  texts: string[];
}
function formatPrice(value: number) {
  const val = (value / 1).toFixed(2).replace('.', ',');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
export const PricingCard: FC<PricingCardProps> = ({ title = '', css, isActive = false, price = '', isLoading, texts, onClick }) => {
  const _handleClick = () => {
    if (isActive) {
      return;
    }
    onClick?.();
  };

  return (
    <View css={[styles.container, css]} className="PricingCard-container" radius={10} backgroundColor={isActive ? 'secondary' : 'gray2'}>
      <View css={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text color={isActive ? 'light' : 'gray8'} css={styles.title(isActive)} tagName="h3">
          {title}
        </Text>

        <View css={{ textAlign: 'right' }}>
          <Text color={isActive ? 'light' : 'gray8'} tagName="h3" css={{ lineHeight: '1.2' }}>
            ${formatPrice(Number(price))}
          </Text>
          <Text color={isActive ? 'light' : 'gray8'} size={14} css={{ fontWeight: 400, lineHeight: '1.2' }}>
            Monthly
          </Text>
        </View>
      </View>

      <Text color={isActive ? 'gray2' : 'gray8'} css={styles.description}>
        Plan includes:
      </Text>
      {texts.map(text => {
        return (
          <Text key={text} color={isActive ? 'light' : 'gray8'} css={styles.text}>
            <LineAwesome name="check" /> &nbsp; {text}
          </Text>
        );
      })}
      <View css={{ textAlign: 'center', marginTop: '40px' }}>
        <Button
          backgroundColor={isActive ? 'light' : 'secondary'}
          radius={6}
          css={{ fontWeight: 600, cursor: isActive ? 'not-allowed' : 'pointer' }}
          color={isActive ? 'gray8' : 'light'}
          onClick={_handleClick}
          loading={isLoading}
        >
          {isActive ? 'Current Plan' : 'Choose Plan'}
        </Button>
      </View>
    </View>
  );
};
