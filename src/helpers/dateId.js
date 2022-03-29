import moment from "moment";

export const dateAsId = (date) => {
  return moment(date).format("YYYYMMDD");
};

export const timeAsId = (time) => {
  return moment(time).format("HHmm");
};
