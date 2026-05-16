import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (err) {
      setError('Error creating account. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>📚 StudySync</h1>
        <h2 style={styles.subtitle}>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSignup}>
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={styles.button} type="submit">Sign Up</button>
        </form>
        <p style={styles.link}>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff' },
  box: { background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '360px' },
  title: { textAlign: 'center', color: '#4f46e5', marginBottom: '0' },
  subtitle: { textAlign: 'center', color: '#666', marginTop: '5px' },
  input: { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' },
  error: { color: 'red', textAlign: 'center' },
  link: { textAlign: 'center', marginTop: '15px' }
};

export default Signup;