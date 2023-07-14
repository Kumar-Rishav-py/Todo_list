// import React, { useState } from 'react';
// import { auth, firestore } from '../firebaseConfig';
// import { Link, useNavigate } from 'react-router-dom';
// import '../pages/Registration.css';

// function Registration() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [submitButton, setSubmitButton] = useState(false);
//   const navigate = useNavigate();

//   const handleRegistration = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       setSubmitButton(true);
//       const { user } = await auth.createUserWithEmailAndPassword(email, password);
//       await firestore.collection('users').doc(user.uid).set({
//         email: user.email,
        
//       });
//       setSubmitButton(false);
//       navigate("/");

//     } catch (error) {
//       alert('This email is already registered.');
//       console.log(error);
//     }
//   };
//   const handleGoogleLogin = async () => {
//     const provider = new auth.GoogleAuthProvider();
//     try {
//       const { user } = await auth.signInWithPopup(provider);
//       const userRef = firestore.collection('users').doc(user.uid);
//       const snapshot = await userRef.get();

//       if (!snapshot.exists) {
//         await userRef.set({
//           email: user.email,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div className="background">
//         <div className="shape"></div>
//         <div className="shape"></div>
//       </div>
//       <form onSubmit={handleRegistration} className="form2">
//         <h2>Registration</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <button onClick={handleRegistration} className="butto" type="submit" disabled={setSubmitButton}>
//           Register
//         </button>
//         <div>
//           <br />
//           <p>
//             Already have an account? <Link to="/">Log in here</Link>.
//           </p>
//         </div>
//       </form>

//       {/* <div>
//         <button onClick={handleGoogleLogin}>Register with Google</button>
//       </div> */}
//     </div>
//   );
// }

// export default Registration;
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/Registration.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAlertDisplayed, setIsAlertDisplayed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isRegistering && !isAlertDisplayed) {
      timer = setTimeout(() => {
        setIsRegistering(false);
        alert("Succesfully Registered");
        navigate('/');
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isRegistering, isAlertDisplayed, navigate]);

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsRegistering(true);

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      await firestore.collection('users').add({
        email: email,
      });
    } catch (error) {
      setIsAlertDisplayed(true);
      setIsRegistering(false);
      alert('Registration failed. Please try again.');
      console.log(error);
    }
  };

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleRegistration} className="form2">
        <h2>Registration</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="butto" type="submit" disabled={isRegistering}>
          {isRegistering ? 'Registering...' : 'Register'}
        </button>
        <div>
          <br />
          <p>
            Already have an account? <Link to="/">Log in here</Link>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Registration;






