import React from 'react'

export default function AboutUser() {
    return (
        <div>
        
            <div className="flex w-[40vw]  mt-4 mr-4 max-h-full overflow-auto flex-col  space-x-8">
                <div className='flex ml-6'>
                <img src="https://placehold.co/150x150" alt="Profile picture of the user" className="rounded-full w-36 h-36" />
                    <div className='self-center ml-4'>
                    <h2 className="text-3xl font-bold">John Doe</h2>
                    <p className=" ">@johndoe</p>
                    </div>
                </div>
                    <p className="mt-4">B.Sc. in Computer Science, 2022</p>
                    <p className="mt-4 ">XYZ University</p>
                    <p className="mt-4">Community: Dev Enthusiasts</p>
                    <p className="mt-4">Email: johndoe@example.com</p>
                    <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                    <div className="mt-4 flex space-x-4">
                        <a href="#" className="text-blue-500 hover:underline"><i className="fab fa-twitter"></i> Twitter</a>
                        <a href="#" className="text-blue-500 hover:underline"><i className="fab fa-linkedin"></i> LinkedIn</a>
                        <a href="#" className="text-blue-500 hover:underline"><i className="fab fa-github"></i> GitHub</a>
                    </div>
            </div>
        </div>
    )
}
