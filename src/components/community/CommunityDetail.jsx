import React, { useEffect, useState, userData } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import Sidebar from './Sidebar';

const CommunityDetail = () => {
  const { communityId } = useParams(); // Extract the communityId from the route
  const navigate = useNavigate();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        if (!communityId || !userId) throw new Error("Invalid community or user");

        const communityRef = doc(db, 'Communities', communityId);
        const communitySnap = await getDoc(communityRef);

        if (!communitySnap.exists()) throw new Error("Community not found");

        const communityData = communitySnap.data();

        // Check if the user is a member
        if (!communityData.members.includes(userId)) {
          // If not a member, add the user to the community members list
          await updateDoc(communityRef, {
            members: arrayUnion(userId),
          });

          // Also update the user's joined communities list
          const userRef = doc(db, 'users', userId);
          await updateDoc(userRef, {
            joinedCommunities: arrayUnion(communityId),
          });
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

  const handleNavigateToSection = (section) => {
    navigate(`/community/${communityId}/${section}`);
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/join/${communityId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Invite link copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy invite link. Please try again.");
    });
  };

  if (loading) return <p className="text-center text-gray-500 mt-5">Loading community details...</p>;

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="p-6 flex-1">
        {/* Community Details */}
        {community.logoURL && (
            <img src={community.logoURL} alt="Community Logo" className="rounded-full w-30 h-30 aspect-square mt-2" />
        )}
        <h1 className="text-2xl font-bold text-gray-800">{community?.name || "Community Name"}</h1>
        <p className="text-gray-600 mt-2 mb-4 text-center">{community?.description || "No description available"}</p>

        {userId === community?.creatorId && (
          <p className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full mb-4">
            You are the Admin of this Community
          </p>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => handleNavigateToSection('chat')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go to Chats
          </button>
          <button
            onClick={() => handleNavigateToSection('projects')}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Go to Projects
          </button>
        </div>

        {/* Invite Link Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Invite Others to Join</h2>
          <p className="text-gray-600 mt-2 mb-4">
            Share the invite link below with others to let them join this community.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={`${window.location.origin}/join/${communityId}`}
              readOnly
              className="border border-gray-300 rounded p-2 flex-1"
            />
            <button
              onClick={handleCopyInviteLink}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
