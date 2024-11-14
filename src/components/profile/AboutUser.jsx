import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Aboutuser = () => {
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
        <div>

            <div className="flex w-[30vw]  mt-4 mr-4 max-h-full overflow-auto flex-col  space-x-8">
                <div className='flex ml-6'>
                <img
                className="w-40 b- rounded-full"
                   src={userData.ProfilePic}
                   alt="Profile"
                />
                    <div className='self-center ml-4'>
                        <h2 className="text-3xl font-bold">{userData.Name}</h2>
                        <p className="font-extralight">{userData.Username}</p>
                    </div>
                </div>
                <p className="mt-4">B.Sc. in Computer Science, 2022</p>
                <p className="mt-4 ">XYZ University</p>
                <p className="mt-4">Community: Dev Enthusiasts</p>
                <p className="mt-4"><strong>Email:</strong> {userData.Email}</p>
                <p className="mt-4"><strong>Phone:</strong> {userData.Phone}</p>
                <p className="mt-4 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                <div className="mt-4 flex space-x-4">
                    <a href="#" className="text-blue-500 hover:underline"><i className="fab fa-twitter"></i> Twitter</a>
                    <a href="#" className="text-blue-500 hover:underline"><i className="fab fa-linkedin"></i> LinkedIn</a>
                    <a href="#" className="text-blue-500 hover:underline"><i className="fab fa-github"></i> GitHub</a>
                </div>
            </div>
        </div>
    )
}

export default Aboutuser;