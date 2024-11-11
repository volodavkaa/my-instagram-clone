import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? <HomePage /> : <LoginForm />}
    </div>
  );
}

export default App;
