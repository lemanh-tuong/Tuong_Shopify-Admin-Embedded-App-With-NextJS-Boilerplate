export interface NguyenDttnPopup {
  name?: string;
  description?: string;
  thumbnailUrl: string;
  link?: string;
  target: '_blank';
  utm?: string;
  data?: Record<string, any>;
  id: string;
  btnName: string;
}
export interface NguyenDttnGetAppRecommendationsResponseItem {
  name: string;
  price?: string;
  btnName: string;
  description: string;
  thumbnailUrl: string;
  link: string;
  target: '_blank' | 'popup';
  couponCode?: NguyenDttnPopup;
  utm?: string;
  data?: Record<string, any>;
  total_ratings?: number;
  average_ratings?: number;
}

export interface NguyenDttnGetAppRecommendationsResponseSuccess {
  data: NguyenDttnGetAppRecommendationsResponseItem[];
  message: 'Fetched';
  status: 'success';
}
