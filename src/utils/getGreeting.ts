import { getLang } from '~/utils/getLang';

export const getGreeting = () => {
  const hours = new Date().getHours();
  const lang = getLang();
  if (hours < 6) {
    return lang === 'en' ? 'Good night' : 'Доброй ночи';
  } else if (hours >= 6 && hours < 12) {
    return lang === 'en' ? 'Good morning' : 'Доброе утро';
  } else if (hours >= 12 && hours < 18) {
    return lang === 'en' ? 'Good afternoon' : 'Добрый день';
  } else {
    return lang === 'en' ? 'Good evening' : 'Добрый вечер';
  }
};
