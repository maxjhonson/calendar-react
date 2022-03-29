import React from "react";
import moment from "moment";
import { timeAsId } from "../helpers/dateId";

function DateBox({ data, addReminder, isPadding }) {
  const { date, reminders } = data;

  const renderReminders = () => {
    if (!reminders) return;
    return [...reminders].map((rem) => {
      const { time, description } = rem[1];
      return <li key={timeAsId(time)}>{description}</li>;
    });
  };

  const onClick = () => {
    addReminder(date);
  };

  let cssString = "";
  if (moment(date).isoWeekday() > 5) cssString = "weekend";
  if (isPadding) cssString += ` padding-days`;

  return (
    <div className={`calendarday ${cssString}`} onClick={onClick}>
      <div className="content">
        <span>{moment(date).format("D")}</span>
        <ul>{renderReminders()}</ul>
      </div>
    </div>
  );
}

export default DateBox;
