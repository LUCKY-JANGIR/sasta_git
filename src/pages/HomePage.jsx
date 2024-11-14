import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          alert("You need to log in first.");
          navigate("/login");
          return;
        }

        // Check if the user signed in with email/password or Google
        if (user.providerData[0].providerId === "google.com") {
          // For Google login, get details from the Firebase user object
          setUserData({
            Name: user.displayName,
            Email: user.email,
            ProfilePic: user.photoURL,
            Phone: user.phoneNumber || "N/A", // Google users may not have a phone number
          });
        } else {
          // For email/password users, fetch details from Firestore
          const userDoc = await getDoc(doc(db, "Users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error("User data not found in Firestore!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <img
        src={userData.ProfilePic}
        alt="Profile"
        style={styles.profilePic}
      />
      <h2>{userData.Name}</h2>
      <p><strong>Email:</strong> {userData.Email}</p>
      <p><strong>Phone:</strong> {userData.Phone}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  profilePic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "20px",
  },
};

export default ProfilePage;
