import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome Admin Panel</h1>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/employee-list">Employee List</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  );
};

export default Dashboard;


javascript
// server.js


// Dashboard route
app.get('/dashboard', (req, res) => {
  
  res.send('Welcome Admin Panel');
});
