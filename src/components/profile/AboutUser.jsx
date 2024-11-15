import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Cookies from 'js-cookie';

const Aboutuser = () => {
    const [userData, setUserData] = useState(null);
    const [editableData, setEditableData] = useState({});
    const [isEditing, setIsEditing] = useState(false); // To toggle between view/edit mode
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;

                // Check if the user is logged in, if not, check cookies
                if (!user) {
                    const userCookie = Cookies.get('userSession');
                    if (!userCookie) {
                        navigate("/login");
                        return;
                    }

                    // If user session exists in cookies, use it to fetch user data
                    const userDataFromCookie = JSON.parse(userCookie);
                    setUserData(userDataFromCookie);
                    setEditableData(userDataFromCookie);
                    return;
                }

                if (user.providerData[0].providerId === "google.com") {
                    setUserData({
                        Name: user.displayName,
                        Email: user.email,
                        ProfilePic: user.photoURL || "/default-profile-pic.png",
                        Phone: user.phoneNumber || "N/A",
                        Bio: "",
                        Course: "",
                        College: "",
                        Twitter: "",
                        LinkedIn: "",
                        GitHub: ""
                    });
                    setEditableData({
                        Name: user.displayName,
                        Email: user.email,
                        Phone: user.phoneNumber || "N/A",
                        Bio: "",
                        Course: "",
                        College: "",
                        Twitter: "",
                        LinkedIn: "",
                        GitHub: ""
                    });
                } else {
                    const userDoc = await getDoc(doc(db, "Users", user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setUserData(data);
                        setEditableData(data);
                        // Save session in cookies
                        Cookies.set('userSession', JSON.stringify(data), { expires: 7 }); // Expires in 7 days
                    } else {
                        console.error("User data not found in Firestore!");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

       fetchUserData();
    }, [navigate,location]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        const user = auth.currentUser;

        if (user) {
            try {
                const userRef = doc(db, "Users", user.uid);
                await updateDoc(userRef, editableData);
                setUserData(editableData); // Update the UI with new values
                toggleEditMode();
                alert("Profile updated successfully!");

                // Save updated session to cookies
                Cookies.set('userSession', JSON.stringify(editableData), { expires: 7 });
            } catch (error) {
                console.error("Error updating profile:", error);
                alert("Error updating profile. Please try again.");
            }
        }
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            Cookies.remove('userSession');
            alert("You have logged out successfully!");
            navigate("/login");
        }).catch((error) => {
            console.error("Logout error:", error);
        });
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    if (!userData) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className=" max-h-full ">
            <div className="user-info flex w-[30vw] mt-4 mr-4 max-h-full overflow-y-auto overflow-x-hidden flex-col space-x-8">
                <div className='flex flex-wrap ml-6'>
                    <img
                        className="w-40 h-40 rounded-full"
                        src={userData.ProfilePic || "/default-profile-pic.png"}
                        alt="Profile"
                    />
                    <div className='self-center ml-4'>
                        {isEditing ? (
                            <input
                                type="text"
                                name="Name"
                                value={editableData.Name}
                                onChange={handleInputChange}
                                className="border-b-2 border-gray-300 focus:outline-none"
                            />
                        ) : (
                            <h2 className="text-3xl font-bold">{userData.Name}</h2>
                        )}
                        <div className="flex justify-between items-center">
                            <span className="font-extralight">{userData.Username}</span>
                            
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <>
                        <div className="mt-4">
                            <label>Email: </label>
                            <input
                                type="email"
                                name="Email"
                                value={editableData.Email}
                                onChange={handleInputChange}
                                className="border-b-2 border-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="mt-4">
                            <label>Phone: </label>
                            <input
                                type="text"
                                name="Phone"
                                value={editableData.Phone}
                                onChange={handleInputChange}
                                className="border-b-2 border-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="mt-4">
                            <label>Bio: </label>
                            <textarea
                                name="Bio"
                                value={editableData.Bio}
                                onChange={handleInputChange}
                                className="border-2 border-gray-300 p-2 w-full"
                                placeholder="Write a short bio..."
                            />
                        </div>

                        <div className="mt-4">
                            <label>Course: </label>
                            <input
                                type="text"
                                name="Course"
                                value={editableData.Course}
                                onChange={handleInputChange}
                                className="border-b-2 border-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="mt-4">
                            <label>College: </label>
                            <input
                                type="text"
                                name="College"
                                value={editableData.College}
                                onChange={handleInputChange}
                                className="border-b-2 border-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="mt-4">
                            <label>Twitter: </label>
                            <input
                                type="text"
                                name="Twitter"
                                value={editableData.Twitter}
                                onChange={handleInputChange}
                                className="border-b-2 border-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="mt-4">
                            <label>LinkedIn: </label>
                            <input
                                type="text"
                                name="LinkedIn"
                                value={editableData.LinkedIn}
                                onChange={handleInputChange}
                                className="border-b-2 border-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="mt-4">
                            <label>GitHub: </label>
                            <input
                                type="text"
                                name="GitHub"
                                value={editableData.GitHub}
                                onChange={handleInputChange}
                                className="border-b-2 border-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleSaveChanges}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="mt-4">Bio: {userData.Bio || "No bio available."}</p>
                        <p className="mt-4">Course: {userData.Course}</p>
                        <p className="mt-4">College: {userData.College}</p>
                        <p className="mt-4"><strong>Email:</strong> {userData.Email}</p>
                        <p className="mt-4"><strong>Phone:</strong> {userData.Phone}</p>
                        <p className="mt-4"><strong>Twitter:</strong> {userData.Twitter}</p>
                        <p className="mt-4"><strong>LinkedIn:</strong> {userData.LinkedIn}</p>
                        <p className="mt-4"><strong>GitHub:</strong> {userData.GitHub}</p>
                    </>
                )}

                <div className="mt-4 flex w-full">
                    <button
                                onClick={toggleEditMode}
                                className="text-blue-500 hover:underline"
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Aboutuser;
