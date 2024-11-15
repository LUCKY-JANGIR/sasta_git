import React, { useEffect, useState } from 'react';
import { auth, db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function UserAction() {
    const [createdCommunities, setCreatedCommunities] = useState([]);
    const [joinedCommunities, setJoinedCommunities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                await fetchCommunities(user.uid);
            } else {
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const fetchCommunities = async (userId) => {
        try {
            const communitiesRef = collection(db, "Communities");

            // Query for created communities
            const createdQuery = query(communitiesRef, where("creator", "==", userId));
            const createdSnapshot = await getDocs(createdQuery);
            const created = createdSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCreatedCommunities(created);

            // Query for joined communities
            const joinedQuery = query(communitiesRef, where("members", "array-contains", userId));
            const joinedSnapshot = await getDocs(joinedQuery);
            const joined = joinedSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setJoinedCommunities(joined);
        } catch (error) {
            console.error("Error fetching communities:", error);
        }
    };

    const handleCommunityClick = (communityId) => {
        navigate(`/community/${communityId}`);
    };

    return (
        <div className="flex flex-col p-6">
            <h1 className="text-4xl font-bold border-b-2 border-gray-600 pb-1 capitalize tracking-wide">
                User Communities
            </h1>

            <div className="flex flex-wrap gap-8 p-4">
                
            <section className="mt-8">
                <h3 className="text-2xl font-bold">Created Communities</h3>
                <button
                    onClick={() => navigate("/createcommunity")}
                    className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
                >
                    Create Community
                </button>
                {createdCommunities.length > 0 ? (
                    createdCommunities.map((community) => (
                        <div
                            key={community.id}
                            className="p-4 mt-4 rounded-2xl hover:bg-slate-500 hover:b-2-slate hover:border-slate-500 transition-all b-slate-300 border cursor-pointer"
                            onClick={() => handleCommunityClick(community.id)}
                        >
                            {community.logoURL && (
                                <img src={community.logoURL} alt="Community Logo" className="w-16 h-16 rounded-full mt-2" />
                            )}
                            <h5 className="text-lg font-bold">{community.name}</h5>
                            <p>{community.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No communities created yet.</p>
                )}
            </section>

            <section className="mt-8">
                <h3 className="text-2xl font-bold">Joined Communities</h3>
                {joinedCommunities.length > 0 ? (
                    joinedCommunities.map((community) => (
                        <div
                            key={community.id}
                            className="p-4 mt-4 rounded-2xl hover:bg-slate-500 hover:b-2-slate hover:border-slate-500 transition-all b-slate-300 border cursor-pointer"
                            onClick={() => handleCommunityClick(community.id)}
                        >
                            {community.logoURL && (
                                <img src={community.logoURL} alt="Community Logo" className="w-16 rounded-full h-16 mt-2" />
                            )}
                            <h5 className="text-lg font-bold">{community.name}</h5>
                            <p>{community.description}</p>
                            
                        </div>
                    ))
                ) : (
                    <p>No communities joined yet.</p>
                )}
            </section>
            </div>
        </div>
    );
}
