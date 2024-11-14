import React, { useState } from 'react';
import { db, auth, storage } from "../firebaseConfig"; // Ensure storage is configured for logo upload
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function CreateCommunity() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const navigate = useNavigate();

    // Handle file input for logo
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file)); // Preview the selected logo
        }
    };

    // Create community and upload data
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!name || !description || !logo) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            // Generate unique ID for the community
            const communityId = uuidv4();

            // Upload logo to Firebase Storage
            const logoRef = ref(storage, `communityLogos/${communityId}-${logo.name}`);
            await uploadBytes(logoRef, logo);
            const logoURL = await getDownloadURL(logoRef);

            // Save community data to Firestore
            const communityData = {
                name,
                description,
                logo: logoURL,
                creator: auth.currentUser.uid,
                members: [auth.currentUser.uid], // Automatically join the creator
                createdAt: new Date(),
            };
            await setDoc(doc(db, "Communities", communityId), communityData);

            alert("Community created successfully!");
            navigate("/useraction"); // Redirect to user action page or communities list

        } catch (error) {
            console.error("Error creating community:", error);
            alert("Failed to create community. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold border-b-2 border-gray-600 pb-1 capitalize tracking-wide mb-6">
                Create a New Community
            </h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <div>
                    <label className="block text-lg font-semibold mb-2">Community Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Enter community name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Enter a brief description"
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">Community Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                    {logoPreview && (
                        <img src={logoPreview} alt="Logo Preview" className="mt-4 h-32 w-32 object-cover rounded-full" />
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold mt-4"
                >
                    Create Community
                </button>
            </form>
        </div>
    );
}
