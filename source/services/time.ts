import {addMinutes, subMinutes} from 'date-fns';

export const getDateFormat = () => 'yyyy-MM-dd';

export const getDateTimeFormat = () => `${getDateFormat()} HH:mm`;

/**
 * Convert given date to UTC
 * @link https://github.com/date-fns/date-fns/issues/556#issuecomment-391048347
 */
export function toUTC(date: Date) {
  const offset = date.getTimezoneOffset();

  return Math.sign(offset) !== -1 ? addMinutes(date, offset) : subMinutes(date, Math.abs(offset));
}
