// components/Login.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada kullanıcı adı ve şifre kontrolü yapılabilir.
    // Örneğin,  istek atarak doğrulama sağlanabilir.

    // Örnek bir doğrulama:
    if (username === 'admin' && password === 'password') {
      onLogin(true);
    } else {
      alert('Kullanıcı adı veya şifre hatalı.');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Giriş Yap</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Kullanıcı Adı"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="password"
            label="Şifre"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Giriş Yap
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
