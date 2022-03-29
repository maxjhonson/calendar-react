import moment from "moment";
import accuweather from "../api/accuweather";
import {
  ADD_REMINDER,
  ADD_REMINDER_SUCCESS,
  DELETE_REMINDER,
  SET_CURRENT_REMINDER
} from "./types";

export const addReminder = (date, time, description, city, locationKey) => {
  return async (dispatch) => {
    dispatch({ type: ADD_REMINDER });
    const shortDate = moment(date).format("YYYY-MM-DD");
    let weatherText = "";
    if (locationKey) {
      try {
        const response = await accuweather.get(
          `currentconditions/v1/${locationKey}`
        );
        weatherText = response?.data[0]?.WeatherText;
      } catch {
        weatherText = "n/a";
      }
    }
    dispatch({
      type: ADD_REMINDER_SUCCESS,
      payload: { date: shortDate, time, description, city, weatherText }
    });
    dispatch({ type: SET_CURRENT_REMINDER, payload: date });
  };
};

export const setCurrentReminder = (date) => {
  return (dispatch) => {
    dispatch({ type: SET_CURRENT_REMINDER, payload: date });
  };
};

export const deleteReminder = (date, time) => {
  return (dispatch) => {
    dispatch({ type: DELETE_REMINDER, payload: { date, time } });
    dispatch({ type: SET_CURRENT_REMINDER, payload: date });
  };
};
