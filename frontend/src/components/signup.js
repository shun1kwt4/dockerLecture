import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/api/signup', { username, password });
      console.log(response.data);
      // ログイン成功時の処理をここに追加
      setMessage('登録が完了しました'); 
    } catch (error) {
      console.error('Error logging in:', error);
      // エラー処理をここに追加
      setMessage('エラーが発生しました'); 
    }
  };

  return (
    <div>
    <h1>登録画面</h1>
    <form onSubmit={handleSignin}>
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
      <button type="submit">登録</button>
    </form>
    <div>{message}</div>
  </div>
  );
};

export default LoginForm;
