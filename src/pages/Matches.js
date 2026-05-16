import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Matches() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const allUsers = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== auth.currentUser.uid) {
          allUsers.push(doc.data());
        }
      });
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>📚 StudySync</h2>
        <div style={styles.navLinks}>
          <Link to="/dashboard" style={styles.link}>🏠 Dashboard</Link>
          <Link to="/chat" style={styles.link}>💬 Chat</Link>
          <Link to="/events" style={styles.link}>📅 Events</Link>
        </div>
      </div>
      <div style={styles.content}>
        <h1>🤝 Find Study Partners</h1>
        {users.length === 0 ? (
          <p>No other students yet. Share the app with your classmates!</p>
        ) : (
          <div style={styles.grid}>
            {users.map((user, index) => (
              <div key={index} style={styles.card}>
                <h2 style={styles.name}>{user.name}</h2>
                <p><b>📚 Courses:</b> {user.courses}</p>
                <p><b>🎯 Interests:</b> {user.interests}</p>
                <p><b>🏆 Goals:</b> {user.goals}</p>
                <Link to="/chat" style={styles.button}>💬 Message</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f4ff' },
  navbar: { background: '#4f46e5', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: 'white', margin: 0 },
  navLinks: { display: 'flex', gap: '20px' },
  link: { color: 'white', textDecoration: 'none', fontSize: '16px' },
  content: { padding: '30px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  name: { color: '#4f46e5' },
  button: { display: 'inline-block', marginTop: '10px', background: '#4f46e5', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none' }
};

export default Matches;