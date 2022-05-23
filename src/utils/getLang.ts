export const getLang = () => {
  const lang = localStorage.getItem('lang') || '';
  return lang === 'en' || lang === '' ? 'en' : 'ru';
};
