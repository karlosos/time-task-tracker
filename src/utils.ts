const addLeadingZeros = (num: number, totalLength: number) => {
  return String(num).padStart(totalLength, '0');
}

export const formatElapsedTime = (timeDiff: number) => {
  timeDiff /= 1000;
  const seconds = Math.round(timeDiff % 60);
  timeDiff = Math.floor(timeDiff / 60);
  const minutes = Math.round(timeDiff % 60);
  timeDiff = Math.floor(timeDiff / 60);
  const hours = Math.round(timeDiff % 24);
  return `${addLeadingZeros(hours, 2)}:${addLeadingZeros(minutes, 2)}:${addLeadingZeros(seconds, 2)}`
}

export const formatDayMonthYear = (datetime: number) => {
  const dateObj = new Date(datetime);

  return dateObj.toISOString().slice(0, 10);
};

export const generateId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
