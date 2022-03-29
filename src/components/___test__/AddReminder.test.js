import React from "react";
import { mount } from "enzyme/build";
import AddReminder from "../AddReminder";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import reducer from "../../reducers";
import { addReminder } from "../../actions";

const mockStore = configureStore([thunk]);
const initalState = {
  calendar: {
    current: { date: new Date(), reminders: new Map() },
    reminders: new Map()
  }
};

let wrapped, store;
beforeEach(() => {
  store = mockStore(initalState);
  wrapped = mount(
    <Provider store={store}>
      <AddReminder />
    </Provider>
  );
});

it('Ability to add "reminders" for a day and time specified by the user', () => {
  wrapped
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value: "Description" }
    }).change;

  wrapped
    .find("input")
    .at(2)
    .simulate("change", {
      target: { value: "California" }
    }).change;
  wrapped.update();
});

it("actions and dispatch are executed", () => {
  store.dispatch(
    addReminder(new Date(), new Date(), "Description", "New York")
  );
  let action = store.getActions();
  expect(action[0].type).toBe("ADD_REMINDER");
  expect(action[1].type).toBe("ADD_REMINDER_SUCCESS");
});
