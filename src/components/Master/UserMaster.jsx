import React, { useState, useEffect } from 'react';
import apiURL from '../Common/ApiUrl.jsx';
import { useNavigate } from 'react-router-dom';
import Loder from '../Common/Loder.jsx'
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils.jsx';
import * as signalR from '@microsoft/signalr';
import SignalRURL from '../Common/SignalRURL.jsx';

function UserMaster() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const token = window.sessionStorage.getItem('JwtToken');
    const Id = window.sessionStorage.getItem('Username') === 'Admin' ? 0 : window.sessionStorage.getItem('UserId');
    const Username = window.sessionStorage.getItem('Username');
    const [connection, setConnection] = useState(null);

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
                    console.log(result);
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

    const handleDataChange = (incomingData) => {
        // Destructure the incoming data
        const { ChangeType, ChangeData } = JSON.parse(incomingData);
        const { Id, FullName, EmailId, Password, LastLogin, CreatedOn, UpdatedOn, Active, Username, IpAddress, City, Region, Pincode, MobileNo } = JSON.parse(ChangeData);

        setData(prevData => {
            const formatDate = (dateString) => {
                const date = new Date(dateString);

                const optionsDate = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                };

                const optionsTime = {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                };

                const formattedDate = date.toLocaleDateString('en-US', optionsDate);
                const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

                return `${formattedDate} ${formattedTime}`;
            };
            switch (ChangeType) {
                case 'Insert':
                    // Add new item to the list
                    return [...prevData, {  Id, FullName, EmailId, Password, LastLogin: formatDate(LastLogin), CreatedOn: formatDate(CreatedOn), UpdatedOn: formatDate(UpdatedOn), Active: Active.toString(), Username, IpAddress, City, Region, Pincode, MobileNo }];

                case 'Update':
                    // Update existing item
                    debugger;
                    return prevData.map(item =>
                        item.Id.toString() === Id ? { Id, FullName, EmailId, Password, LastLogin: formatDate(LastLogin), CreatedOn: formatDate(CreatedOn), UpdatedOn: formatDate(UpdatedOn), Active: Active.toString() == "1" ? "True" : "False" , Username, IpAddress, City, Region, Pincode, MobileNo } : item
                    );

                case 'Delete':
                    // Remove item from the list
                    return prevData.filter(item => item.Id.toString() !== Id);

                default:
                    return prevData;
            }
        });
    };


    useEffect(() => {
        const connectToHub = async () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(SignalRURL)
                .build();

            connection.on('ReceiveTbl_UserMasterMessage', message => {
                const result = JSON.parse(decryptJSON(JSON.stringify(message)));
                if (result !== null) {
                    handleDataChange(result);
                }
            });
            try {
                await connection.start();
                console.log('Connected to SignalR hub');
                setConnection(connection);
            } catch (err) {
                console.error('Error connecting to hub:', err);
            }
        };

        connectToHub();

        return () => {
            if (connection) {
                connection.off('ReceiveTbl_UserMasterMessage');
                connection.stop();
            }
        };
    }, []);
    return (
        <div style={{ overflowX: "auto", maxHeight: "80vh" }}>
            {loading ?
                <Loder />
                : null
            }
            <table className="table table-bordered m-auto">
                <thead>
                    <tr style={{ position: 'sticky', top: '0px' }} id='usertable'>
                        <th>Sr.No</th>
                        <th>FullName</th>
                        <th>EmailId</th>
                        <th>Username</th>
                        <th>MobileNo</th>
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
                            <td>{index + 1}</td>
                            <td>{obj.FullName}</td>
                            <td>{obj.EmailId}</td>
                            <td>{obj.Username}</td>
                            <td>{obj.MobileNo}</td>
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
