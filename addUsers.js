// addUsers.js - Run this ONCE to add 30 fake students
// Place this file in your studysync folder and run: node addUsers.js

const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDiU5wJdI4r0nQWTCxp9oUxw5D5qpY-OE4",
  authDomain: "studysync-878b8.firebaseapp.com",
  projectId: "studysync-878b8",
  storageBucket: "studysync-878b8.firebasestorage.app",
  messagingSenderId: "53374174830",
  appId: "1:53374174830:web:65034da5d64a79f387887f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const students = [
  { name: "James Carter",    email: "james.carter92@gmail.com",    courses: "Computer Science, Math",     interests: "Gaming, Coding",        goals: "Pass finals, find study group" },
  { name: "Emma Wilson",     email: "emma.wilson88@gmail.com",     courses: "Information Technology",     interests: "Music, Reading",         goals: "Improve grades, network" },
  { name: "Noah Thompson",   email: "noah.thompson77@gmail.com",   courses: "Software Engineering",       interests: "Football, Movies",        goals: "Get internship, learn React" },
  { name: "Olivia Harris",   email: "olivia.harris21@gmail.com",   courses: "Data Science, Statistics",   interests: "Photography, Yoga",       goals: "Land a tech job" },
  { name: "Liam Johnson",    email: "liam.j.student@gmail.com",    courses: "Math, Physics",              interests: "Chess, Cycling",          goals: "Master algorithms" },
  { name: "Sophia Martinez", email: "sophia.m2024@gmail.com",      courses: "Computer Science",           interests: "Art, Gaming",             goals: "Build my own app" },
  { name: "Ethan Brown",     email: "ethan.brown.cs@gmail.com",    courses: "Networking, Databases",      interests: "Basketball, Music",       goals: "Cisco certification" },
  { name: "Ava Davis",       email: "ava.davis.uef@gmail.com",     courses: "Cybersecurity",              interests: "Reading, Hiking",         goals: "Security analyst role" },
  { name: "Mason Anderson",  email: "mason.anderson55@gmail.com",  courses: "AI, Machine Learning",       interests: "Robotics, Coding",        goals: "PhD in AI" },
  { name: "Isabella Taylor", email: "isabella.t.study@gmail.com",  courses: "Web Development",            interests: "Design, Travel",          goals: "Become UX designer" },
  { name: "Logan Moore",     email: "logan.moore.tech@gmail.com",  courses: "Computer Science, Math",     interests: "Gaming, Gym",             goals: "Graduate with honors" },
  { name: "Mia Jackson",     email: "mia.j.uef2024@gmail.com",     courses: "Software Engineering",       interests: "Music, Cooking",          goals: "Remote dev job" },
  { name: "Lucas White",     email: "lucas.white.coder@gmail.com", courses: "Databases, Cloud Computing", interests: "Tennis, Movies",          goals: "AWS certification" },
  { name: "Charlotte Lee",   email: "charlotte.lee.it@gmail.com",  courses: "Information Systems",        interests: "Fashion, Reading",        goals: "Project manager role" },
  { name: "Benjamin Hall",   email: "ben.hall.dev@gmail.com",      courses: "Full Stack Development",     interests: "Skateboarding, Coding",   goals: "Work at a startup" },
  { name: "Amelia Allen",    email: "amelia.allen.fi@gmail.com",   courses: "Computer Science",           interests: "Yoga, Photography",       goals: "Pass all exams" },
  { name: "Henry Young",     email: "henry.young.cs@gmail.com",    courses: "Networks, Security",         interests: "Football, Gaming",        goals: "Ethical hacker career" },
  { name: "Harper King",     email: "harper.king.uef@gmail.com",   courses: "Data Science",               interests: "Art, Hiking",             goals: "Data analyst at tech firm" },
  { name: "Sebastian Wright","email": "seb.wright.dev@gmail.com",  courses: "Mobile Development",         interests: "Gym, Music",              goals: "Build an iOS app" },
  { name: "Evelyn Scott",    email: "evelyn.scott.fi@gmail.com",   courses: "UX Design, Web Dev",         interests: "Design, Travel",          goals: "Work in UI/UX" },
  { name: "Jack Green",      email: "jack.green.code@gmail.com",   courses: "Software Engineering",       interests: "Rugby, Coding",           goals: "Senior developer" },
  { name: "Scarlett Adams",  email: "scarlett.adams.cs@gmail.com", courses: "Computer Science, AI",       interests: "Reading, Chess",          goals: "AI researcher" },
  { name: "Owen Nelson",     email: "owen.nelson.it@gmail.com",    courses: "IT Management",              interests: "Cycling, Movies",         goals: "IT manager role" },
  { name: "Victoria Baker",  email: "victoria.baker.uef@gmail.com",courses: "Cloud Computing",            interests: "Singing, Cooking",        goals: "Cloud architect" },
  { name: "Ryan Carter",     email: "ryan.carter.dev@gmail.com",   courses: "DevOps, Linux",              interests: "Gaming, Running",         goals: "DevOps engineer" },
  { name: "Zoe Mitchell",    email: "zoe.mitchell.fi@gmail.com",   courses: "Cybersecurity, Networking",  interests: "Badminton, Reading",      goals: "Security consultant" },
  { name: "Dylan Perez",     email: "dylan.perez.cs@gmail.com",    courses: "Computer Science",           interests: "Basketball, Music",       goals: "Software architect" },
  { name: "Lily Roberts",    email: "lily.roberts.uef@gmail.com",  courses: "Data Science, Statistics",   interests: "Painting, Yoga",          goals: "Data scientist" },
  { name: "Aaron Turner",    email: "aaron.turner.dev@gmail.com",  courses: "Full Stack, Databases",      interests: "Football, Gaming",        goals: "Work at Google" },
  { name: "Hannah Phillips", email: "hannah.phillips.it@gmail.com",courses: "Information Technology",     interests: "Music, Photography",      goals: "IT consultant" },
];

async function addUsers() {
  console.log("Starting to add 30 students...\n");
  let success = 0, failed = 0;

  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    try {
      // Create auth account
      const userCred = await createUserWithEmailAndPassword(auth, s.email, "StudySync2024!");
      const uid = userCred.user.uid;

      // Save profile to Firestore
      await setDoc(doc(db, "users", uid), {
        uid,
        name: s.name,
        email: s.email,
        courses: s.courses,
        interests: s.interests,
        goals: s.goals,
      });

      success++;
      console.log(`✅ ${i + 1}/30 Added: ${s.name}`);

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 800));
    } catch (err) {
      failed++;
      console.log(`❌ ${i + 1}/30 Failed: ${s.name} — ${err.message}`);
    }
  }

  console.log(`\nDone! ✅ ${success} added, ❌ ${failed} failed`);
  process.exit(0);
}

addUsers();
