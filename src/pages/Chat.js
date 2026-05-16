import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    await addDoc(collection(db, 'messages'), {
      text: message,
      sender: auth.currentUser.email,
      timestamp: serverTimestamp()
    });
    setMessage('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>📚 StudySync</h2>
        <div style={styles.navLinks}>
          <Link to="/dashboard" style={styles.link}>🏠 Dashboard</Link>
          <Link to="/matches" style={styles.link}>🤝 Matches</Link>
          <Link to="/events" style={styles.link}>📅 Events</Link>
        </div>
      </div>
      <div style={styles.chatContainer}>
        <h1 style={styles.title}>💬 Group Chat</h1>
        <div style={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              ...styles.message,
              alignSelf: msg.sender === auth.currentUser.email ? 'flex-end' : 'flex-start',
              background: msg.sender === auth.currentUser.email ? '#4f46e5' : 'white',
              color: msg.sender === auth.currentUser.email ? 'white' : 'black',
            }}>
              <small style={styles.sender}>{msg.sender}</small>
              <p style={styles.text}>{msg.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} style={styles.form}>
          <input style={styles.input} type="text" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} />
          <button style={styles.button} type="submit">Send</button>
        </form>
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
  chatContainer: { padding: '20px', maxWidth: '700px', margin: '0 auto' },
  title: { color: '#4f46e5' },
  messages: { background: 'white', borderRadius: '12px', padding: '20px', height: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  message: { padding: '10px 15px', borderRadius: '12px', maxWidth: '70%' },
  sender: { fontSize: '11px', opacity: 0.7 },
  text: { margin: '4px 0 0 0' },
  form: { display: 'flex', gap: '10px', marginTop: '15px' },
  input: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' },
  button: { padding: '12px 24px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }
};

export default Chat;