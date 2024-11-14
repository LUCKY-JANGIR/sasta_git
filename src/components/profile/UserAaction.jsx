import React, { useEffect, useState } from 'react';
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function UserAction() {
    const [userData, setUserData] = useState(null);
    const [technologies, setTechnologies] = useState([]);
    const [createdCommunities, setCreatedCommunities] = useState([]);
    const [joinedCommunities, setJoinedCommunities] = useState([]);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            
            if (!user) {
                return; // Handle user not logged in
            }

            try {
                // Fetch user data from Users collection
                const userDoc = await getDoc(doc(db, "Users", user.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                    setTechnologies(userDoc.data().technologies || []);
                }

                // Fetch communities created by the user
                const createdCommunitiesQuery = query(
                    collection(db, "Communities"),
                    where("creator", "==", user.uid)
                );
                const createdCommunitiesSnapshot = await getDocs(createdCommunitiesQuery);
                const createdCommunitiesData = createdCommunitiesSnapshot.docs.map(doc => doc.data());
                setCreatedCommunities(createdCommunitiesData);

                // Fetch communities the user has joined
                const joinedCommunitiesQuery = query(
                    collection(db, "Communities"),
                    where("members", "array-contains", user.uid)
                );
                const joinedCommunitiesSnapshot = await getDocs(joinedCommunitiesQuery);
                const joinedCommunitiesData = joinedCommunitiesSnapshot.docs.map(doc => doc.data());
                setJoinedCommunities(joinedCommunitiesData);

                // Save the communities in the cookie for the session
                Cookies.set('createdCommunities', JSON.stringify(createdCommunitiesData), { expires: 1 });
                Cookies.set('joinedCommunities', JSON.stringify(joinedCommunitiesData), { expires: 1 });

                // Fetch projects uploaded by the user
                const projectsQuery = query(
                    collection(db, "Projects"),
                    where("user", "==", user.uid)
                );
                const projectsSnapshot = await getDocs(projectsQuery);
                setProjects(projectsSnapshot.docs.map(doc => doc.data()));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        // Check if the user is logged in and fetch data
        fetchUserData();
    }, []);

    // Check cookie for community data on page reload
    useEffect(() => {
        const savedCreatedCommunities = Cookies.get('createdCommunities');
        const savedJoinedCommunities = Cookies.get('joinedCommunities');
        
        if (savedCreatedCommunities) {
            setCreatedCommunities(JSON.parse(savedCreatedCommunities));
        }
        if (savedJoinedCommunities) {
            setJoinedCommunities(JSON.parse(savedJoinedCommunities));
        }
    }, []);

    // Handle logout to clear cookies
    const handleLogout = () => {
        Cookies.remove('createdCommunities');
        Cookies.remove('joinedCommunities');
        auth.signOut();
        navigate("/login"); // Redirect to login page after logout
    };

    // Navigate to the CreateCommunity page
    const handleCreateCommunity = () => {
        navigate("/createcommunity");
    };

    return (
        <div className="flex flex-col p-6 w-full max-h-full overflow-y-auto">
            <h1 className="text-4xl font-bold border-b-2 border-gray-600 pb-1 capitalize tracking-wide">
                User Activity
            </h1>

            {/* Technologies Known Section */}
            <div className="mt-8">
                <h3 className="text-2xl font-bold">Technologies Known</h3>
                <ul className="mt-4 flex flex-wrap space-x-4">
                    {technologies.length ? (
                        technologies.map((tech, index) => (
                            <li key={index} className="p-2 rounded-lg bg-blue-200">
                                {tech}
                            </li>
                        ))
                    ) : (
                        <p>No technologies listed yet.</p>
                    )}
                </ul>
            </div>

            {/* Communities Section */}
            <div className="mt-8">
                <h3 className="text-2xl font-bold">Communities</h3>

                <button
                    onClick={handleCreateCommunity}
                    className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
                >
                    Create Community
                </button>

                <div className="mt-8">
                    <h4 className="text-xl font-semibold">Created Communities</h4>
                    {createdCommunities.length ? (
                        createdCommunities.map((community, index) => (
                            <div key={index} className="p-4 mt-4 bg-gray-200 rounded-lg">
                                <h5 className="text-lg font-bold">{community.name}</h5>
                                <p>{community.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No communities created yet.</p>
                    )}
                </div>

                <div className="mt-8">
                    <h4 className="text-xl font-semibold">Joined Communities</h4>
                    {joinedCommunities.length ? (
                        joinedCommunities.map((community, index) => (
                            <div key={index} className="p-4 mt-4 bg-gray-200 rounded-lg">
                                <h5 className="text-lg font-bold">{community.name}</h5>
                                <p>{community.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No communities joined yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
