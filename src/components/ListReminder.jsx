import React, { useEffect } from "react";
import moment from "moment";
import { timeAsId } from "../helpers/dateId";
import "../sass/common.scss";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { deleteReminder } from "../actions";

function ListReminder({ reminders, deleteReminder, onEdit }) {
  const onDelete = (date, time) => {
    deleteReminder(date, time);
  };

  const editReminder = (time, description, city, date) => {
    deleteReminder(date, time);
    onEdit(time, description, city);
  };

  const renderReminders = () => {
    if (!reminders) return;
    return [...reminders].map((rem) => {
      const { description, city, time, date, weatherText } = rem[1];
      return (
        <tr key={timeAsId(time)}>
          <td>{moment(time).format("HH:mm")}</td>
          <td>{description}</td>
          <td>{city}</td>
          <td>{weatherText}</td>
          <td>
            <FormOutlined
              className="btn"
              onClick={() => editReminder(time, description, city, date)}
            />
          </td>
          <td>
            <DeleteOutlined
              className="btn"
              onClick={() => onDelete(date, time)}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th style={{ width: "5%" }}>Time</th>
          <th>Description</th>
          <th>City</th>
          <th>Weather</th>
          <th style={{ width: "1%" }}></th>
          <th style={{ width: "1%" }}></th>
        </tr>
      </thead>
      <tbody>{renderReminders()}</tbody>
    </table>
  );
}

const mapStateToProp = (state) => {
  return { reminders: state.calendar.current.reminders };
};

export default connect(mapStateToProp, { deleteReminder })(ListReminder);
