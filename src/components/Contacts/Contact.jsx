import React, { useEffect, useState } from 'react';

const Contact = () => {
  const [ip, setIp] = useState()
  const [city, setCity] = useState()
  const [region, setRegion] = useState()
  const [postal, setPostal] = useState()

  const getIp = async () => {
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()
    setIp(data.ip)
    setCity(data.city)
    setRegion(data.region)
    setPostal(data.postal)
  }
  useEffect(() => {
    getIp()
  }, [])
  return (
    <div>
      <h3>Client IP Address</h3>
      <p>{ip}</p>
      <h3>Client City</h3>
      <p>{city}</p>
      <h3>Client Region</h3>
      <p>{region}</p>
      <h3>Client Pincode</h3>
      <p>{postal}</p>
    </div>
  );
}

export default Contact;
