import React from 'react'

export default function Home() {
  return (
    <>
    <div className="grid grid-cols-2 w-[80vw]  h-[100vh] justify-evenly items-center py-5 m-auto">
    <div className="flex flex-col w-auto">
    <h1 className="uppercase text-8xl primerytext mb-4">
      <span className="text-6xl">gen~ </span><br />artchain
    </h1>
   <p className=" capitalize leading-7">
    a platform where art lovers, collectors, and creators can come together and interact in the world of AI-generated digital art and NFTs
   </p>
   <a href="marketplace" className=" border-2 border-teal-400 hover:text-white transition-all text-teal-400 uppercase hover:bg-teal-400 w-fit  py-1 px-3 rounded-xl mt-3">Explore{' >'} </a>
    </div>
    <div className="flex flex-col items-end uppercase underline-offset-4 underline">
    {/* <img src={img}  alt="" className="w-3/4 h-auto rounded-xl border-white shadow-2xl shadow-[#00e9fc5e] border-2"/> */}
    </div>
    </div>
    </>
  )
}
