import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        // Реєстрація нового користувача
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Реєстрація успішна!');
      } else {
        // Вхід існуючого користувача
        await signInWithEmailAndPassword(auth, email, password);
        alert('Вхід успішний!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>{isRegistering ? 'Реєстрація' : 'Вхід'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isRegistering ? 'Зареєструватися' : 'Увійти'}</button>
      <p onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer' }}>
        {isRegistering ? 'Вже маєте обліковий запис? Увійти' : 'Немає облікового запису? Зареєструватися'}
      </p>
    </form>
  );
}

export default LoginForm;
