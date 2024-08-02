import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    country: '',
    zip: ''
  });
  const [contactMethods, setContactMethods] = useState([{ contact_method: 'EMAIL', value: '' }]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://free-ap-south-1.cosmocloud.io/development/api/empmanagement', {
        name,
        address,
        contact_methods: contactMethods
      }, {
        headers: {
          'Content-Type': 'application/json',
          'projectId': '66ac89b9a7587fb96278f66f',
          'environmentId': '66ac89b9a7587fb96278f670'
        }
      });
  
      alert('Employee added successfully!');
      navigate('/');

    } catch (error) {
      console.error('Error! ', error.response ? error.response.data : error.message);
      setError('Adding employee failed.');
    }
  };

  const handleContactMethodChange = (index, field, value) => {
    const newContactMethods = [...contactMethods];
    newContactMethods[index][field] = value;
    setContactMethods(newContactMethods);
  };

  const addContactMethod = () => {
    setContactMethods([...contactMethods, { contact_method: 'EMAIL', value: '' }]);
  };

  return (
    <div className="add-employee-container">
      <style>
        {`
          .add-employee-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f5f5f5;
          }

          .add-employee-form {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
          }

          .add-employee-form h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #333333;
          }

          .add-employee-form label {
            display: block;
            margin-bottom: 10px;
            color: #666666;
          }

          .add-employee-form input,
          .add-employee-form select {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #dddddd;
            border-radius: 4px;
            box-sizing: border-box;
          }

          .add-employee-form button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: #ffffff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
          }

          .add-employee-form button:hover {
            background-color: #0056b3;
          }

          .add-employee-form .add-method-button {
            background-color: #28a745;
          }

          .add-employee-form .add-method-button:hover {
            background-color: #218838;
          }
        `}
      </style>

      <div className="add-employee-form">
        <h1>Add Employee</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <h2>Address</h2>
          <label>Line 1:
            <input type="text" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} required />
          </label>
          <label>City:
            <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
          </label>
          <label>Country:
            <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} required />
          </label>
          <label>Zip Code:
            <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} required />
          </label>
          <h2>Contact Methods</h2>
          {contactMethods.map((method, index) => (
            <div key={index}>
              <label>Contact Method:
                <select value={method.contact_method} onChange={(e) => handleContactMethodChange(index, 'contact_method', e.target.value)}>
                  <option value="EMAIL">EMAIL</option>
                  <option value="PHONE">PHONE</option>
                </select>
              </label>
              <label>Value:
                <input type="text" value={method.value} onChange={(e) => handleContactMethodChange(index, 'value', e.target.value)} required />
              </label>
            </div>
          ))}
          <button type="button" onClick={addContactMethod} className="add-method-button">Add Contact Method</button>
          <button type="submit">Add Employee</button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
