import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/api/login', { username, password });
      console.log(response.data);
      // ログイン成功時の処理をここに追加
    } catch (error) {
      console.error('Error logging in:', error);
      // エラー処理をここに追加
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="ユーザ名" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;
