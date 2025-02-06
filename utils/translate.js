export function translate(key) {
   const nuxtApp = useNuxtApp();
   return nuxtApp.$i18n.t(key);
}