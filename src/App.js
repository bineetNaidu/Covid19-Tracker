import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import InfoBox from "./InfoBox";

import "./App.css";

function App() {
  // STATES
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  // HOOKS && CONTEXTS
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countriesList = data.map((c) => ({
            name: c.country,
            value: c.countryInfo.iso2,
          }));
          setCountries(countriesList);
        });
    };
    getCountriesData();
  }, []);

  // FUNCTIONS
  const onCountryChange = async (e) => setCountry(e.target.value);

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value} key={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" total={2000} cases={123} />
        <InfoBox title="Recovered" total={720} cases={132} />
        <InfoBox title="Deaths" total={70} cases={145} />
      </div>

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
