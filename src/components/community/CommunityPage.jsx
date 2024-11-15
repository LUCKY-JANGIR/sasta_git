import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Sidebar from './Sidebar';

const CommunityPage = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        if (!communityId || !userId) throw new Error("Invalid community or user");

        const communityRef = doc(db, 'Communities', communityId);
        const communitySnap = await getDoc(communityRef);

        if (!communitySnap.exists()) throw new Error("Community not found");

        const communityData = communitySnap.data();

        // Check if the user is a member
        if (!communityData.members.includes(userId)) {
          throw new Error("Access denied. You are not a member of this community.");
        }

        setCommunity(communityData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [communityId, userId]);

  if (loading) return <p className="text-center mt-5 text-gray-500">Loading community...</p>;

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
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold">{community.name}</h1>
        <p className="mt-2 text-gray-700">{community.description}</p>
      </div>
    </div>
  );
};

export default CommunityPage;
