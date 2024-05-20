import React, { useState, useEffect } from 'react';
import apiURL from '../Common/ApiUrl.jsx';
import { useNavigate } from 'react-router-dom';

function UserMaster() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const token = window.sessionStorage.getItem('JwtToken');
    const Id = window.sessionStorage.getItem('Username') === 'Admin' ? 0 : window.sessionStorage.getItem('UserId');
    const Username = window.sessionStorage.getItem('Username');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData([]);
                if (token) {
                    const response = await fetch(apiURL + "GetUser/GetUserDetails", {
                        method: "POST",
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: Id, username: Username }),
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const jsonData = await response.json();
                    setData(jsonData);
                } else {
                    //navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                //navigate('/login');
                setData([]);
            }
        };

        fetchData();
    }, [token, navigate]);

    return (
        <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>FullName</th>
                        <th>EmailId</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>LastLogin</th>
                        <th>CreatedOn</th>
                        <th>UpdatedOn</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((obj, index) => (
                        <tr key={index}>
                            <td>{obj.Id}</td>
                            <td>{obj.FullName}</td>
                            <td>{obj.EmailId}</td>
                            <td>{obj.Username}</td>
                            <td>{obj.Password}</td>
                            <td>{obj.LastLogin}</td>
                            <td>{obj.CreatedOn}</td>
                            <td>{obj.UpdatedOn}</td>
                            <td>{obj.Active}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserMaster;
