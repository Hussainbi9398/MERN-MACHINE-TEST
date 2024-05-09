import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployeeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [image, setImage] = useState(null);

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

      const response = await axios.post('/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); // Handle successful submission
    } catch (error) {
      console.error(error); // Handle submission failure
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateEmployeeForm;




// server.js


app.post('/api/employees', (req, res) => {
  
  const newEmployee = new Employee({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    designation: req.body.designation,
    gender: req.body.gender,
    course: req.body.course,
    image: req.file.filename // Assuming you're using multer to handle file uploads
  });
  newEmployee.save()
    .then(() => res.status(201).json({ message: 'Employee created successfully' }))
    .catch((err) => res.status(500).json({ message: 'Failed to create employee', error: err }));
});
