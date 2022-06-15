import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: Modal__container;
  .ant-modal-body {
    width: auto !important;
    padding: 22px 20px 25px 20px;
    overflow: auto;
  }
  .ant-modal-header {
    padding: 20px;
  }
  .ant-modal-header .ant-modal-title {
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
  }
  .ant-modal-content {
    border-radius: 10px;
    overflow: hidden;
  }
  .ant-modal-footer {
    padding: 15px 20px;
    z-index: 3;
    position: relative;
    background: white;
  }
  .ant-modal-footer:empty {
    padding: 0px !important;
  }
  .ant-modal-close-x {
    padding: 15px;
    display: block;
    width: auto;
    height: auto;
    line-height: 1;
  }
  .ant-modal-footer .ant-btn {
    border-color: ${colors.gray6};
    color: ${colors.gray6};
    border-radius: 8px;
    &:hover {
      border-color: ${colors.primary};
      color: ${colors.primary};
    }
  }
  .ant-modal-footer .ant-btn.ant-btn-primary {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    color: ${colors.light};
    &:hover {
      color: ${colors.light};
    }
  }
`;
