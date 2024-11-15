import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const JoinCommunity = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const joinCommunity = async () => {
      try {
        if (!communityId || !userId) throw new Error("Invalid community or user");

        // Fetch community details
        const communityRef = doc(db, 'Communities', communityId);
        const communitySnap = await getDoc(communityRef);

        if (!communitySnap.exists()) throw new Error("Community not found");

        const communityData = communitySnap.data();

        // Add user to the community's members list
        await updateDoc(communityRef, {
          members: arrayUnion(userId),
        });

        // Add the community to the user's joined communities
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
          joinedCommunities: arrayUnion(communityId),
        });

        // Redirect to the community page
        navigate(`/community/${communityId}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    joinCommunity();
  }, [communityId, userId, navigate]);

  if (loading) return <p className="text-center mt-5 text-gray-500">Joining community...</p>;

  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return null;
};

export default JoinCommunity;
