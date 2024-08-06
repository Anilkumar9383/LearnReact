import React, { useEffect, useState } from 'react';
//import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils.jsx';
import SignalRURL from '../Common/SignalRURL.jsx';

function SignUp() {
  const [connection, setConnection] = useState(null);
  const [data, setData] = useState([]);
 // const url = "https://localhost:7061/MessageHub";
  //const url = "https://akwebapi.somee.com/GetClients";

  // useEffect(() => {
  //   const newConnection = new HubConnectionBuilder()
  //     .withUrl(url)
  //     .withAutomaticReconnect()
  //     .build();

  //   setConnection(newConnection);

  //   return () => {
  //     if (connection) {
  //       connection.stop();
  //     }
  //   };
  // }, []);
  const handleDataChange = (incomingData) => {
    debugger;
    
    // Destructure the incoming data
    const { ChangeType, ChangeData } = JSON.parse(incomingData);
    const { Id, Name, Email } = JSON.parse(ChangeData);

    setData(prevData => {
      switch (ChangeType) {
        case 'Insert':
          // Add new item to the list
          return [...prevData, { Id, Name, Email }];
          
        case 'Update':
          // Update existing item
          return prevData.map(item => 
            item.Id === Id ? { Id, Name, Email } : item
          );
          
        case 'Delete':
          // Remove item from the list
          return prevData.filter(item => item.Id !== Id);
          
        default:
          return prevData;
      }
    });
  };

  // useEffect(() => {
  //   if (connection) {
  //     connection.start()
  //       .then(() => console.log('Connected to SignalR hub'))
  //       .catch(err => console.error('Error connecting to hub:', err));

  //     connection.on('ReceiveCustomersMessage', message => {
  //       //debugger;
  //       const result = JSON.parse(decryptJSON(JSON.stringify(message)));
  //       if (result !== null) {
  //         console.log(result);
  //         handleDataChange(result)
  //         console.log(data);
  //        // setData(message)
  //       }
  //     });
  //   }
  // }, [connection]);
  useEffect(() => {
    const connectToHub = async () => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(SignalRURL)  // Replace with your hub URL
        .build();

      connection.on('ReceiveCustomersMessage', message => {
        const result = JSON.parse(decryptJSON(JSON.stringify(message)));
        if (result !== null) {
          handleDataChange(result);
        }
      });
      // connection.on('ReceiveMessage', message => {
      //   // const result = JSON.parse(decryptJSON(JSON.stringify(message)));
      //   // if (result !== null) {
      //   //   handleDataChange(result);
      //   // }
      //   console.log(message);
      // });

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
        connection.off('ReceiveCustomersMessage'); // Clean up handler on unmount
        connection.stop();
      }
    };
  }, []);

  return (
    <div style={{ overflowX: "auto", maxHeight: "80vh" }}>
      {/* {loading ?
        <Loder />
        : null
      } */}
      <table className="table table-bordered m-auto">
        <thead>
          <tr style={{ position: 'sticky', top: '0px' }} id='usertable'>
            <th>Sr.No</th>
            <th>FullName</th>
            <th>EmailId</th>
            {/* <th>Username</th>
            <th>MobileNo</th>
            <th>IpAddress</th>
            <th>City</th>
            <th>Region</th>
            <th>Pincode</th>
            <th>LastLogin</th>
            <th>CreatedOn</th>
            <th>UpdatedOn</th>
            <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((obj, index) => (
            <tr key={index}>
              <td>{obj.Id}</td>
              <td>{obj.Name}</td>
              <td>{obj.Email}</td>
              {/* <td>{obj.Username}</td>
              <td>{obj.MobileNo}</td>
              <td>{obj.IpAddress}</td>
              <td>{obj.City}</td>
              <td>{obj.Region}</td>
              <td>{obj.Pincode}</td>
              <td>{obj.LastLogin}</td>
              <td>{obj.CreatedOn}</td>
              <td>{obj.UpdatedOn}</td>
              <td>{obj.Active}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SignUp;
