import React, { useState, useEffect } from 'react';
//import axios from 'axios';

function Login() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://akwebapi.somee.com/api/Login/GetLogins", {method: "Post"});
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <br />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.map((Obj,i) => (
            <tr key={i}>
              <td>{Obj.Username}</td>
              <td>{Obj.Password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Login;
