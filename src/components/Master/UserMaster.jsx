import React, { useState, useEffect } from 'react';
import apiURL from '../Common/ApiUrl.jsx';
import { useNavigate } from 'react-router-dom';
import Loder from '../Common/Loder.jsx'
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils.jsx';

function UserMaster() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const token = window.sessionStorage.getItem('JwtToken');
    const Id = window.sessionStorage.getItem('Username') === 'Admin' ? 0 : window.sessionStorage.getItem('UserId');
    const Username = window.sessionStorage.getItem('Username');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                setData([]);
                if (token) {
                    const inpObj = encryptJSON(JSON.stringify({ "Id": Id, "Username": Username }));
                    const response = await fetch(apiURL + "GetUser/GetUserDetails", {
                        method: "POST",
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(inpObj),
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.text();
                    const result = JSON.parse(decryptJSON(JSON.stringify(data)));
                    setData(result);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]);
                setLoading(false);
            }
            setLoading(false);
        };

        fetchData();
    }, [token, navigate]);

    return (
        <div style={{ overflowX: "auto" ,maxHeight:"80vh"}}>
            {loading ?
                <Loder />
                : null
            }
            <table className="table table-bordered m-auto">
                <thead>
                    <tr style={{position:'sticky',top:'0px'}} id='usertable'>
                        <th>Id</th>
                        <th>FullName</th>
                        <th>EmailId</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>IpAddress</th>
                        <th>City</th>
                        <th>Region</th>
                        <th>Pincode</th>
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
                            <td>{obj.IpAddress}</td>
                            <td>{obj.City}</td>
                            <td>{obj.Region}</td>
                            <td>{obj.Pincode}</td>
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
