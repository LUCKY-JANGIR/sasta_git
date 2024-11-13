import React, { useState } from "react";
import { signUpWithEmail, logInWithEmail } from "../auth/EmailAuth";
import { sendOtp, verifyOtp } from "../auth/PhoneAuth";
import { signInWithGoogle, signOut } from "../auth/GoogleAuth";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import "../firebaseConfig"; // Ensure Firebase is initialized in a config file

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    try {
      alert
      await signInWithGoogle();

    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      await signUpWithEmail(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await logInWithEmail(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendOtp = async () => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved", response);
        },
      },
      auth
    );

    try {
      const result = await sendOtp(phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp(confirmationResult, otp);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Authentication</h1>

      <h2>Google Sign-in</h2>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <button onClick={signOut}>Sign Out</button>

      <h2>Email Authentication</h2>
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
      <button onClick={handleEmailSignUp}>Sign Up</button>
      <button onClick={handleEmailLogin}>Log In</button>

      <h2>Phone Authentication</h2>
      <div id="recaptcha-container"></div>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
};

export default AuthPage;

