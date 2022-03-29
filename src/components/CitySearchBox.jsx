import "antd/dist/antd.css";
import { AutoComplete } from "antd";
import React, { useEffect, useState } from "react";
import accuweather from "../api/accuweather";
const { Option } = AutoComplete;

function CitySearchBox({ city, setCity, setLocationKey }) {
  const [result, setResult] = useState([]);

  const fetchCities = async () => {
    if (!city) return;
    try {
      const response = await accuweather.get(
        `locations/v1/cities/autocomplete?q=${city}`
      );
      setResult(response.data);
    } catch {
      setResult([]);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchCities();
    }, 400);

    return () => clearTimeout(timeOut);
  }, [city]);

  const onSelected = (obj) => {
    const { key, value } = obj;
    setCity(value);
    setLocationKey(key);
  };

  return (
    <AutoComplete
      style={{ width: "100%" }}
      onSearch={(value) => setCity(value)}
      onSelect={(_, obj) => onSelected(obj)}
      value={city}
    >
      {result.map(({ Key, LocalizedName, Country }) => (
        <Option key={Key} value={`${Country.LocalizedName} - ${LocalizedName}`}>
          {`${Country.LocalizedName} - ${LocalizedName}`}
        </Option>
      ))}
    </AutoComplete>
  );
}

export default CitySearchBox;
