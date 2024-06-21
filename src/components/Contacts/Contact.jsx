import React, { useEffect, useState } from 'react';

const Contact = () => {
  const [ip, setIp] = useState()

  const getIp = async () => {
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()
    setIp(data.ip)
  }
  useEffect(() => {
    getIp()
  }, [])
  return (
    <div>
      <h1>Client IP Address</h1>
      <p>{ip}</p>
    </div>
  );
}

export default Contact;
