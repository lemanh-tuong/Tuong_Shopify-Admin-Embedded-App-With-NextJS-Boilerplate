import { css } from 'wiloke-react-core';

export const modalContent = css`
  debug: ModalCoupon__modalContent;
  display: flex;
`;

export const left = css`
  debug: ModalCoupon__left;
  width: 50%;
  flex: 0 0 50%;
  position: relative;
`;

export const leftHeight = css`
  debug: ModalCoupon__leftHeight;
  height: 0;
`;

export const image = css`
  debug: ModalCoupon__image;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const right = css`
  debug: ModalCoupon__right;
  width: 50%;
  flex: 0 0 50%;
  padding: 40px 15px;
`;

export const title = css`
  debug: ModalCoupon__title;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 500;
`;

export const description = css`
  debug: ModalCoupon__description;
  margin-bottom: 30px;
`;

export const button = css`
  debug: ModalCoupon__button;
  text-align: center;
`;
