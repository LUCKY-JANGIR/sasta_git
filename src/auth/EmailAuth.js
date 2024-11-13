import { auth } from "../firebaseConfig";

// Sign up a new user
export const signUpWithEmail = async (email, password) => {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    console.log("User registered successfully:", result.user);
    return result.user;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
};

// Log in an existing user
export const logInWithEmail = async (email, password) => {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    console.log("User logged in successfully:", result.user);
    return result.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
