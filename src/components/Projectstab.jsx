import React from 'react'
import Mainchat from"./Mainchat";
export default function Projectstab() {
    const projects = [
        "Project One",
        "Project Two",
        "Project Three",
        "Project Four",
        "Project Five",
        "Project Six",
        "Project Seven",
        "Project Eight",
        "Project Nine",
        "Project Ten",
        "Project Eleven",
        "Project Twelve",
        "Project Thirteen",
        "Project Fourteen",
        "Project Fifteen"
    ];

    return (
        <div className='flex w-full my-4'>
            <div className="flex flex-col  rounded-lg  bg-neutral-900  mx-2 w-[20vw] p-2">
            <div className=' bg-neutral-950   mb-2 px-2 rounded-md'>
            <h1 className='my-2'>Community name</h1>
            </div>
            <div className='flex flex-col  overflow-y-auto w-fit overflow-x-hidden'>
            {projects.map((project, index) => (
                <div key={index} className=" m-1  w-full ">
                    <h2 className="font-thin text-sm">{project}</h2>
                </div>
            ))}
            </div>
        </div>
        <div className='mx-2 flex size-full bg-neutral-900  rounded-lg overflow-hidden'>
            <Mainchat/>
        </div>
        </div>
        )
}
