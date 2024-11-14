// src/components/Auth.js
import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";

const Auth = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);

    // Sign in with Email and Password
    const signInWithEmail = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            alert("Signed in successfully with email!");
        } catch (error) {
            console.error("Error signing in with email:", error.message);
            alert(error.message);
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            console.log("Signed in with Google:", result.user);
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
            alert(error.message);
        }
    };

    // Sign in with Phone Number
    const signInWithPhone = async () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new auth.RecaptchaVerifier("recaptcha-container", {
                size: "invisible",
            });
        }

        try {
            const confirmation = await auth.signInWithPhoneNumber(phone, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            alert("OTP sent to phone!");
        } catch (error) {
            console.error("Error sending OTP:", error.message);
            alert(error.message);
        }
    };

    // Confirm OTP
    const confirmOtp = async () => {
        try {
            await confirmationResult.confirm(otp);
            alert("Phone authentication successful!");
        } catch (error) {
            console.error("Error confirming OTP:", error.message);
            alert("Invalid OTP");
        }
    };

    return (
        <div>
            <h2>Sign In</h2>

            {/* Email/Password Sign-In */}
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={signInWithEmail}>Sign In with Email</button>
            </div>

            {/* Google Sign-In */}
            <div>
                <button onClick={signInWithGoogle}>Sign In with Google</button>
            </div>

            {/* Phone Sign-In */}
            <div>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                />
                <button onClick={signInWithPhone}>Send OTP</button>
                <div id="recaptcha-container"></div>
            </div>

            {/* Confirm OTP */}
            {confirmationResult && (
                <div>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                    />
                    <button onClick={confirmOtp}>Confirm OTP</button>
                </div>
            )}
        </div>
    );
};

export default Auth;
