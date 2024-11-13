import { auth } from "../firebaseConfig";

// Trigger Phone Number Verification
export const sendOtp = async (phoneNumber, recaptchaVerifier) => {
  try {
    const confirmationResult = await auth.signInWithPhoneNumber(
      phoneNumber,
      recaptchaVerifier
    );
    console.log("OTP Sent");
    return confirmationResult; // Use this for verifying the OTP
  } catch (error) {
    console.error("OTP Error:", error);
    throw error;
  }
};

// Verify the OTP Code
export const verifyOtp = async (confirmationResult, otpCode) => {
  try {
    const result = await confirmationResult.confirm(otpCode);
    console.log("Phone Sign-in Success:", result.user);
    return result.user;
  } catch (error) {
    console.error("OTP Verification Error:", error);
    throw error;
  }
};
