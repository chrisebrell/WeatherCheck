import React, { useState } from 'react';
import './ZipcodeInputPage.css';


const ZipcodeInputPage = () => {
  const [zipcode, setZipcode] = useState('');

  const handleZipcodeChange = (e) => {
    setZipcode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Entered Zipcode: ${zipcode}`);
    // You can perform additional actions here, such as sending the zipcode to a server.
  };

  return (
    <div className="form-container">
      <h1>Zipcode Input Page</h1>
      <form onSubmit={handleSubmit}>
        <label className="label">
          Enter Zipcode:
          <input
            type="text"
            value={zipcode}
            onChange={handleZipcodeChange}
            className="input"
            pattern="\d{5}"
            title="Please enter a valid 5-digit zipcode."
            required
          />
        </label>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>

    
  );
};

export default ZipcodeInputPage;