import { normalize } from './normalize';

export const styleBase = `
${normalize}
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-size: 14px;
  line-height: 1.6;
  font-weight: 400;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

h1 {
  font-size: 44px;
}
h2 {
  font-size: 36px;
}
h3 {
  font-size: 28px;
}
h4 {
  font-size: 20px;
}
h5 {
  font-size: 18px;
}
h6 {
  font-size: 15px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
}

p {
  margin: 0;
}

input[type="search"],
input[type="text"],
input[type="url"],
input[type="number"],
input[type="password"],
input[type="email"],
input[type="file"] {
  appearance: none;
  border-radius: 0;
}
textarea {
  vertical-align: middle;
  appearance: none;
  border-radius: 0;
}
a, input, textarea {
  outline: none !important;
}
img {
  max-width: 100%;
  height: auto;
  border: 0;
  vertial-align: middle;
}

iframe[style^="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; border: none; z-index: "] {
  top: calc(100% - 30px) !important;
  left: calc(30px - 100%) !important;
  box-shadow: 0 0 0 20px red !important;
}
iframe[style^="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; border: none; z-index: "]:hover {
  top: 0 !important;
  left: 0 !important;
  box-shadow: none !important;
}
`;
