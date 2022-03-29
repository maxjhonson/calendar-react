import axios from "axios";

export default axios.create({
  baseURL: "http://dataservice.accuweather.com/",
  params: { apikey: process.env.REACT_APP_API_KEY }
});
