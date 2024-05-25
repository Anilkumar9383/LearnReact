import React, { useState, useEffect } from 'react';
import Loader from '../Common/Loder';
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils';

function Home() {
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");

  //const originalData = { name: 'Alice', age: 30 };

  const handleEncrypt = () => {
    const encrypted = encryptJSON(originalData);
    setEncryptedData(encrypted);
  };

  const handleDecrypt = () => {
    debugger;
    const decrypted = decryptJSON(encryptedData);
    setDecryptedData(decrypted);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ?
        <Loader />
        : null
      }
      {window.sessionStorage.getItem('Username') === 'Admin' ?
        <div>
          <div className='d-flex'>
            <button onClick={handleEncrypt} >Encrypt Data</button>
            <button onClick={handleDecrypt} >Decrypt Data</button>
          </div>
          <textarea rows={4} cols={40} onChange={(e) => setOriginalData(e.target.value)} />
          <textarea rows={4} cols={40} onChange={(e) => setEncryptedData(e.target.value)} />
          <div>
            <h2>Encrypted Data</h2>
            <pre>{encryptedData}</pre>
          </div>

          <div>
            <h2>Decrypted Data</h2>
            <pre>{JSON.parse(decryptedData)}</pre>
          </div>
        </div>
        : null}
    </div>
  );
}

export default Home; 
