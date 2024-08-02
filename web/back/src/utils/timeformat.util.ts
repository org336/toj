import moment from 'moment';
/**
 * Formats a Date object into a string with the format 'YYYY-MM-DD HH:mm:ss'
 * @param date - Date object to format
 * @returns formatted date string
 */
export function formatDateTime(date: Date): string {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Formats a Date object into a string with the format 'YYYY-MM-DD'
 * @param date - Date object to format
 * @returns formatted date string
 */
export function formatDate(date: Date): string {
  return moment(date).format('YYYY-MM-DD');
}

/**
 * Formats a Date object into a string with the format 'HH:mm:ss'
 * @param date - Date object to format
 * @returns formatted time string
 */
export function formatTime(date: Date): string {
  return moment(date).format('HH:mm:ss');
}

/**
 * Parses a date string in the format 'YYYY-MM-DD HH:mm:ss' to a Date object
 * @param dateTimeString - date string to parse
 * @returns Date object
 */
export function parseDateTime(dateTimeString: string): Date {
  return moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss').toDate();
}

/**
 * Parses a date string in the format 'YYYY-MM-DD' to a Date object
 * @param dateString - date string to parse
 * @returns Date object
 */
export function parseDate(dateString: string): Date {
  return moment(dateString, 'YYYY-MM-DD').toDate();
}

/**
 * Parses a time string in the format 'HH:mm:ss' to a Date object with today's date
 * @param timeString - time string to parse
 * @returns Date object
 */
export function parseTime(timeString: string): Date {
  const now = moment();
  const time = moment(timeString, 'HH:mm:ss');
  return now
    .set({
      hour: time.get('hour'),
      minute: time.get('minute'),
      second: time.get('second'),
    })
    .toDate();
}
