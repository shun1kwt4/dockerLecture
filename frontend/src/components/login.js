import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/api/login', { username, password });
      console.log(response.data);
      // ログイン成功時の処理をここに追加
      setMessage((username)+'様、ログインに成功しました'); 
    } catch (error) {
      console.error('Error logging in:', error);
      // エラー処理をここに追加
      setMessage('エラーが発生しました'); 
    }
  };

  return (
    <div>
      <h1>ログイン画面</h1>
      <form onSubmit={handleLogin}>
        <label>
          ユーザ名:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          パスワード:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">ログイン</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default LoginForm;
