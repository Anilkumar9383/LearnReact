import React, { useEffect, useState } from 'react';

const Contact = () => {
  const [ip, setIp] = useState('');

  useEffect(() => {
  }, []);
  function text(url) {
    return fetch(url).then(res => res.text());
  }

  text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
    let ip = data.match(ipRegex)[0];
    setIp(ip);
    console.log(ip);
  });
  return (
    <div>
      <h1>Client IP Address</h1>
      <p>{ip}</p>
    </div>
  );
}

export default Contact;
