import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import UploadPhoto from './components/UploadPhoto'; 
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user ? (
        <div>
          <HomePage />
          <h1>Завантаження фото</h1>
          <UploadPhoto /> {/* Додаєш UploadPhoto компонент для авторизованих користувачів */}
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;
