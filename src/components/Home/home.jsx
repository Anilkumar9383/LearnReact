import React, { useState, useEffect } from 'react';
import Loader from '../Common/Loder';
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils';
import { encryptJson1, decryptJson1 } from '../Common/CryptoText';
import { json } from 'react-router-dom';

function Home() {
  const [loading, setLoading] = useState(true);
  const [originalData,setOriginalData] = useState(null);
  const [encryptedData, setEncryptedData] = useState(null);
  const [decryptedData, setDecryptedData] = useState(null);

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
      <div>
        <div className='d-flex'>
        <button onClick={handleEncrypt} >Encrypt Data</button>
        <button onClick={handleDecrypt} >Decrypt Data</button>
        </div>
        <textarea rows={4} cols={40} onChange={(e) => setOriginalData(e.target.value)}/>
        {/* <textarea rows={4} cols={40} value={JSON.stringify(encryptedData)}/>*/}
        <textarea rows={4} cols={40} value={encryptedData} onChange={(e) => setEncryptedData(e.target.value)}/>
        <div>
          <h2>Encrypted Data</h2>
          <pre>{encryptedData}</pre>
        </div>

        <div>
          <h2>Decrypted Data</h2>
          <pre>{decryptedData}</pre>
        </div>
      </div>
    </div>
  );
}

export default Home; 
