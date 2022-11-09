import "./App.css";
import { React, useState, useEffect } from "react";
import Select from "react-select";
import Axios from "axios";

const Emissions = [
  { label: "CO2", value: "CO2" },
  { label: "N20", value: "N20" },
  { label: "CH4", value: "CH4" },
  { label: "GHGS", value: "GHGS" },
  { label: "HFCS", value: "HFCS" },
  { label: "PFCS", value: "PFCS" },
  { label: "NF3", value: "NF3" },
  { label: "SF6", value: "SF6" },
  { label: "PFCS and PFCS", value: "PFCS and PFCS" },
];

const Countries = [
{label: "Belgium", value: "Belgium" },
{label: "Malta", value: "Malta" },
{label: "Belarus", value: "Belarus" },
{label: "Lithuania", value: "Lithuania" },
{label: "Russian Federation", value: "Russian Federation" },
{label: "Croatia", value: "Croatia" },
{label: "Germany", value: "Germany" },
{label: "United States of America", value: "United States of America" },
{label: "Denmark", value: "Denmark" },
{label: "Australia", value: "Australia" },
{label: "European Union", value: "European Union" },
{label: "Cyprus", value: "Cyprus" },
{label: "Norway", value: "Norway" },
{label: "New Zealand", value: "New Zealand" },
{label: "Slovakia", value: "Slovakia" },
{label: "Estonia", value: "Estonia" },
{label: "Greece", value: "Greece" },
{label: "Japan", value: "Japan" },
{label: "Turkey", value: "Turkey" },
{label: "Ukraine", value: "Ukraine" },
{label: "United Kingdom", value: "United Kingdom" },
{label: "Finland", value: "Finland" },
{label: "France", value: "France" },
{label: "Czech Republic", value: "Czech Republic" },
{label: "Iceland", value: "Iceland" },
{label: "Luxembourg", value: "Luxembourg" },
{label: "Switzerland", value: "Switzerland" },
{label: "Italy", value: "Italy" },
{label: "Portugal", value: "Portugal" },
{label: "Ireland", value: "Ireland" },
{label: "Romania", value: "Romania" },
{label: "Liechtenstein", value: "Liechtenstein" },
{label: "Latvia", value: "Latvia" },
{label: "Canada", value: "Canada" },
{label: "Bulgaria", value: "Bulgaria" },
{label: "Spain", value: "Spain" },
{label: "Poland", value: "Poland" },
{label: "Hungary", value: "Hungary" },
{label: "Sweden", value: "Sweden" },
{label: "Monaco", value: "Monaco" },
{label: "Netherlands", value: "Netherlands" },
{label: "Austria", value: "Austria" },
{label: "Slovenia", value: "Slovenia" },
];

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [emissionType, setEmissionType] = useState("");
  const [countryName, setCountryName] = useState("");



  useEffect(() => {
    Axios.get("https://bluesky-app.herokuapp.com/countries")
      .then((response) => {
        console.log(response.data.data);
        setFilteredData(response.data.data);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);

// ............................................................... Handlers ...........................................................

  const handleStartYear = (event) => {
    setStartYear(event.target.value);
    console.log("Start year:", event.target.value);
  };
  const handleEndYear = (event) => {
    setEndYear(event.target.value);
    console.log("End year:", event.target.value);
  };
  const handleTypeSelect = (e) => {
    setEmissionType(e.value);
    console.log("Emission Type:", emissionType);
  };
  const handleCountry = (e) => {
    setCountryName(e.value);
    console.log("Country Name:", countryName);
  };
  let handleSubmit = async (e) => {  
    e.preventDefault();
      let query = await Axios.get(`https://bluesky-app.herokuapp.com/country/${countryName}?sYear=${startYear}&eYear=${endYear}&category=${emissionType}`, {
        
      }).then((resp)=>{
        setFilteredData(resp.data.data);
        console.log(resp.data.data);
        
      })
      console.log(query.request.responseURL)
    };
    // .........................................................................................................................

  return (
    <div className="App">
      <h1>ENVIRONMENT DATA</h1>

      {/* .......................................................Form........................................................... */}
      
      <form onSubmit={handleSubmit} id="form">
        <div className="container">
        <p>{`${countryName}`}</p>
        <Select id="select"
            onChange={handleCountry}
            options={Countries}
            required
            value={Countries.filter(function (country) {
              return country.value === countryName;
            })}
            placeholder="Select Country"
        />
        </div>
        <div className="container">
          <p>{`${startYear}`}</p>
        <input
          type="number"
          onChange={handleStartYear}
          required
          value={startYear}
          placeholder="Enter Start Year"
          id="startYear"
          name="startYear"
        />
        </div>
        <div className="container">
        <p>{`${endYear}`}</p>
        <input
          type="number"
          onChange={handleEndYear}
          value={endYear}
          placeholder="Enter End Year"
          required
          id="endYear"
          name="endYear"
        />
        </div>

        <div className="container">
        <p>{`${emissionType}`}</p>
        <Select id="select"
          onChange={handleTypeSelect}
          required
          options={Emissions}
          // value = {emissionType}
          // value={Emissions.filter(function (emission) {
          //   emission.value = emissionType
          //   return emissionType;
          // })}
          placeholder = "Select Emission"
        />
        </div>
        <button id="search-btn" type="submit">Search</button>
        </form>

      {/* ...............................................................Table.............................................................  */}
      <div className="table-container">
        <p id="loader">Loading...</p>
        <table>
          <thead id="table-head">
            <tr>
              <th>Country or Area</th>
              <th>Year</th>
              <th>Value</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {filteredData.map((value, i) => (
              <tr key={i}>
                <td>{value.country_or_area}</td>
                <td>{value.year}</td>
                <td>{value.value}</td>
                <td>{value.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
