import React, { useState, useEffect } from 'react';
import Loader from '../Common/Loder';
import { encryptJSON, decryptJSON } from '../Common/cryptoUtils';

function Home() {
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState("Encrypt");
  const [originalData, setOriginalData] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const placeholderObject = { "key": "value" };
  const placeholderString = JSON.stringify(placeholderObject);
  const handleEncrypt = () => {
    const encrypted = encryptJSON(originalData);
    setEncryptedData(JSON.stringify(encrypted));
  };

  const handleDecrypt = () => {
    const decrypted = decryptJSON(originalData);
    setDecryptedData(JSON.parse(decrypted));
  };
  const handleClear = () => {
    debugger;
    setOriginalData("");
    setEncryptedData("");
    setDecryptedData("");
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ?
        <Loader />
        : null
      }
      <h1>Welcome</h1>
      {window.sessionStorage.getItem('Username') === 'Admin' ?
        <div>
          <div className='d-flex col-md-12'>
            <div className='col-md-2 m-2'>
              <select className='form-select' onChange={e => setEventType(e.target.value)}>
                <option>Encrypt</option>
                <option>Decrypt</option>
              </select>
            </div>
            <button onClick={handleEncrypt} style={{ display: eventType === "Encrypt" ? "block" : "none" }} className='col-md-2 m-2 btn btn-primary'>Encrypt Data</button>
            <button onClick={handleDecrypt} style={{ display: eventType === "Decrypt" ? "block" : "none" }} className='col-md-2 m-2 btn btn-primary'>Decrypt Data</button>
            <button onClick={handleClear} className='col-md-2 m-2 btn btn-danger'>Clear</button>
          </div>
          <div>
            <h2>Data</h2>
            <textarea rows={4} className='w-100' value={originalData} placeholder={eventType === "Encrypt" ? 'Ex: - "Abcdefgh"' : "Ex: - " + placeholderString} onChange={(e) => setOriginalData(e.target.value)} />
          </div>
          <div>
            <h2>Encrypted Data</h2>
            <textarea rows={4} className='w-100' readOnly value={encryptedData} />
          </div>

          <div>
            <h2>Decrypted Data</h2>
            <textarea rows={4} className='w-100' readOnly value={decryptedData} />
          </div>
        </div>
        : null}
    </div>
  );
}

export default Home; 
