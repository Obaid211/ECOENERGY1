import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from "../firebase";

const RegistrationForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user object with all necessary data
      const newUser = {
        id: userCredential.user.uid, // Use Firebase UID
        name: name,
        email: email,
        ecoPoints: 0,
        totalWetWaste: 0,
        totalPlasticWaste: 0,
        joinDate: new Date().toISOString().split("T")[0],
        firebaseUser: userCredential.user
      };

      console.log('User registered successfully:', newUser);
      
      // Call onRegister to update the parent component
      onRegister(newUser);
      
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.fieldGroup}>
        <label htmlFor="name" className={styles.label}>
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="Enter your full name"
          required
          disabled={loading}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Enter your email"
          required
          disabled={loading}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="password" className={styles.label}>
          Set Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Create a password"
          required
          disabled={loading}
          minLength="6"
        />
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
};

export default RegistrationForm;