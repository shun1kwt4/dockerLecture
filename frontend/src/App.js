import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState('');

  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:80/api/endpoint', { data: data });
      console.log(response.data); // レスポンスをコンソールに出力
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div>
      <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
      <button onClick={sendDataToBackend}>Send Data</button>
    </div>
  );
};

export default MyComponent;
