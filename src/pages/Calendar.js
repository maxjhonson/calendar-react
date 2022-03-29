import React from "react";
import { Provider } from "react-redux";
import Month from "../components/Month";
import getStore from "../store/getStore";
import reducers from "../reducers";

function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative
  return (
    <Provider store={getStore(reducers)}>
      <Month />
    </Provider>
  );
}

export default Calendar;
