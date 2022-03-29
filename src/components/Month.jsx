import React, { useEffect, useState } from "react";
import arrayCalendar from "../helpers/arrayCalendar";
import "../sass/month.scss";
import "../sass/modal.scss";
import "../sass/common.scss";
import AddReminder from "./AddReminder";
import DateBox from "./DateBox";
import DaysName from "./DaysName";
import { connect } from "react-redux";
import { setCurrentReminder } from "../actions";
import { dateAsId } from "../helpers/dateId";
import moment from "moment";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function Month({ setCurrentReminder, reminderByDate }) {
  const [monthData, setMonthData] = useState([]);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const month = moment(currentDate).month();
    const year = moment(currentDate).year();
    setMonthData(arrayCalendar(month, year));
  }, [currentDate]);

  const nextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "month");
    setCurrentDate(nextMonth);
  };

  const previousMonth = () => {
    const nextMonth = moment(currentDate).subtract(1, "month");
    setCurrentDate(nextMonth);
  };

  const setToday = () => {
    setCurrentDate(new Date());
  };

  const displayReminderModal = (date) => {
    setCurrentReminder(date);
    setShowAddReminder(true);
  };

  const closeReminderModal = () => {
    setShowAddReminder(false);
  };

  const renderDays = () => {
    return monthData.map(({ date, isPadding }) => {
      const reminders = reminderByDate.get(dateAsId(date));
      return (
        <DateBox
          key={dateAsId(date)}
          data={{ date: date, reminders }}
          addReminder={displayReminderModal}
          isPadding={isPadding}
        />
      );
    });
  };

  return (
    <div className="responsive-container">
      <div className="header">
        <button onClick={previousMonth}>
          <LeftOutlined />
        </button>
        <button onClick={nextMonth}>
          <RightOutlined />
        </button>
        <button onClick={setToday}>Today</button>
        <h1>{moment(currentDate).format("MMMM YYYY")}</h1>
      </div>
      <div className="grid-month">
        <DaysName />
        {renderDays()}

        {showAddReminder && <AddReminder close={closeReminderModal} />}
      </div>
    </div>
  );
}

const mapStateToProp = (state) => {
  return { reminderByDate: state.calendar.reminders };
};

export default connect(mapStateToProp, { setCurrentReminder })(Month);
