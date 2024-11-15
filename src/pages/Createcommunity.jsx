import React, { useState } from 'react';
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateCommunity() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [logoURL, setLogoURL] = useState("");
    const navigate = useNavigate();

    const handleCreateCommunity = async (e) => {
        e.preventDefault();

        try {
            const user = auth.currentUser;
            if (!user) {
                console.log("User not logged in.");
                return;
            }

            // Create a new community document in Firestore
            await addDoc(collection(db, "Communities"), {
                name: name,
                description: description,
                logoURL: logoURL,
                creator: user.uid,
                members: [user.uid] // Add creator as a member by default
            });

            console.log("Community created successfully!");
            navigate("/profile"); // Redirect to UserAction page after creation
        } catch (error) {
            console.error("Error creating community:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Create a Community</h2>
            <form onSubmit={handleCreateCommunity}>
                <label className="block text-lg font-semibold mt-4">
                    
                    <div className="inputGroup">
                    <input
                        type="text"
                        value={name}
                        placeholder='Community Name'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    </div>
                </label>
                <label className="block text-lg font-semibold mt-4">
                    <div className="inputGroup">
                    <textarea
                        value={description}
                        placeholder='Enter the description for your community'
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    </div>
                </label>
                <label className="block text-lg font-semibold mt-4">
                    <div className="inputGroup">
                    <input
                        type="text"
                        value={logoURL}
                        placeholder='Logo URL'
                        onChange={(e) => setLogoURL(e.target.value)}
                    />
                    </div>
                </label>
                <button
                    type="submit"
                    className="mt-6 bg-blue-500 text-white p-3 rounded"
                >
                    Create Community
                </button>
            </form>
        </div>
    );
}
