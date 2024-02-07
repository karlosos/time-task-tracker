const addLeadingZeros = (num: number, totalLength: number) => {
  return String(num).padStart(totalLength, "0");
};

export const formatElapsedTime = (timeDiff: number) => {
  timeDiff = Math.floor(timeDiff / 1000);
  const seconds = Math.round(timeDiff % 60);
  timeDiff = Math.floor(timeDiff / 60);
  const minutes = Math.round(timeDiff % 60);
  timeDiff = Math.floor(timeDiff / 60);
  const hours = Math.round(timeDiff);
  return `${addLeadingZeros(hours, 2)}:${addLeadingZeros(
    minutes,
    2,
  )}:${addLeadingZeros(seconds, 2)}`;
};

export const parseElapsedTime = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const totalMilliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  return totalMilliseconds;
};

export const formatDayMonthYear = (datetime: number) => {
  const dateObj = new Date(datetime);

  return dateObj.toISOString().slice(0, 10);
};

export const formatDatetime = (datetime: number) => {
  const dateObj = new Date(datetime);

  return dateObj.toLocaleString();
};

export const formatTime = (datetime: number) => {
  const dateObj = new Date(datetime);

  const hours = addLeadingZeros(dateObj.getHours(), 2);
  const minutes = addLeadingZeros(dateObj.getMinutes(), 2);
  const seconds = addLeadingZeros(dateObj.getSeconds(), 2);

  return `${hours}:${minutes}:${seconds}`;
};

export const generateId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
