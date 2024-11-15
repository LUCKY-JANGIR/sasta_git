import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Communitytab() {
    const navigate = useNavigate();
    const [userData ,setUserData]=useState(null)
    const [Data ,setData]=useState(false)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                console.log(user,"1")
                // Check if the user is logged in, if not, check cookies
                console.log("before !user")
                if (!user) {
                    console.log("inside !user")
                    const userCookie = Cookies.get('userSession');
                    if (!userCookie) {
                        console.log("inside !cocke")
                        navigate("/login");
                        return;
                    }
                    console.log("parse")
                    const parseduser=JSON.parse(userCookie);
                    console.log(parseduser)
                    console.log(parseduser.ProfilePic)
                    setUserData(parseduser)
                    setData(true)
                }else{
                 console.log("inside else")
                 console.log("waiting for userdoc")
                 console.log(user.uid)
                const userDoc = await getDoc(doc(db, "Users", user.uid));
                console.log("get userdoc")

                console.log(user,"2")
                if (userDoc.exists()) {
                    console.log("user do exist")
                        const data = userDoc.data();
                        setUserData(data);
                        console.log("mil gaya bhai",userData)
                        console.log("mil gaya bhai",userData.ProfilePic)
                        setData(true);
                        Cookies.set('userSession', JSON.stringify(data), { expires: 7 }); // Expires in 7 days
                        
                    } else {
                        console.error("User data not found in Firestore!");
                    }}
                
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [navigate]);
    return (
        <div className="w-fit max-w-[6vw] h-screen overflow-hidden  text-white flex flex-col items-center pt-2 px-2">
            <div className='mb-4 pb-2 border-b-2'>
                {
                    Data?<Link to="/profile">< img src={userData.ProfilePic } className=" p-1 rounded-xl size-full border-2 border-neutral-800 shadow-md shadow-neutral-700" alt="default img"/></Link>:<>loading</>
                }
            </div>
            <div>
                <div className='rounded-[50%] hover:rounded-xl  hover:shadow-md transition-all hover:border-neutral-800 overflow-hidden hover:border-2  shadow-md hover:shadow-neutral-700 mb-1'>< img src="https://placehold.co/150x150" className="" /></div>
                <div className='rounded-[50%] hover:rounded-xl  hover:shadow-md transition-all hover:border-neutral-800 overflow-hidden hover:border-2  shadow-md hover:shadow-neutral-700 mb-1'>< img src="https://placehold.co/150x150" className="" /></div>
                <div className='rounded-[50%] hover:rounded-xl  hover:shadow-md transition-all hover:border-neutral-800 overflow-hidden hover:border-2  shadow-md hover:shadow-neutral-700 mb-1'>< img src="https://placehold.co/150x150" className="" /></div>
                <div className='rounded-[50%] hover:rounded-xl  hover:shadow-md transition-all hover:border-neutral-800 overflow-hidden hover:border-2  shadow-md hover:shadow-neutral-700 mb-1'>< img src="https://placehold.co/150x150" className="" /></div>
                <div className='rounded-[50%] hover:rounded-xl  hover:shadow-md transition-all hover:border-neutral-800 overflow-hidden hover:border-2  shadow-md hover:shadow-neutral-700 mb-1'>< img src="https://placehold.co/150x150" className="" /></div>
                <div className='rounded-[50%] hover:rounded-xl  hover:shadow-md transition-all hover:border-neutral-800 overflow-hidden hover:border-2  shadow-md hover:shadow-neutral-700 mb-1'>< img src="https://placehold.co/150x150" className="" /></div>
                <div className='rounded-[50%] hover:rounded-xl  hover:shadow-md transition-all hover:border-neutral-800 overflow-hidden hover:border-2  shadow-md hover:shadow-neutral-700 mb-1'>< img src="https://placehold.co/150x150" className="" /></div>
            </div>

        </div>
    )
}
