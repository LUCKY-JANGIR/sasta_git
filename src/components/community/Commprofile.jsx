import React from 'react'

export default function Commprofile() {
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
                    <h1 className="text-3xl font-bold mb-4">{community.name}</h1>
                    <div className="mb-4">
                        <span className="font-semibold">Community ID:</span> {community.id}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Owners:</span> {community.owners.join(', ')}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Number of Members:</span> {community.members}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Created On:</span> {community.createdOn}
                    </div>
                </div>
    </div>
  )
}
