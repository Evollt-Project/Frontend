export default defineNuxtPlugin(() => {
  (function (w, d, u) {
    var s = d.createElement("script");
    s.async = true;
    s.src = u + "?" + ((Date.now() / 60000) | 0);
    var h = d.getElementsByTagName("script")[0];
    h.parentNode.insertBefore(s, h);
  })(
    window,
    document,
    "https://cdn-ru.bitrix24.ru/b33302704/crm/site_button/loader_1_ckktro.js",
  );
});
