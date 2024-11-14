import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gitProvider, googleProvider, auth, db } from "../firebaseConfig"; // Import Firebase config
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {Link} from 'react-router-dom'


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const emailMatch = await auth.signInWithPopup(googleProvider);
      console.log("Google Sign-in successful:", emailMatch.user);
      navigate("/profile"); // Redirect to the home page
    } catch (error) {
      console.error("Google Sign-in error:", error);
    }
  };

  const handleGitSignIn = async () => {
    try {
      const emailMatch = await auth.signInWithPopup(gitProvider);
      console.log("GitHub Sign-in successful:", emailMatch.user);
      navigate("/home"); // Redirect to the home page
    } catch (error) {
      console.error("GitHub Sign-in error:", error);
    }
  };

  const handleRegister = async () => {
    if (!name || !username || !email || !password || !phone) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Generate a random profile picture URL
      const randomProfilePic = `https://api.dicebear.com/5.x/adventurer/svg?seed=${username}`;

      // Save additional user details in Firestore
      await setDoc(doc(db, "Users", userCredential.user.uid), {
        Name: name,
        Username: username,
        Email: email,
        Phone: phone,
        ProfilePic: randomProfilePic,
        CreatedAt: new Date(),
      });

      alert("Registration successful!");
      navigate("/home"); // Redirect to the profile page
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center" >Register</h2>
      <div className="inputGroup">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      </div>

      <div className="inputGroup">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      </div>

      <div className="inputGroup">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      </div>

      <div className="inputGroup">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      </div>

      <div className="inputGroup">
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />
      </div>

      <button className="group group-hover:before:duration-500 justify-center group-hover:after:duration-500 after:duration-500 hover:border-rose-100 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline-offset-2 hover:after:-right-8 hover:before:-left-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-100 relative bg-neutral-800 h-12 w-44 border text-gray-50 text-base text-center font-bold rounded-2xl  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
      onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : ""}
        <p className="z-50">Register</p>

      </button>

      
      <p className="mt-4 mb-4">Already have an account <Link to='/login' className="hover:cursor-pointer text-white hover:underline">Login?</Link></p>
    </div>
    <div className="bg-gray-800 mt-4 p-4 rounded-lg shadow-lg w-full max-w-md">
    <p className="text-center mb-4">OR</p>

<div className="flex items-center justify-center">
<button className="button mr-4" onClick={handleGoogleSignIn}>
<svg viewBox="0 0 256 262" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">
  <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
  <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
  <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
  <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
</svg>
</button>

<button className="gitbutton ml-4" onClick={handleGitSignIn}>
<svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <title>github</title> <rect fill="none" height="24" width="24"></rect> <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path> </g></svg>
</button>
</div>
    </div>
  </div>
  );
};

export default RegisterPage;
