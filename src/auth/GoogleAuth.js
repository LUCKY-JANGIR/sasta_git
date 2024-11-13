import { auth, googleProvider } from "../firebaseConfig";

export const signInWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    console.log("Google Sign-in Success:", result.user);
    return result.user;
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Sign-out error:", error);
    throw error;
  }
};
