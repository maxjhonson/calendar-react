import moment from "moment";

const arrayCalendar = (month, year) => {
  const arr = [];
  const firstDateOfMonth = new Date(year, month, 1);
  const lastDateOfMonth = new Date(year, month + 1, 0);
  const lastWeekDayOfMonth = lastDateOfMonth.getDay();
  const lastCalendarDayOfMonth = lastDateOfMonth.getDate();
  const leftPaddingDays = firstDateOfMonth.getDay();
  const rightPaddingDays =
    lastWeekDayOfMonth === 6 ? 0 : 6 - lastWeekDayOfMonth;

  const arraySize = lastCalendarDayOfMonth + leftPaddingDays + rightPaddingDays;

  for (let x = 0; x < arraySize; x++) {
    if (x < leftPaddingDays) {
      const prevDate = subtractDays(firstDateOfMonth, leftPaddingDays - x);
      arr.push({ date: prevDate, isPadding: true });
    } else if (x - leftPaddingDays < lastCalendarDayOfMonth) {
      const currentDay = x - leftPaddingDays + 1;
      arr.push({ date: new Date(year, month, currentDay), isPadding: false });
    } else {
      const postDate = addDays(
        lastDateOfMonth,
        rightPaddingDays + x - arraySize + 1
      );
      arr.push({ date: postDate, isPadding: true });
    }
  }
  return arr;
};

const addDays = (date, days) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(date.getDate() + days);
  return newDate;
};

const subtractDays = (date, days) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(date.getDate() - days);
  return newDate;
};

export default arrayCalendar;
