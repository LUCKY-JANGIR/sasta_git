import React from 'react'

export default function UserAaction() {
    return (
        <div className='flex flex-col mt-4 border-gray-700 pl-2 border-l-2  max-h-full overflow-auto'>
            <h1 className='text-4xl font-bold border-b-2 border-gray-600 pb-1 capitalize tracking-wide'>User Activity</h1>
            <div className="mt-8">
                <h3 className="text-2xl font-bold">Technologies</h3>
                <ul className="mt-4 flex space-x-4">
                    <li className="  p-2 rounded-lg">JavaScript</li>
                    <li className="  p-2 rounded-lg">React</li>
                    <li className="  p-2 rounded-lg">Node.js</li>
                    <li className="  p-2 rounded-lg">Python</li>
                </ul>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold">Projects</h3>
                <ul className="mt-4 space-y-4">
                    <li className="  p-4 rounded-lg">
                        <h4 className="text-xl font-semibold">Project 1</h4>
                        <p className=" ">Description of project 1.</p>
                    </li>
                    <li className="  p-4 rounded-lg">
                        <h4 className="text-xl font-semibold">Project 2</h4>
                        <p className=" ">Description of project 2.</p>
                    </li>
                    <li className="  p-4 rounded-lg">
                        <h4 className="text-xl font-semibold">Project 3</h4>
                        <p className=" ">Description of project 3.</p>
                    </li>
                </ul>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold">Streak</h3>
                <div className="  p-4 rounded-lg">
                    <p className=" ">Current Streak: 15 days</p>
                    <p className=" ">Longest Streak: 30 days</p>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold">Activity</h3>
                <div className="  p-4 rounded-lg">
                    <p className=" ">User's activity over the past year:</p>
                    <img src="https://placehold.co/600x200" alt="Graph showing user's activity over the past year" className="mt-4" />
                </div>
            </div>
        </div>
    )
}
