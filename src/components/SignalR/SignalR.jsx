import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

function SignUp() {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7061/GetClients')
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
        console.log('Received message:', message);
      });
    }
  }, [connection]); 

  return (
    <div>

    </div>
  );
}

export default SignUp;
