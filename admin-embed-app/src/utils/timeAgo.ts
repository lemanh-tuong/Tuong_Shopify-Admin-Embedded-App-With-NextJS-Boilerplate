import { i18n, translation } from 'src/translation';

type TranslationName = keyof typeof translation.en;

const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_DAY * 30;

function getCount(seconds: number, num: number) {
  return Math.floor(seconds / num);
}

function getText(seconds: number, num: number, textSingular: TranslationName, textPlural: TranslationName) {
  const s = getCount(seconds, num);
  return i18n.t(s > 1 ? textPlural : textSingular, { s: s.toString(), p: '' });
}

export function timeAgo(unixTimestamp: number, date: string) {
  const seconds = Math.floor(Date.now() / 1000 - unixTimestamp);
  if (seconds >= ONE_MONTH) {
    return date;
  }
  if (seconds >= ONE_WEEK) {
    return getText(seconds, ONE_WEEK, 'weekAgo', 'weeksAgo');
  }
  if (seconds >= ONE_DAY) {
    return getText(seconds, ONE_DAY, 'dayAgo', 'daysAgo');
  }
  if (seconds >= ONE_HOUR) {
    return getText(seconds, ONE_HOUR, 'hourAgo', 'hoursAgo');
  }
  if (seconds >= ONE_MINUTE) {
    return getText(seconds, ONE_MINUTE, 'minuteAgo', 'minutesAgo');
  }
  if (seconds >= 0 && seconds < ONE_MINUTE) {
    return i18n.t('justNow');
  }
  return date;
}
