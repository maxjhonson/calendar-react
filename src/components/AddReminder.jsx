import React, { useEffect, useState } from "react";
import "../sass/modal.scss";
import "../sass/form.scss";
import "antd/dist/antd.css";
import { Input, Spin, TimePicker } from "antd";
import { connect } from "react-redux";
import { addReminder } from "../actions";
import moment from "moment";
import ListReminder from "./ListReminder";
import CitySearchBox from "./CitySearchBox";

const AddReminder = ({ addReminder, remindersOfCurrentDate, close }) => {
  const [time, setTime] = useState();
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [locationKey, setLocationKey] = useState();
  const date = remindersOfCurrentDate.date;

  const onSubmit = (e) => {
    e.preventDefault();
    addReminder(date, time, description, city, locationKey);
    resetForm();
  };

  const resetForm = () => {
    initializeForm(null, "", "");
  };

  const initializeForm = (time, description, city) => {
    setDescription(description);
    setTime(time);
    setCity(city);
  };

  return (
    <div className="modal" onClick={close}>
      <div className=" responsive-container">
        <div className="content" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <h3>Add Reminder for {moment(date).format("DD-MM-YYYY")}</h3>
          </div>
          <div className="body">
            <Spin spinning={false}>
              <form className="form" onSubmit={onSubmit}>
                <label>Time</label>
                <TimePicker
                  minuteStep={30}
                  showSecond={false}
                  format="HH:mm"
                  className="picker-time-form"
                  value={time}
                  onChange={(time) => setTime(time)}
                />

                <label>Description</label>
                <Input
                  showCount
                  type="text"
                  value={description}
                  maxLength={30}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <label>City</label>
                <CitySearchBox
                  setCity={setCity}
                  setLocationKey={setLocationKey}
                  city={city}
                />
                <button type="submit">Save</button>
                <ListReminder onEdit={initializeForm} />
              </form>
            </Spin>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = (state) => {
  return { remindersOfCurrentDate: state.calendar.current };
};

export default connect(mapStateToProp, { addReminder })(AddReminder);
