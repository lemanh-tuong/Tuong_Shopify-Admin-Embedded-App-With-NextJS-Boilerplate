import { APP_NAME, CREATE_OFFLINE_ACCESS_TOKEN_API_URL_IN_COMPONENT, GET_OFFLINE_ACCESS_TOKEN_API_URL_IN_COMPONENT } from 'src/env';
import { fetchAPI } from 'src/utils';
import { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import { Text, View } from 'wiloke-react-core';
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

export const AccessToken: FC<AccessTokenProps> = ({ shopDomain }) => {
  const [state, setState] = useState<State>({
    status: 'idle',
    isUpdatedOfflineToken: false,
  });

  const getAccessToken = async () => {
    setState(state => ({ ...state, status: 'loading' }));
    try {
      const res: AxiosResponse<Response> = await fetchAPI.request({
        url: GET_OFFLINE_ACCESS_TOKEN_API_URL_IN_COMPONENT,
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
    if (state.status === 'idle' || state.status === 'failure') {
      getAccessToken();
    }
  }, [state.status]);

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
            href={`${CREATE_OFFLINE_ACCESS_TOKEN_API_URL_IN_COMPONENT}/?shop=${shopDomain}&route=shop-installation`}
          >
            Click to complete
          </View>
        </View>
      </View>
    );
  }
  return null;
};
