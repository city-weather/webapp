import React, { useState } from 'react';
import "./App.css";

const App = () => {
  const [wdata, setwdata] = useState('');
  const [cityName, setcityName] = useState('');
  const [mdata, setmdata] = useState('');
  
  const handleClick1 = () => {
    // Replace 'YOUR_BACKEND_ENDPOINT' with the actual endpoint URL
    const endpoint = `http://localhost:30001/getWeather?param=${cityName}`;
    
    fetch(endpoint) 
      .then(response => response.json())
      .then(weatherData => {
        // Handle the response data here
        weatherData = `Temperature in ${cityName}: ${weatherData.main.temp}°C, Humidity: ${weatherData.main.humidity}`;
        setwdata(weatherData)
        console.log(weatherData);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
      });
  };

  const handleClick2 = () => {
    // Replace 'YOUR_BACKEND_ENDPOINT' with the actual endpoint URL
    const endpoint = `http://localhost:30000/`;
    
    fetch(endpoint) 
      .then(response => response.json())
      .then(random_quote => {
        setmdata(random_quote.Quote)
        console.log(random_quote);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
      });
  };

  const handleBothEvents = () => {
    handleClick1();
    handleClick2();
  };
  
  return (
    <div className='center-container'>
      <div className="App">
      <h1>City weather</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={e => setcityName(e.target.value)}
      />
      
      <button onClick={handleBothEvents}>Get Weather</button>
{/* wapi */}
      <div>
      {wdata ? (
        <div>
          <h4>Data from wapi:</h4>
          <h2>{JSON.stringify(wdata, null, 2)}</h2>
        </div>
      ) : (
        <p>Waiting for input...</p>
      )}
    </div>

     {/* mapi */}
     <div>
     {mdata ? (
        <div>
          <h4>Today's thought from mapi</h4>
          <h2>{JSON.stringify(mdata, null, 2)}</h2>
        </div>
      ) : (
        <p>You daily motivation</p>
      )}
     </div>
    </div>
    </div>
  );
};

export default App;
