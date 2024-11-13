import React from 'react'

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
        <div className="flex flex-col border-r-2 gap-1 overflow-y-auto w-fit ">
            {projects.map((project, index) => (
                <div key={index} className="bg-neutral-900 shadow-md p-1 max-w-[20vw]">
                    <h2 className="font-thin text-lg">{project}</h2>
                </div>
            ))}
        </div>)
}
