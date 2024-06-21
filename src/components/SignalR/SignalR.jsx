import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

function SignUp() {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState([]);
  //const url = "https://localhost:7061/GetClients";
  const url = "https://akwebapi.somee.com/GetClients";

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => console.log('Connected to SignalR hub'))
        .catch(err => console.error('Error connecting to hub:', err));

      connection.on('SendStatusToUser', message => {
        setMessage(message)
      });
    }
  }, [connection]);

  return (
    <div>
      <h2>Discount Offers:</h2>
      <ul>
        {message.map((offer, index) => (
          <li key={index}>{offer}</li>
        ))}
      </ul>
    </div>
  );
}

export default SignUp;
