console.log("APP_NAME's initing");

const LOAD_SCRIPT = () => {
  console.log('APP_NAME loaded');
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'APP_NAME.netlify.js';
  document.body.appendChild(script);
  script.addEventListener('load', () => {
    console.log('APP_NAME loaded');
  });
  script.addEventListener('error', e => {
    console.log('APP_NAME load failed', e);
  });
};

LOAD_SCRIPT();