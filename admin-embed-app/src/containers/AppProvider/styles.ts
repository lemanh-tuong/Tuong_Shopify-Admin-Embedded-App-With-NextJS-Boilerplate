import { css, Theme } from 'wiloke-react-core';

export const cssGlobalWithTheme = ({ fonts, colors }: Theme) => css`
  :global {
    body {
      font-family: ${fonts.primary};
      background-color: ${colors.light};
      color: ${colors.gray6};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: ${fonts.secondary};
      color: ${colors.gray9};
    }
    .table-responsive {
      table-layout: fixed;
      width: 100%;
      border-collapse: collapse;
      th {
        font-weight: 400;
        vertical-align: top;
      }
      th,
      td {
        padding: 15px;
        text-align: left;
        color: ${colors.gray8};
      }
      tbody tr {
        border-top: 1px solid ${colors.gray3};
      }
    }
    @media (max-width: 1000px) {
      .table-responsive {
        display: block;
        tbody,
        tfoot,
        tr,
        th {
          display: block;
        }
        tbody tr:first-child {
          border-top: 0;
        }
        thead {
          display: none;
        }
        tr {
          margin-bottom: 20px;
        }
        td {
          display: flex;
          text-align: right;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          > * {
            width: 80%;
          }
        }
        td:before {
          content: attr(data-th) ': ';
          float: left;
          font-weight: bold;
        }
      }
    }
  }
`;
