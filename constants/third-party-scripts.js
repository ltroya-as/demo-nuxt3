export const HUBSPOT_SCRIPT = {
  src: '//js-eu1.hs-scripts.com/25724218.js',
  id: 'hs-script-loader',
  type: 'text/javascript',
  defer: true,
}

export const HOTJAR_SCRIPT = {
  id: 'hotjar-script',
  type: 'text/javascript',
  defer: true,
  innerHTML: `
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:3347534,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `,
}
