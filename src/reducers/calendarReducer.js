import {
  ADD_REMINDER,
  ADD_REMINDER_SUCCESS,
  DELETE_REMINDER,
  SET_CURRENT_REMINDER
} from "../actions/types";
import { dateAsId, timeAsId } from "../helpers/dateId";

const initialState = {
  // prettier-ignore
  reminders: new Map(), //{'2022-03-28': Map time:'' {description:'', city:''}}}
  current: null,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_REMINDER:
      return { ...state, isLoading: true };
    case ADD_REMINDER_SUCCESS: {
      const { date, time, description, city, weatherText } = action.payload;

      const dateId = dateAsId(date);
      const timeId = timeAsId(time);
      const newState = Object.assign(state);

      const timeMap = new Map(newState.reminders.get(dateId));
      timeMap.set(timeId, { date, time, description, city, weatherText });
      newState.reminders.set(dateId, timeMap);
      newState.isLoading = false;
      return newState;
    }

    case SET_CURRENT_REMINDER: {
      const id = dateAsId(action.payload);
      let remindersOfCurrentDate = new Map(state.reminders.get(id));

      const newState = {
        ...state,
        current: { date: action.payload, reminders: remindersOfCurrentDate }
      };
      return newState;
    }

    case DELETE_REMINDER: {
      const { date, time } = action.payload;

      const dateId = dateAsId(date);
      const timeId = timeAsId(time);
      const newState = Object.assign(state);

      const timeMap = new Map(newState.reminders.get(dateId));
      timeMap.delete(timeId);
      newState.reminders.set(dateId, timeMap);
      return newState;
    }

    default:
      return state;
  }
};
