import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Events() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      setEvents(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'events'), {
      title, description, date, location,
      createdBy: auth.currentUser.email
    });
    setTitle(''); setDescription(''); setDate(''); setLocation('');
    setShowForm(false);
    const querySnapshot = await getDocs(collection(db, 'events'));
    setEvents(querySnapshot.docs.map(doc => doc.data()));
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>📚 StudySync</h2>
        <div style={styles.navLinks}>
          <Link to="/dashboard" style={styles.link}>🏠 Dashboard</Link>
          <Link to="/matches" style={styles.link}>🤝 Matches</Link>
          <Link to="/chat" style={styles.link}>💬 Chat</Link>
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1>📅 Campus Events</h1>
          <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>+ Add Event</button>
        </div>
        {showForm && (
          <form onSubmit={handleAddEvent} style={styles.form}>
            <input style={styles.input} type="text" placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <input style={styles.input} type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
            <input style={styles.input} type="date" value={date} onChange={e => setDate(e.target.value)} required />
            <input style={styles.input} type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
            <button style={styles.button} type="submit">Create Event</button>
          </form>
        )}
        <div style={styles.grid}>
          {events.length === 0 ? <p>No events yet. Be the first to add one!</p> : events.map((event, index) => (
            <div key={index} style={styles.card}>
              <h2 style={styles.eventTitle}>{event.title}</h2>
              <p>{event.description}</p>
              <p>📍 {event.location}</p>
              <p>📅 {event.date}</p>
              <p style={styles.creator}>Created by: {event.createdBy}</p>
            </div>
          ))}
        </div>
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
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  addBtn: { background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' },
  form: { background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  eventTitle: { color: '#4f46e5' },
  creator: { color: '#999', fontSize: '12px' }
};

export default Events;