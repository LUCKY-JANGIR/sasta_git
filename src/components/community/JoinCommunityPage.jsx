import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const JoinCommunityPage = () => {
  const { communityId } = useParams(); // Extract communityId from the URL
  const navigate = useNavigate();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMember, setIsMember] = useState(false);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
          
          if (!communityId || !userId) throw new Error("Invalid community or user");
          
          const communityRef = doc(db, "Communities", communityId);
          const communitySnap = await getDoc(communityRef);
          
          if (!communitySnap.exists()) throw new Error("Community not found");
          
          const communityData = communitySnap.data();
          
          // Check if the user is already a member
          if (communityData.members.includes(userId)) {
              setIsMember(true);
            }
            
            setCommunity(communityData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityDetails();
  }, [communityId, userId]);

  const handleJoinCommunity = async () => {
    try {
      if (!userId || !communityId) throw new Error("Invalid user or community");

      const communityRef = doc(db, "Communities", communityId);
      const userRef = doc(db, "Users", userId);

      // Add the user to the community's members list
      await updateDoc(communityRef, {
        members: arrayUnion(userId),
      });

      // Add the community to the user's joined communities
      await updateDoc(userRef, {
        joinedCommunities: arrayUnion(communityId),
      });

      alert("Successfully joined the community!");
      navigate(`/community/${communityId}`);
    } catch (err) {
      alert("Failed to join the community. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-5">Loading community details...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (isMember) {
    return (
      <div className="text-center mt-5">
        <p className="text-gray-600">You are already a member of this community!</p>
        <button
          onClick={() => navigate(`/community/${communityId}`)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go to Community
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {community?.profilePic && (
        <img
          src={community.profilePic}
          alt={`${community.name} Logo`}
          className="w-32 h-32 rounded-full mb-4"
        />
      )}
      <h1 className="text-2xl font-bold text-gray-800">{community?.name || "Community Name"}</h1>
      <p className="text-gray-600 mt-2 mb-4 text-center">
        {community?.description || "No description available"}
      </p>

      <button
        onClick={handleJoinCommunity}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
      >
        Join Community
      </button>
    </div>
  );
};

export default JoinCommunityPage;
