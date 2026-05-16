import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProfile(docSnap.data());
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>📚 StudySync</h2>
        <div style={styles.navLinks}>
          <Link to="/matches" style={styles.link}>🤝 Matches</Link>
          <Link to="/chat" style={styles.link}>💬 Chat</Link>
          <Link to="/events" style={styles.link}>📅 Events</Link>
          <button onClick={handleLogout} style={styles.logout}>Logout</button>
        </div>
      </div>
      <div style={styles.content}>
        {profile ? (
          <>
            <h1>Welcome, {profile.name}! 👋</h1>
            <div style={styles.card}>
              <h3>Your Profile</h3>
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Courses:</b> {profile.courses}</p>
              <p><b>Interests:</b> {profile.interests}</p>
              <p><b>Goals:</b> {profile.goals}</p>
            </div>
            <div style={styles.grid}>
              <Link to="/matches" style={styles.gridCard}>🤝<br/>Find Matches</Link>
              <Link to="/chat" style={styles.gridCard}>💬<br/>Chat</Link>
              <Link to="/events" style={styles.gridCard}>📅<br/>Events</Link>
              <Link to="/profile" style={styles.gridCard}>✏️<br/>Edit Profile</Link>
            </div>
          </>
        ) : <p>Loading your profile...</p>}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f4ff' },
  navbar: { background: '#4f46e5', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: 'white', margin: 0 },
  navLinks: { display: 'flex', gap: '20px', alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none', fontSize: '16px' },
  logout: { background: 'white', color: '#4f46e5', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' },
  content: { padding: '30px' },
  card: { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '20px', maxWidth: '500px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', maxWidth: '600px' },
  gridCard: { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center', textDecoration: 'none', color: '#4f46e5', fontSize: '16px' }
};

export default Dashboard;