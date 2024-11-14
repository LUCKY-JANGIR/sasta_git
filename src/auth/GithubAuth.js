import { auth, gitProvider } from "../firebaseConfig";

export const signInWithGithub = async () => {
  try {
    const result = await auth.signInWithPopup(gitProvider);
    console.log("git Sign-in Success:", result.user);
    return result.user;
  } catch (error) {
    console.error("git Sign-in Error:", error);
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
