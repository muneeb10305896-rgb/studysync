import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [name, setName] = useState('');
  const [courses, setCourses] = useState('');
  const [interests, setInterests] = useState('');
  const [goals, setGoals] = useState('');
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      await setDoc(doc(db, 'users', user.uid), {
        name, courses, interests, goals, email: user.email, uid: user.uid
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Error saving profile');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>📚 StudySync</h1>
        <h2 style={styles.subtitle}>Set Up Your Profile</h2>
        <form onSubmit={handleSave}>
          <input style={styles.input} type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
          <input style={styles.input} type="text" placeholder="Your Courses (e.g. Math, CS)" value={courses} onChange={e => setCourses(e.target.value)} required />
          <input style={styles.input} type="text" placeholder="Interests (e.g. gaming, music)" value={interests} onChange={e => setInterests(e.target.value)} required />
          <input style={styles.input} type="text" placeholder="Goals (e.g. pass exams, make friends)" value={goals} onChange={e => setGoals(e.target.value)} required />
          <button style={styles.button} type="submit">Save Profile</button>
        </form>
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
};

export default Profile;