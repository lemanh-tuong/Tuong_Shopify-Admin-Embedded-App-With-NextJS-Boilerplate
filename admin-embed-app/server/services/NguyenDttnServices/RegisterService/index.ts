import { REGISTER_SERVICE_URL } from 'server/env';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { fetchAPI } from '../fetchAPI';
import { IRegisterService } from './@types';

class RegisterService implements IRegisterService {
  private url: string;
  constructor() {
    this.url = REGISTER_SERVICE_URL;
  }
  register: IRegisterService['register'] = async ({ accessToken, email, shopName }) => {
    try {
      await fetchAPI.request({
        headers: {
          'X-ShopName': shopName,
        },
        method: 'post',
        url: this.url,
        data: {
          shopName,
          email,
          accessToken,
        },
      });
      return true;
    } catch (err) {
      reportService.createReportError({ error: err as Error, positionError: 'Register' });
      return false;
    }
  };
}

class FakeRegisterService implements IRegisterService {
  register: IRegisterService['register'] = async ({ accessToken, email, shopName }) => {
    console.log('Registered', { accessToken, shopName, email });
    return true;
  };
}

export const registerService = REGISTER_SERVICE_URL ? new RegisterService() : new FakeRegisterService();
