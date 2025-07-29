import { CurrentTime } from '../common/type';
import moment from 'moment';

export default class TimeUtil {
  static getTimezone() {
    return moment().utcOffset() / 60;
  }
}

export const DATE_FORMAT = {
  DAY_MONTH_MINUS: 'DD-MM-YYYY',
  DAY_MONTH: 'DD/MM/YYYY',
  MONTH_DAY: 'YYYY/MM/DD',
  MONTH_DAY_MINUS: 'YYYY-MM-DD',
};

export const displayTimeDifference = (time: Date) => {
  const currentTime = moment();
  const notificationDateTime = moment(time);

  const differenceInMinutes = currentTime.diff(notificationDateTime, 'minutes');
  const differenceInHours = currentTime.diff(notificationDateTime, 'hours');
  const differenceInDays = currentTime.diff(notificationDateTime, 'days');
  const differenceInWeeks = currentTime.diff(notificationDateTime, 'weeks');
  const differenceInMonths = currentTime.diff(notificationDateTime, 'months');
  const differenceInYears = currentTime.diff(notificationDateTime, 'years');

  if (differenceInMinutes >= 0 && differenceInMinutes < 60) {
    return `${differenceInMinutes} phút trước`;
  }
  if (differenceInHours < 24) {
    return `${differenceInHours} giờ trước`;
  } else if (differenceInDays < 7) {
    return `${differenceInDays} ngày trước`;
  } else if (differenceInWeeks < 4) {
    return `${differenceInWeeks} tuần trước`;
  } else if (differenceInMonths < 12) {
    return `${differenceInMonths} tháng trước`;
  } else {
    return `${differenceInYears} năm trước`;
  }
};

export const convertDateTime = (
  input: string,
  outputFormat:
    | 'YYYY/MM/DD'
    | 'YYYY-MM-DD'
    | 'DD/MM/YYYY'
    | 'DD-MM-YYYY'
    | 'hh:mm:ss'
    | 'DD/MM/YYYY - hh:mm:ss',
): string => {
  if (!input) return '';

  // Chuẩn hóa chuỗi input
  const safeInput = input.replace(' ', 'T');

  const dateObject = new Date(safeInput);
  if (isNaN(dateObject.getTime())) return '';
  // Lấy ngày, tháng, năm
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = dateObject.getFullYear();

  // Lấy giờ, phút, giây
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  const seconds = String(dateObject.getSeconds()).padStart(2, '0');

  switch (outputFormat) {
    case 'YYYY/MM/DD':
      return `${year}/${month}/${day}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD-MM-YYYY':
      `${day}-${month}-${year}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'hh:mm:ss':
      return `${hours}:${minutes}:${seconds}`;
    case 'DD/MM/YYYY - hh:mm:ss':
      return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    default:
      return 'Invalid format';
  }
};

export const convertDateTimeString = (
  input: string | Date,
  outputFormat:
    | 'YYYY/MM/DD'
    | 'YYYY-MM-DD'
    | 'DD/MM/YYYY'
    | 'DD-MM-YYYY'
    | 'hh:mm:ss'
    | 'DD/MM/YYYY - hh:mm:ss',
): string => {
  try {
    const dateObj = typeof input === 'string' ? new Date(input) : input;

    if (isNaN(dateObj.getTime())) {
      return '';
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    const time = `${hours}:${minutes}:${seconds}`;

    switch (outputFormat) {
      case 'YYYY/MM/DD':
        return `${year}/${month}/${day}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'DD-MM-YYYY':
        return `${day}-${month}-${year}`;
      case 'hh:mm:ss':
        return time;
      case 'DD/MM/YYYY - hh:mm:ss':
        return `${day}/${month}/${year} - ${time}`;
      default:
        return '';
    }
  } catch {
    return '';
  }
};

export const DefaultConvertTime = (date?: string) => {
  const newFormatDate = date
    ? moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    : '';
  return newFormatDate;
};

const getRandomGreeting = (greetings: string[]) => {
  return greetings[Math.floor(Math.random() * greetings.length)];
};

export const Greeting = () => {
  const hour = moment().hour();
  let greetingMessage;
  const morningGreetings = [
    'Chúc bạn một ngày mới đầy năng lượng!',
    'Buổi sáng tốt lành!',
    'Hãy bắt đầu ngày mới với nụ cười!',
  ];

  const afternoonGreetings = [
    'Hy vọng bạn có một buổi chiều tuyệt vời!',
    'Buổi chiều vui vẻ!',
    'Chúc bạn làm việc hiệu quả!',
  ];

  const eveningGreetings = [
    'Chúc bạn có một buổi tối thư giãn!',
    'Buổi tối an lành!',
    'Hy vọng bạn có một buổi tối tuyệt vời!',
  ];

  switch (true) {
    case hour < 12:
      greetingMessage = getRandomGreeting(morningGreetings);
      break;
    case hour < 19:
      greetingMessage = getRandomGreeting(afternoonGreetings);
      break;
    case hour > 19:
      greetingMessage = getRandomGreeting(eveningGreetings);
      break;
    default:
      greetingMessage = 'Kính chào quý khách';
      break;
  }

  return greetingMessage;
};

export const getCurrentTime = (): CurrentTime => {
  const now = new Date();
  const daysOfWeek = [
    'Chủ Nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  const dayOfWeek = daysOfWeek[now.getDay()];
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return {
    dayOfWeek: dayOfWeek,
    day: day,
    month: month,
    year: year,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

export const convertTime = (
  date: CurrentTime,
  format:
    | 'YYYY/MM/DD'
    | 'YYYY-MM-DD'
    | 'DD/MM/YYYY'
    | 'DD-MM-YYYY'
    | 'hh:mm:ss'
    | 'DD/MM/YYYY - hh:mm:ss'
    | 'DD/MM/YYYY hh:mm:ss',
): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = date.year;
  const month = pad(date.month);
  const day = pad(date.day ?? 1);

  const hours = pad(date.hours);
  const minutes = pad(date.minutes);
  const seconds = pad(date.seconds);

  switch (format) {
    case 'YYYY/MM/DD':
      return `${year}/${month}/${day}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'DD-MM-YYYY':
      return `${day}-${month}-${year}`;
    case 'hh:mm:ss':
      return `${hours}:${minutes}:${seconds}`;
    case 'DD/MM/YYYY - hh:mm:ss':
      return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    case 'DD/MM/YYYY hh:mm:ss':
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    default:
      return '';
  }
};

export const getDayOfWeek = (): string => {
  const now = new Date();
  const daysOfWeek = [
    'Chủ Nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  const dayOfWeek = daysOfWeek[now.getDay()];
  return dayOfWeek;
};
