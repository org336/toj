/**
 * Formats a Date object into a string with the format 'YYYY-MM-DD HH:mm:ss'
 * @param date - Date object to format
 * @returns formatted date string
 */
export function formatDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Formats a Date object into a string with the format 'YYYY-MM-DD'
 * @param date - Date object to format
 * @returns formatted date string
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Formats a Date object into a string with the format 'HH:mm:ss'
 * @param date - Date object to format
 * @returns formatted time string
 */
export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Parses a date string in the format 'YYYY-MM-DD HH:mm:ss' to a Date object
 * @param dateTimeString - date string to parse
 * @returns Date object
 */
export function parseDateTime(dateTimeString: string): Date {
  const [datePart, timePart] = dateTimeString.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds);
}

/**
 * Parses a date string in the format 'YYYY-MM-DD' to a Date object
 * @param dateString - date string to parse
 * @returns Date object
 */
export function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);

  return new Date(year, month - 1, day);
}

/**
 * Parses a time string in the format 'HH:mm:ss' to a Date object with today's date
 * @param timeString - time string to parse
 * @returns Date object
 */
export function parseTime(timeString: string): Date {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds,
  );
}
