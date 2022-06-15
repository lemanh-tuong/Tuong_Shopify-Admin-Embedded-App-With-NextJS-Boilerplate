import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { NguyenDttnGetAppRecommendationsResponseItem } from '../type';

export const getAppRecommendations = createAsyncAction([
  '@AppRecommendations/getRequest',
  '@AppRecommendations/getSuccess',
  '@AppRecommendations/getFailure',
])<undefined, { app_recommendations: NguyenDttnGetAppRecommendationsResponseItem[] }, undefined>();

export const useGetAppRecommendations = createDispatchAsyncAction(getAppRecommendations);
