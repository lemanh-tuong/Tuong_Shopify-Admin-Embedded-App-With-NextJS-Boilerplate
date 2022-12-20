import { APP_NAME, API_CREATE_OFFLINE_TOKEN_IN_NEXT_CLIENT, API_GET_OFFLINE_TOKEN_IN_NEXT_CLIENT } from 'src/env';
import { fetchAPI } from 'src/utils';
import { Retry } from 'src/components/Retry/Retry';
import { initializationSelector } from 'src/store/selectors';
import { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import { Text, View } from 'wiloke-react-core';
import { useSelector } from 'react-redux';
import * as styles from './styles';

interface AccessTokenProps {
  shopDomain: string;
}

interface Response {
  data: { isUpdatedOfflineToken: boolean };
  message: 'Oke';
  status: 'success' | 'failure';
}

interface State {
  status: Status;
  isUpdatedOfflineToken: boolean;
}

// TODO: I18n
export const AccessToken: FC<AccessTokenProps> = ({ shopDomain }) => {
  const { isInvalidToken } = useSelector(initializationSelector);

  const [state, setState] = useState<State>({
    status: 'idle',
    isUpdatedOfflineToken: false,
  });

  const getAccessToken = async () => {
    setState(state => ({ ...state, status: 'loading' }));
    try {
      const res: AxiosResponse<Response> = await fetchAPI.request({
        url: API_GET_OFFLINE_TOKEN_IN_NEXT_CLIENT,
        baseURL: '',
      });
      setState(state => ({
        ...state,
        status: 'success',
        isUpdatedOfflineToken: res.data.data.isUpdatedOfflineToken,
      }));
    } catch {
      setState(state => ({
        ...state,
        status: 'failure',
      }));
    }
  };

  useEffect(() => {
    if (API_GET_OFFLINE_TOKEN_IN_NEXT_CLIENT && (state.status === 'idle' || state.status === 'failure')) {
      getAccessToken();
    }
  }, [state.status]);

  if (isInvalidToken) {
    return (
      <View css={styles.container}>
        <View css={styles.content}>
          <Text css={styles.title}>Something went wrong</Text>
          <Retry
            onClick={() => {
              window.open(`${API_CREATE_OFFLINE_TOKEN_IN_NEXT_CLIENT}/?shop=${shopDomain}&route=shop-installation`);
            }}
          />
        </View>
      </View>
    );
  }

  if (state.status === 'success' && !state.isUpdatedOfflineToken) {
    return (
      <View css={styles.container}>
        <View css={styles.content}>
          <Text css={styles.title}>Thanks for using {APP_NAME} app! Just one last step to complete the setup</Text>
          <View
            tagName="a"
            target="_blank"
            colorHover="light"
            css={styles.button}
            href={`${API_CREATE_OFFLINE_TOKEN_IN_NEXT_CLIENT}/?shop=${shopDomain}&route=shop-installation`}
          >
            Click to complete
          </View>
        </View>
      </View>
    );
  }
  return null;
};
