import { GetSettings_ResponseSuccess } from 'general/@types/BE/UseMetafieldsAsDB/GetSettings';
import { fetchAPI } from 'src/utils';
import { CreateSettings_ExpectBodyData, CreateSettings_ResponseSuccess } from 'general/@types/BE/UseMetafieldsAsDB/CreateSettings';
import { UpdateSettings_ExpectBodyData } from 'general/@types/BE/UseMetafieldsAsDB/UpdateSettings';
import { AxiosResponse } from 'axios';

export class UseMetaFieldsAsDBService {
  private getEndpoint() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const state = require('src/store/configureStore').store.getState() as AppState;
    const app = state.initialization.app as App;
    return `${app.localOrigin}/api/metafield/settings`;
  }

  async getSettings() {
    const response: AxiosResponse<GetSettings_ResponseSuccess> = await fetchAPI.request({
      url: this.getEndpoint(),
    });
    return response.data;
  }

  async createSettings(data: CreateSettings_ExpectBodyData) {
    const response: AxiosResponse<CreateSettings_ResponseSuccess> = await fetchAPI.request({
      url: this.getEndpoint(),
      method: 'post',
      data,
    });
    return response.data;
  }

  async updateSettings(data: UpdateSettings_ExpectBodyData) {
    const response: AxiosResponse<UpdateSettings_ExpectBodyData> = await fetchAPI.request({
      url: this.getEndpoint(),
      method: 'put',
      data,
    });
    return response.data;
  }
}
