import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <p>Total Count: {employees.length}</p>
      <input type="text" placeholder="Search" />
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            <img src={employee.image} alt={employee.name} />
            <div>
              <p>Name: {employee.name}</p>
              <p>Email: {employee.email}</p>
              <p>Mobile No: {employee.mobile}</p>
              <p>Designation: {employee.designation}</p>
              <p>Gender: {employee.gender}</p>
              <p>Course: {employee.course.join(', ')}</p>
              <p>Create date: {employee.createDate}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;


javascript
// server.js
const Employee = require('./models/Employee');

// Employee List route
app.get('/api/employees', (req, res) => {
  Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(500).json({ message: 'Failed to fetch employees', error: err }));
});
