import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeEditForm = ({ match }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`/api/employees/${match.params.id}`)
      .then(response => {
        const { name, email, mobile, designation, gender, course, image } = response.data;
        setName(name);
        setEmail(email);
        setMobile(mobile);
        setDesignation(designation);
        setGender(gender);
        setCourse(course);
        setImage(image);
      })
      .catch(error => {
        console.error(error);
      });
  }, [match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('designation', designation);
      formData.append('gender', gender);
      formData.append('course', course);
      formData.append('image', image);

      const response = await axios.put(`/api/employees/${match.params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); 
    } catch (error) {
      console.error(error); 
    }
  };
   return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Mobile No" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>
      <label>
        Gender:
        <input type="radio" name="gender" value="M" checked={gender === 'M'} onChange={() => setGender('M')} /> Male
        <input type="radio" name="gender" value="F" checked={gender === 'F'} onChange={() => setGender('F')} /> Female
      </label>
      <label>
        Course:
        <input type="checkbox" value="MCA" checked={course.includes('MCA')} onChange={(e) => setCourse([...course, 'MCA'])} /> MCA
        <input type="checkbox" value="BCA" checked={course.includes('BCA')} onChange={(e) => setCourse([...course, 'BCA'])} /> BCA
        <input type="checkbox" value="BSC" checked={course.includes('BSC')} onChange={(e) => setCourse([...course, 'BSC'])} /> BSC
      </label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Update</button>
    </form>
  );
};

export default EmployeeEditForm;

javascript

// server.js


const Employee = require('./models/Employee');


app.get('/api/employees/:id', (req, res) => {
  Employee.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(404).json({ message: 'Employee not found', error: err }));
});

app.put('/api/employees/:id', (req, res) => {

  Employee.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.status(200).json({ message: 'Employee updated successfully' }))
    .catch(err => res.status(500).json({ message: 'Failed to update employee', error: err }));
});







